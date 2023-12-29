import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

// TODO...
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
