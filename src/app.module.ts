import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BoardsModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
