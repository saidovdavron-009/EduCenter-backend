
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz, QuizQuestion, QuizOption, QuizResult } from './entities/quiz.entity';
import { Student } from '../students/entities/student.entity';
import { QuizzesController } from './quizzes.controller';
import { CreateQuizHandler } from './commands/create-quiz/handler';
import { UpdateQuizHandler } from './commands/update-quiz/handler';
import { DeleteQuizHandler } from './commands/delete-quiz/handler';
import { PublishQuizHandler } from './commands/publish-quiz/handler';
import { AddQuestionHandler } from './commands/add-question/handler';
import { UpdateQuestionHandler } from './commands/update-question/handler';
import { DeleteQuestionHandler } from './commands/delete-question/handler';
import { SubmitQuizHandler } from './commands/submit-quiz/handler';
import { GetAllQuizzesHandler } from './queries/get-all-quizzes/handler';
import { GetOneQuizHandler } from './queries/get-one-quiz/handler';
import { GetQuizResultsHandler } from './queries/get-results/handler';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, QuizQuestion, QuizOption, QuizResult, Student])],
  controllers: [QuizzesController],
  providers: [
    CreateQuizHandler, UpdateQuizHandler, DeleteQuizHandler, PublishQuizHandler,
    AddQuestionHandler, UpdateQuestionHandler, DeleteQuestionHandler, SubmitQuizHandler,
    GetAllQuizzesHandler, GetOneQuizHandler, GetQuizResultsHandler,
  ],
  exports: [TypeOrmModule],
})
export class QuizzesModule {}