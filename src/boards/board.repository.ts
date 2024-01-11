import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

export class BoardRepository extends Repository<Board> {
  // constructor 추가
  constructor(@InjectRepository(Board) private dataSource: DataSource) {
    // super(Board, dataSource.createEntityManager());
    super(Board, dataSource.manager); // 변경
  }

  async createBoard({ title, description }: CreateBoardDto, user: User) {
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);

    return board;
  }
}
