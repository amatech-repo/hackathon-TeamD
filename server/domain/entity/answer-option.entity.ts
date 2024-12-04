type AnswerOptionEntityProps = {
  id: string;
  answerId: string;
  option: string;
  isCorrect: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class AnswerOptionEntity {
  private props: AnswerOptionEntityProps;

  constructor(props: AnswerOptionEntityProps) {
    this.props = props;
  }

  static create(
    props: Omit<AnswerOptionEntityProps, "createdAt" | "updatedAt">,
  ) {
    return new AnswerOptionEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  get id() {
    return this.props.id;
  }

  get answerId() {
    return this.props.answerId;
  }

  get option() {
    return this.props.option;
  }

  get isCorrect() {
    return this.props.isCorrect;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
