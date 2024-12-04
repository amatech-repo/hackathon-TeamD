type UserScoreEntityProps = {
  id: string;
  userId: string;
  totalScore: number;
  totalQuizzes: number;
  createdAt: Date;
  updatedAt: Date;
};

export class UserScoreEntity {
  private props: UserScoreEntityProps;

  constructor(props: UserScoreEntityProps) {
    this.props = props;
  }

  static create(props: Omit<UserScoreEntityProps, "createdAt" | "updatedAt">) {
    return new UserScoreEntity({
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

  get totalScore() {
    return this.props.totalScore;
  }

  get totalQuizzes() {
    return this.props.totalQuizzes;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
