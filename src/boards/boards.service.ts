import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v4 as uuidv4 } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor(
    // Inject Repository to Service
    @InjectRepository(BoardRepository)
    private boardsRepository: BoardRepository,
  ) {}
  // getAllBoards() {
  //   return this.boards;
  // }
  // createBoard({ title, description }: CreateBoardDto) {
  //   const board: Board = {
  //     id: uuidv4(), // 나중에 DB가 알아서 유니크 값을 줄거다.
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

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
