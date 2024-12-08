type SessionEntityProps = {
  sessionId: string;
  userId: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
};

export class SessionEntity {
  private props: SessionEntityProps;

  constructor(props: SessionEntityProps) {
    this.props = props;
  }

  static create(props: Omit<SessionEntityProps, "createdAt" | "updatedAt">) {
    return new SessionEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  get sessionId() {
    return this.props.sessionId;
  }

  get userId() {
    return this.props.userId;
  }

  get expires() {
    return this.props.expires;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
