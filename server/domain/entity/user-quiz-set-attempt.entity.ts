type UserQuizAttemptEntityProps = {
  id: string;
  userId: string;
  quizId: string;
  isCompleted: boolean;
  lastSelectedAnswerOptionId?: string;
  userQuizSetAttemptId?: string;
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

  get isCompleted() {
    return this.props.isCompleted;
  }

  get lastSelectedAnswerOptionId() {
    return this.props.lastSelectedAnswerOptionId;
  }

  get userQuizSetAttemptId() {
    return this.props.userQuizSetAttemptId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
