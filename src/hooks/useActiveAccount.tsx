import { currentAccount, useAtom } from '../store/atoms';

export const useCurrentAccount = () => {
  const [activeAccount, setActiveAccount] = useAtom(currentAccount);

  return { activeAccount, setActiveAccount };
};
