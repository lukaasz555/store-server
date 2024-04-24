import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/account/constants';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException(
        'Unauthorized - token is missing in headers',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      req['user'] = payload;
    } catch {
      throw new UnauthorizedException('Unauthorized - invalid token');
    }
    return true;
  }

  private getTokenFromHeader(req: Request): string | undefined {
    if (!req.headers['authorization']) return;
    const [type, token] = req.headers['authorization'].split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
