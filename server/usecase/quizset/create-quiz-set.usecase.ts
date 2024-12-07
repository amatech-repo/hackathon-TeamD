import { QuizSetEntity } from "@server/domain/entity/quiz-set.entity";
import { TagEntity } from "@server/domain/entity/tag.entity";
import { IAnswerOptionRepository } from "@server/domain/interface/repository/answer-option.repository.interface";
import { IAnswerRepository } from "@server/domain/interface/repository/answer.repository.interface";
import { IQuestionRepository } from "@server/domain/interface/repository/question.repository.interface";
import { IQuizSetTagRepository } from "@server/domain/interface/repository/quiz-set-tag.repository.interface";
import { IQuizSetRepository } from "@server/domain/interface/repository/quiz-set.repository.interface";
import { IQuizRepository } from "@server/domain/interface/repository/quiz.repository.interface";
import { ITagRepository } from "@server/domain/interface/repository/tag.repository.interface";
import { AnswerOptionRepository } from "@server/infra/repository/answer-option.repository";
import { AnswerRepository } from "@server/infra/repository/answer.repository";
import { QuestionRepository } from "@server/infra/repository/question.repository";
import { QuizSetTagRepository } from "@server/infra/repository/quiz-set-tag.repository";
import { QuizSetRepository } from "@server/infra/repository/quiz-set.repository";
import { QuizRepository } from "@server/infra/repository/quiz.repository";
import { TagRepository } from "@server/infra/repository/tag.repository";
import { Context } from "hono";

export async function CreateQuizSetUseCase({
  title,
  description,
  level,
  creatorId,
  isPublic,
  tags,
  c,
  quizzes,
}: {
  title: string;
  description?: string;
  level: number;
  creatorId: string;
  isPublic: boolean;
  tags: string[];
  c: Context;
  quizzes: {
    question: string;
    type: string;
    options: {
      isCorrect: boolean; //createdOptionsの部分
      option: string;
    }[];
  }[];
}): Promise<{
  quizSet: QuizSetEntity;
  tags: TagEntity[];
}> {
  const quizSetRepository: IQuizSetRepository = new QuizSetRepository();
  const tagRepository: ITagRepository = new TagRepository();
  const quizRepository: IQuizRepository = new QuizRepository();
  const questionRepository: IQuestionRepository = new QuestionRepository();
  const answerRepository: IAnswerRepository = new AnswerRepository();
  const answerOptionRepository: IAnswerOptionRepository =
    new AnswerOptionRepository();
  const quizSetTagRepository: IQuizSetTagRepository =
    new QuizSetTagRepository();
  await quizSetRepository.initPrisma(c);
  await tagRepository.initPrisma(c);
  await quizRepository.initPrisma(c); //環境変数を渡すため
  await questionRepository.initPrisma(c);
  await answerRepository.initPrisma(c);
  await answerOptionRepository.initPrisma(c);
  const createdQuizSet = await quizSetRepository.createQuizSet({
    title,
    description,
    level,
    creatorId,
    isPublic,
  });
  const createdTags = await tagRepository.createTags(tags);
  quizSetTagRepository.createOneQuizSetAndManyTags({
    quizSetId: createdQuizSet.id,
    tagIds: createdTags.map((tag) => tag.id),
  });
  for (const quiz of quizzes) {
    const createdQuiz = await quizRepository.createQuiz({
      level,
      isPublic,
      creatorId,
    });
    const createdQuestion = await questionRepository.createQuestion({
      quizId: createdQuiz.id,
      question: quiz.question,
    });
    const createdAnswer = await answerRepository.createAnswer({
      questionId: createdQuestion.id,
      type: quiz.type,
    });

    await answerOptionRepository.createAnswerOptions({
      options: quiz.options,
      answerId: createdAnswer.id,
    });
  }
  return {
    quizSet: createdQuizSet,
    tags: createdTags,
  };
}
