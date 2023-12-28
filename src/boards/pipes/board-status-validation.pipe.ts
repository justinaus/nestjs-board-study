import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // metadata { metatype: [Function: String], type: 'body', data: 'status' }

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    switch (status) {
      case BoardStatus.PUBLIC:
      case BoardStatus.PRIVATE:
        return true;
      default:
        return false;
    }
  }
}
