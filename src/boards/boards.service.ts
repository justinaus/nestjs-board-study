import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
  constructor(
    // @InjectRepository(BoardRepository)
    private boardsRepository: BoardRepository,
  ) {}
  getAllBoards() {
    return this.boardsRepository.find();
  }

  createBoard(createBoardDto: CreateBoardDto) {
    return this.boardsRepository.createBoard(createBoardDto);
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

  async deleteBoard(id: number) {
    const result = await this.boardsRepository.delete(id);

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
