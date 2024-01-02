import { DataSource, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth.credential.dto';

export class UserRepository extends Repository<User> {
  // constructor 추가
  constructor(@InjectRepository(User) private dataSource: DataSource) {
    // super(Board, dataSource.createEntityManager());
    super(User, dataSource.manager); // 변경
  }

  async createUser({ username, password }: AuthCredentialDto) {
    const user = this.create({
      username,
      password,
    });

    await this.save(user);

    return user;
  }
}
