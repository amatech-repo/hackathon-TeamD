type QuizModificationEntityProps = {
  id: string;
  quizId: string;
  userId: string;
  requestType: string;
  newQuestion?: string;
  newTitle?: string;
  newDescription?: string;
  newAnswer?: string;
  newLevel?: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export class QuizModificationEntity {
  private props: QuizModificationEntityProps;

  constructor(props: QuizModificationEntityProps) {
    this.props = props;
  }

  static create(
    props: Omit<QuizModificationEntityProps, "createdAt" | "updatedAt">,
  ) {
    return new QuizModificationEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  get id() {
    return this.props.id;
  }

  get quizId() {
    return this.props.quizId;
  }

  get userId() {
    return this.props.userId;
  }

  get requestType() {
    return this.props.requestType;
  }

  get newQuestion() {
    return this.props.newQuestion;
  }

  get newTitle() {
    return this.props.newTitle;
  }

  get newDescription() {
    return this.props.newDescription;
  }

  get newAnswer() {
    return this.props.newAnswer;
  }

  get newLevel() {
    return this.props.newLevel;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
