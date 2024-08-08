import { Test, TestingModule } from '@nestjs/testing';
import { QuizSubmissionsController } from './quiz-submissions.controller';

describe('QuizSubmissionsController', () => {
  let controller: QuizSubmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizSubmissionsController],
    }).compile();

    controller = module.get<QuizSubmissionsController>(
      QuizSubmissionsController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
