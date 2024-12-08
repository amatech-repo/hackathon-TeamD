type SearchQuizEntityProps = {
  quizId: string;
  title: string;
  level: number;
};

export class SearchQuizEntity {
  private props: SearchQuizEntityProps;
  constructor(props: SearchQuizEntityProps) {
    this.props = props;
  }
  get quizId(): string {
    return this.props.quizId;
  }
  get title(): string {
    return this.props.title;
  }
  get level(): number {
    return this.props.level;
  }
}
