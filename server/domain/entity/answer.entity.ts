type AnswerEntityProps = {
  id: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
};

export class AnswerEntity {
  private props: AnswerEntityProps;

  constructor(props: AnswerEntityProps) {
    this.props = props;
  }

  static create(props: Omit<AnswerEntityProps, "createdAt" | "updatedAt">) {
    return new AnswerEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  get id() {
    return this.props.id;
  }

  get type() {
    return this.props.type;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
