type TagEntityProps = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export class TagEntity {
  private props: TagEntityProps;

  constructor(props: TagEntityProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
