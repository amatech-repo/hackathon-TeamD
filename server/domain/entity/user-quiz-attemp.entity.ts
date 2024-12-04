type UserQuizAttemptEntityProps = {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  isCompleted: boolean;
  lastSelectedAnswerOptionId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserQuizAttemptEntity {
  private props: UserQuizAttemptEntityProps;

  constructor(props: UserQuizAttemptEntityProps) {
    this.props = props;
  }

  static create(
    props: Omit<UserQuizAttemptEntityProps, "createdAt" | "updatedAt">,
  ) {
    return new UserQuizAttemptEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get quizId() {
    return this.props.quizId;
  }

  get score() {
    return this.props.score;
  }

  get isCompleted() {
    return this.props.isCompleted;
  }

  get lastSelectedAnswerOptionId() {
    return this.props.lastSelectedAnswerOptionId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
