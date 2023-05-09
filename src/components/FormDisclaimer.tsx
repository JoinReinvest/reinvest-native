import React, { PropsWithChildren } from 'react';

import { palette } from '../constants/theme';
import { Row, RowProps } from './Containers/Row';
import { Icon } from './Icon';
import { Icons } from './Icon/types';
import { StyledText } from './typography/StyledText';

interface DisclaimerProps extends RowProps {
  dark?: boolean;
  icon?: Icons;
}

export const FormDisclaimer = ({ icon = 'circleAlert', children, dark, ...props }: PropsWithChildren<DisclaimerProps>) => {
  return (
    <Row
      alignItems="center"
      {...props}
    >
      <Icon
        icon={icon}
        color={dark ? palette.pureWhite : palette.pureBlack}
      />
      <StyledText
        style={{ maxWidth: '98%' }}
        adjustsFontSizeToFit
        color={dark ? 'pureWhite' : 'dark2'}
        variant="paragraph"
      >
        {children}
      </StyledText>
    </Row>
  );
};
