import { MainModalWrapper } from '@components/Modals/ModalWrappers/MainModalWrapper';
import React, { createContext, PropsWithChildren, ReactNode, useContext, useMemo, useState } from 'react';
import { Modal } from 'react-native';

interface DialogContextInterface {
  closeDialog: () => void;
  isDialogOpen: boolean;
  openDialog: (content: ReactNode) => void;
}

export const DialogContext = createContext<DialogContextInterface>({
  openDialog: () => null,
  closeDialog: () => null,
  isDialogOpen: false,
});

const modals = {
  main: MainModalWrapper,
};

export interface DialogProviderProps {
  dark?: boolean;
  /*
  In case we  need additional type , we should extend
   */
  type?: 'main';
}

export const DialogProvider = ({ children, type = 'main', ...props }: PropsWithChildren<DialogProviderProps>) => {
  const [dialogContent, setDialogContent] = useState<ReactNode>(null);
  const closeDialog = () => setDialogContent(false);
  const ctx = useMemo(() => {
    return {
      openDialog: (content: ReactNode) => setDialogContent(content),
      closeDialog,
      isDialogOpen: !!dialogContent,
    };
  }, [dialogContent]);

  const Wrapper = modals[`${type}`];

  return (
    <DialogContext.Provider
      value={ctx}
      {...props}
    >
      {children}
      {!!dialogContent && (
        <Modal
          animationType="slide"
          visible={!!dialogContent}
        >
          <Wrapper
            dialogContent={dialogContent}
            {...props}
          />
        </Modal>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);

  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }

  return context;
};
