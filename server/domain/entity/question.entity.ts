type QuestionEntityProps = {
  id: string;
  question: string;
  quizId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class QuestionEntity {
  private props: QuestionEntityProps;

  constructor(props: QuestionEntityProps) {
    this.props = props;
  }

  static create(props: Omit<QuestionEntityProps, "createdAt" | "updatedAt">) {
    return new QuestionEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  get id() {
    return this.props.id;
  }

  get question() {
    return this.props.question;
  }

  get quizId() {
    return this.props.quizId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
