import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { AccountType, DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { Avatar } from './Avatar';
import { AvatarSize } from './Avatar/types';
import { StyledText } from './typography/StyledText';
import { TextVariants } from './typography/StyledText/types';

export interface AccountSummaryProps {
  accountId: string;
  accountType: DraftAccountType | AccountType;
  avatarUri: string | undefined;
  firstName: string;
  accountLabelTextVariant?: TextVariants;
  avatarSize?: AvatarSize;
  endIcon?: ReactNode;
  lastName?: string;
  nameTextVariant?: TextVariants;
  selected?: boolean;
}

const AccountTypeLabels: { [key in DraftAccountType | AccountType]: string } = {
  INDIVIDUAL: 'Individual Account',
  CORPORATE: 'Corporate Account',
  TRUST: 'Trust Account',
  BENEFICIARY: 'Beneficiary Account',
};

export const AccountSummary = ({
  accountType,
  avatarUri,
  firstName,
  lastName,
  endIcon,
  avatarSize = 'xl',
  nameTextVariant = 'h6',
  accountLabelTextVariant = 'paragraphLarge',
}: AccountSummaryProps) => {
  const username = `${firstName} ${lastName ? lastName : ''}`;

  return (
    <View style={[styles.container]}>
      <Avatar
        username={username}
        variant={accountType}
        uri={avatarUri}
        size={avatarSize}
      />
      <View>
        <View style={[styles.nameContainer]}>
          <StyledText
            color="pureBlack"
            variant={nameTextVariant}
          >
            {username}
          </StyledText>
          {endIcon && endIcon}
        </View>
        <StyledText
          color="dark1"
          variant={accountLabelTextVariant}
        >
          {AccountTypeLabels[`${accountType}`]}
        </StyledText>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
});
