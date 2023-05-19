import { StyleSheet, View } from 'react-native';

import { Box } from '../../../components/Containers/Box/Box';
import { NavigationButton } from '../../../components/NavigationButton';
import { StyledText } from '../../../components/typography/StyledText';
import { NavigationIdentifiers } from '../../../constants/navigationLinks';
import { palette } from '../../../constants/theme';
import { Link } from '../../../types/link';

interface LinksSegmentProps {
  heading: string;
  links: Link[];
  onPress: (identifier: NavigationIdentifiers, heading: string, cancellable?: boolean) => void;
  size: 'l' | 's';
  disableSeparator?: boolean;
}
export const LinksSegment = ({ heading, links, disableSeparator = false, size, onPress }: LinksSegmentProps) => {
  return (
    <>
      <StyledText variant="h5">{heading}</StyledText>
      <Box
        fw
        style={styles.linksContainer}
      >
        {links.map(({ identifier, label, cancellable }) => (
          <Box
            fw
            key={identifier}
          >
            <NavigationButton
              size={size}
              onPress={() => onPress(identifier, heading, cancellable)}
              label={label}
            />
          </Box>
        ))}
      </Box>
      {!disableSeparator && <View style={styles.separator} />}
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: palette.lightGray,
    marginTop: 28,
    marginBottom: 24,
  },
  linksContainer: {
    marginTop: 28,
    rowGap: 24,
  },
});
