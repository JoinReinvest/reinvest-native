import { AccountSummary } from '../AccountSummary';
import { Row } from '../Containers/Row';
import { RadioButton } from '../RadioButton';
import { styles } from './styles';
import { SwitchAccountItemProps } from './types';

export const SwitchAccountItem = ({ id, selected = false, onPress, ...rest }: SwitchAccountItemProps) => {
  return (
    <Row style={styles.switchAccountContainer}>
      <AccountSummary
        id={id}
        {...rest}
      />
      <RadioButton
        checked={selected}
        onPress={onPress}
        value={id}
      />
    </Row>
  );
};
