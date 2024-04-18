import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin/notifications')
@Controller('admin/notifications')
export class NotificationsController {}
