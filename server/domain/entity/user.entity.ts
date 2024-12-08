type UserEntityProps = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserEntity {
  private props: UserEntityProps;

  constructor(props: UserEntityProps) {
    this.props = props;
  }

  static create(props: Omit<UserEntityProps, "createdAt" | "updatedAt">) {
    return new UserEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
