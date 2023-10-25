import { ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { AccountType, DraftAccountType, GetAvatarLink } from 'reinvest-app-common/src/types/graphql';

import { Avatar } from './Avatar';
import { AvatarSize } from './Avatar/types';
import { StyledText } from './typography/StyledText';
import { TextVariants } from './typography/StyledText/types';

export interface AccountSummaryProps {
  id: string;
  label: string;
  type: DraftAccountType | AccountType;
  accountLabelTextVariant?: TextVariants;
  avatar?: GetAvatarLink;
  avatarSize?: AvatarSize;
  endIcon?: ReactNode;
  firstName?: string;
  isLoading?: boolean;
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
  type,
  label,
  avatar,
  firstName,
  lastName,
  endIcon,
  avatarSize = 'xl',
  nameTextVariant = 'h6',
  accountLabelTextVariant = 'paragraphLarge',
  isLoading,
}: AccountSummaryProps) => {
  const getLabel = useMemo(() => {
    if (!label && (firstName || lastName)) {
      return `${firstName} | ${lastName}`;
    }

    return label ? label : '';
  }, [label, firstName, lastName]);

  return (
    <View style={[styles.container]}>
      <Avatar
        initials={avatar?.initials || ''}
        variant={type}
        uri={avatar?.url as string}
        size={avatarSize}
        isLoading={isLoading}
      />
      <View>
        <View style={[styles.nameContainer]}>
          <StyledText
            color="pureBlack"
            variant={nameTextVariant}
          >
            {getLabel}
          </StyledText>
          {endIcon && endIcon}
        </View>
        <StyledText
          color="dark1"
          variant={accountLabelTextVariant}
        >
          {AccountTypeLabels[`${type}`]}
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
