import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Cat } from './entities/cat.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Cat, User],
      synchronize: true, // Only for development; use migrations in production
    }),
    CatsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
