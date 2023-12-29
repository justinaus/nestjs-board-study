import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    // Inject Repository to Service
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}
  // getAllBoards() {
  //   return this.boards;
  // }
  async createBoard({ title, description }: CreateBoardDto) {
    const board = this.boardsRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardsRepository.save(board);

    return board;
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

  // deleteBoard(id: string) {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus) {
  //   const board = this.getBoardById(id);
  //   // TODO. undefined 처리?
  //   board.status = status;
  //   return board;
  // }
}
