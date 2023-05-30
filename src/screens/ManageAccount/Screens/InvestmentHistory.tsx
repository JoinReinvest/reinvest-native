import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { InvestmentStatus, InvestmentSummary } from 'reinvest-app-common/src/types/graphql';

import { Box } from '../../../components/Containers/Box/Box';
import { palette } from '../../../constants/theme';
import { InvestmentItem } from '../components/investmentItem';

const investments: InvestmentSummary[] = [
  {
    id: '0',
    tradeId: '12345',
    amount: {
      formatted: '$525.00',
      value: 525,
    },
    createdAt: '2023-05-28',
    investmentFees: {
      formatted: '$10.00',
      value: 10.0,
    },
    status: InvestmentStatus.InProgress,
  },
  {
    id: '1',
    tradeId: '12345',
    amount: {
      formatted: '$525.00',
      value: 525,
    },
    createdAt: '2023-05-28',
    investmentFees: {
      formatted: '$10.00',
      value: 10.0,
    },
    status: InvestmentStatus.InProgress,
  },
  {
    id: '2',
    tradeId: '12345',
    amount: {
      formatted: '$525.00',
      value: 525,
    },
    createdAt: '2023-05-28',
    investmentFees: {
      formatted: '$10.00',
      value: 10.0,
    },
    status: InvestmentStatus.InProgress,
  },
  {
    id: '3',
    tradeId: '12345',
    amount: {
      formatted: '$525.00',
      value: 525,
    },
    createdAt: '2023-05-28',
    investmentFees: {
      formatted: '$10.00',
      value: 10.0,
    },
    status: InvestmentStatus.InProgress,
  },
];

export const InvestmentHistory = () => {
  return (
    <Box
      pt="24"
      pl="24"
      pr="16"
      style={{ backgroundColor: palette.pureWhite }}
      fw
      flex={1}
    >
      <FlatList
        data={investments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <InvestmentItem {...item} />}
      />
    </Box>
  );
};
