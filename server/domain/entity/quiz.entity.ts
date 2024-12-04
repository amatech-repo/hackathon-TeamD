type QuizEntityProps = {
  id: string;
  quizSetId?: string;
  level: number;
  creatorId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class QuizEntity {
  private props: QuizEntityProps;

  constructor(props: QuizEntityProps) {
    this.props = props;
  }

  static create(props: Omit<QuizEntityProps, "createdAt" | "updatedAt">) {
    return new QuizEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  get id() {
    return this.props.id;
  }

  get quizSetId() {
    return this.props.quizSetId;
  }

  get level() {
    return this.props.level;
  }

  get creatorId() {
    return this.props.creatorId;
  }

  get isPublic() {
    return this.props.isPublic;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
