import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  async getUser(
    @Param('username') username: string,
  ): Promise<User | undefined> {
    return this.usersService.findOne(username);
  }

  @Post('/register')
  async createUser(
    @Body() createUserDto: { username: string; password: string; role: string },
  ): Promise<{user:User,token:string}> {
    return this.usersService.createUser(
      createUserDto.username,
      createUserDto.password,
      createUserDto.role,
    );
  }
}
