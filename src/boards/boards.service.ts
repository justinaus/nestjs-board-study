import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    // @InjectRepository(BoardRepository)
    private boardsRepository: BoardRepository,
  ) {}
  async getAllBoards(user: User) {
    const query = this.boardsRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User) {
    return this.boardsRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number) {
    const found = await this.boardsRepository.findOneBy({ id });

    if (!found) {
      // throw new NotFoundException();
      // 문구 커스텀.
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number, user: User) {
    const result = await this.boardsRepository.delete({
      id,
      user: {
        id: user.id,
      },
    });

    // result DeleteResult { raw: [], affected: 1 } 성공.
    // result DeleteResult { raw: [], affected: 0 } 실패.

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus) {
    const board = await this.getBoardById(id);

    board.status = status;

    await this.boardsRepository.save(board);

    return board;
  }
}
