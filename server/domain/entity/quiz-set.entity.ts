type QuizSetEntityProps = {
  id: string;
  title: string;
  description?: string;
  level: number;
  creatorId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class QuizSetEntity {
  private props: QuizSetEntityProps;

  constructor(props: QuizSetEntityProps) {
    this.props = props;
  }

  static create(props: Omit<QuizSetEntityProps, "createdAt" | "updatedAt">) {
    return new QuizSetEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
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
