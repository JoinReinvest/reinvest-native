import { ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { StyledText } from '../components/typography/StyledText/index';
import { TextVariants } from '../components/typography/StyledText/types';
import { Theme } from '../constants/theme';

interface Options {
  color: Theme;
  style: StyleProp<TextStyle>;
  variant: TextVariants;
}

export const parse = (input: string | undefined, matchedStyles: Partial<Options>, noMatchedStyles: Partial<Options>) => {
  if (!input) return [];

  const regex = /{{(.*?)}}/g;
  let match: RegExpExecArray | null;
  const result: ReactNode[] = [];
  let lastIndex = 0;

  while ((match = regex.exec(input)) !== null) {
    const matchIndex = match.index;
    const matchText = match[1];

    if (!matchText) {
      continue;
    }

    if (lastIndex !== matchIndex) {
      const nonMatchText = input.substring(lastIndex, matchIndex);
      result.push(
        <StyledText
          key={result.length}
          {...noMatchedStyles}
        >
          {nonMatchText}
        </StyledText>,
      );
    }

    result.push(
      <StyledText
        key={result.length}
        {...matchedStyles}
      >
        {matchText}
      </StyledText>,
    );
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex !== input.length) {
    const remainingText = input.substring(lastIndex);
    result.push(
      <StyledText
        key={result.length}
        variant="paragraphLarge"
        {...noMatchedStyles}
      >
        {remainingText}
      </StyledText>,
    );
  }

  return result;
};
