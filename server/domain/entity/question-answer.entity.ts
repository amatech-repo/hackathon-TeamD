type QuestionAnswerEntityProps = {
  id: string;
  questionId: string;
  answerId: string;
};

export class QuestionAnswerEntity {
  private props: QuestionAnswerEntityProps;

  constructor(props: QuestionAnswerEntityProps) {
    this.props = props;
  }

  static create(props: QuestionAnswerEntityProps) {
    return new QuestionAnswerEntity(props);
  }

  get id() {
    return this.props.id;
  }

  get questionId() {
    return this.props.questionId;
  }

  get answerId() {
    return this.props.answerId;
  }
}
