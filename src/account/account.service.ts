import { timestamp } from '@/common/helpers/dateTime.helpers';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/common/entities/user.entity';
import { Order } from '@/common/entities/order.entity';
import { FindUserDto } from './dto/find-user.dto';
import { getHashedPassword, validatePassword } from './helpers/auth.helpers';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '@/common/entities/refreshToken.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async createUser(createAccountDto: CreateAccountDto): Promise<void> {
    const user = new User();
    user.email = createAccountDto.email;
    user.name = createAccountDto.name;
    user.lastname = createAccountDto.lastname;
    user.hashedPassword = await getHashedPassword(createAccountDto.password);
    user.createdAt = timestamp;
    user.orders = [];
    user.favoriteProductsIds = [];

    await this.usersRepository.save(user);
  }

  async loginUser(
    loginUserDto: LoginUserDto,
  ): Promise<{ token: string; refreshToken: string }> {
    const user = await this.usersRepository.findOne({
      where: { email: loginUserDto.email },
      relations: ['refreshTokens'],
    });

    if (!user) throw new NotFoundException('User not found');

    const isValidPassword = await validatePassword(
      loginUserDto.password,
      user.hashedPassword,
    );
    if (!isValidPassword) throw new UnauthorizedException('Invalid password');

    let refreshToken = '';

    if (user.refreshTokens.some((t) => this.isTokenValid(t.token))) {
      refreshToken = user.refreshTokens.find((t) =>
        this.isTokenValid(t.token),
      ).token;
    } else {
      refreshToken = this.generateRefreshToken(user.id);
      const newRefreshToken = this.refreshTokenRepository.create({
        token: refreshToken,
        user,
      });
      this.refreshTokenRepository.save(newRefreshToken);
    }

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
      refreshToken,
    };
  }

  async findUser(id: number): Promise<FindUserDto> {
    const user = await this.usersRepository.findOneBy({ id });
    const findUserDto = new FindUserDto(user);
    const userOrders = await this.ordersRepository.find({
      where: { userId: id },
    });
    findUserDto.setOrders(userOrders);
    return findUserDto;

    // const userOrders = await this.ordersRepository.find({
    //   where: { userId: id },
    // });
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    // return {
    //   ...user,
    //   orders: userOrders,
    // };
    // return new User();
  }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
  private generateRefreshToken(userId: number): string {
    const refreshToken = this.jwtService.sign(
      { userId },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      },
    );
    return refreshToken;
  }

  private isTokenValid(token: string): boolean {
    const expAt = this.jwtService.decode(token).exp;
    if (typeof expAt !== 'number') return false;
    return expAt > Date.now() / 1000;
  }
}
