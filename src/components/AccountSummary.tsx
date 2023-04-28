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
  initials: string;
  label: string;
  accountLabelTextVariant?: TextVariants;
  avatarSize?: AvatarSize;
  endIcon?: ReactNode;
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
  label,
  initials,
  endIcon,
  avatarSize = 'xl',
  nameTextVariant = 'h6',
  accountLabelTextVariant = 'paragraphLarge',
}: AccountSummaryProps) => {
  return (
    <View style={[styles.container]}>
      <Avatar
        initials={initials}
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
            {label}
          </StyledText>
          {endIcon && endIcon}
        </View>
        <StyledText
          color="dark3"
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
