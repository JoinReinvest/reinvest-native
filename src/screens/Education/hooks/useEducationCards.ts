import { useMemo } from 'react';
import { useEncrypt } from 'reinvest-app-common/src/services/queries/encrypt';

import { getApiClient } from '../../../api/getApiClient';
import { EDUCATION_CARD_CALCULATOR, EDUCATION_CARD_GLOSSARY } from '../constants';

export function useEducationCards() {
  const { data: profileToken, isLoading } = useEncrypt(getApiClient, {});

  const cards = useMemo(() => {
    const token = profileToken ?? '';
    const tokenParam = new URLSearchParams({ token }).toString();
    const calculatorUri = `${EDUCATION_CARD_CALCULATOR.uri}?${tokenParam}`;

    return [{ ...EDUCATION_CARD_CALCULATOR, uri: calculatorUri }, EDUCATION_CARD_GLOSSARY];
  }, [profileToken]);

  return { cards, isLoading };
}
