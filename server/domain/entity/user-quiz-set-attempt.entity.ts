type UserQuizSetAttemptEntityProps = {
  id: string;
  userId: string;
  quizSetId: string;
  lastCorrectQuizzesCount: number;
  lastQuizzesScore: number;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class UserQuizSetAttemptEntity {
  private props: UserQuizSetAttemptEntityProps;

  constructor(props: UserQuizSetAttemptEntityProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get quizSetId(): string {
    return this.props.quizSetId;
  }

  get lastCorrectQuizzesCount(): number {
    return this.props.lastCorrectQuizzesCount;
  }

  get lastQuizzesScore(): number {
    return this.props.lastQuizzesScore;
  }

  get isCompleted(): boolean {
    return this.props.isCompleted;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
