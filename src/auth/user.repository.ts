import { DataSource, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
// import { CreateBoardDto } from './dto/create-board.dto';

export class UserRepository extends Repository<User> {
  // constructor 추가
  constructor(@InjectRepository(User) private dataSource: DataSource) {
    // super(Board, dataSource.createEntityManager());
    super(User, dataSource.manager); // 변경
  }
}
