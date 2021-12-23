import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/creating-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('registration')
  async registration(@Body() dto: CreateUserDto): Promise<{ jwt: string }> {
    return this.userService.registration(dto);
  }

  @Post('login')
  async login(@Body() dto: UserDto): Promise<{ jwt: string }> {
    return this.userService.login(dto);
  }
}
