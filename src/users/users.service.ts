import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async createUser(
    username: string,
    password: string,
    role: string,
  ): Promise<{ user: User; token: string }> {
    const user = this.userRepository.create({ username, password, role });
    await this.userRepository.save(user);

    const token = this.jwtService.sign(
      { username, role },
      { secret: 'SecretKey' },
    );
    return { user, token };
  }
}
