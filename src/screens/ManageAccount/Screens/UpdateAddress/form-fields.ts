import { Maybe, Scalars } from 'reinvest-app-common/src/types/graphql';

export interface AddressFields {
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
}
