import { DataSource, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

export class UserRepository extends Repository<User> {
  // constructor 추가
  constructor(@InjectRepository(User) private dataSource: DataSource) {
    // super(User, dataSource.createEntityManager());
    super(User, dataSource.manager); // 변경
  }

  async createUser({ username, password }: AuthCredentialDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      console.log(error);

      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }

      // throw new Error(error);
      throw new InternalServerErrorException();
    }

    return user;
  }
}
