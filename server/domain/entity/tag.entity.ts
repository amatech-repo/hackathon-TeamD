type OAuthAccountEntityProps = {
  userId: string;
  providerId: string;
  providerAccountId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class OAuthAccountEntity {
  private props: OAuthAccountEntityProps;

  constructor(props: OAuthAccountEntityProps) {
    this.props = props;
  }

  static create(
    props: Omit<OAuthAccountEntityProps, "createdAt" | "updatedAt">,
  ) {
    return new OAuthAccountEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  get userId() {
    return this.props.userId;
  }

  get providerId() {
    return this.props.providerId;
  }

  get providerAccountId() {
    return this.props.providerAccountId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
