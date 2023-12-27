import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  createBoard({ title, description }: CreateBoardDto) {
    const board: Board = {
      id: uuidv4(), // 나중에 DB가 알아서 유니크 값을 줄거다.
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);

    return board;
  }

  // TODO. 왜 리턴 타입이 Board로 추론 되는지 이해가 안감. Board | undefined로 추론되어야 하는거 아닌가?
  getBoardById(id: string) {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string) {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus) {
    const board = this.getBoardById(id);

    // TODO. undefined 처리?

    board.status = status;
    return board;
  }
}
