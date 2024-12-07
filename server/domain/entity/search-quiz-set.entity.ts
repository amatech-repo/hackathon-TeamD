type SearchQuizSetEntityProps = {
  quizsetId: string;
  title: string;
  description: string | null;
  level: number;
  tags: { name: string; id: string }[];
};
export class SearchQuizSetEntity {
  private props: SearchQuizSetEntityProps;
  constructor(props: SearchQuizSetEntityProps) {
    this.props = props;
  }
  get quizsetId(): string {
    return this.props.quizsetId;
  }
  get title(): string {
    return this.props.title;
  }
  get description(): string | null {
    return this.props.description;
  }
  get level(): number {
    return this.props.level;
  }
  get tags(): { name: string; id: string }[] {
    return this.props.tags;
  }
}
