import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

dotenv.config();

@Module({
  imports: [UsersModule,
    MongooseModule.forRoot(process.env.DB_URI, {
      useNewUrlParser: true,
    })],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule {}
