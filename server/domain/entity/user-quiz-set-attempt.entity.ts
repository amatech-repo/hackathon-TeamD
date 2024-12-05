type UserQuizSetAttemptEntityProps = {
  id: string;
  title: string;
  description?: string;
  level: number;
  creatorId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class UserQuizSetAttemptEntity {
  private props: UserQuizSetAttemptEntityProps;

  constructor(props: UserQuizSetAttemptEntityProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get title(): string {
    return this.props.title;
  }
  get description(): string | undefined {
    return this.props.description;
  }
  get level(): number {
    return this.props.level;
  }
  get creatorId(): string {
    return this.props.creatorId;
  }
  get isPublic(): boolean {
    return this.props.isPublic;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
