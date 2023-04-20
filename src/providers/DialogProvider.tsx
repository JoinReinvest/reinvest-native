import React, { createContext, PropsWithChildren, ReactNode, useContext, useMemo, useState } from 'react';
import { Modal } from 'react-native';

import { MainModalWrapper } from '../components/Modals/ModalWrappers/MainModalWrapper';
import { SheetModalWrapper } from '../components/Modals/ModalWrappers/SheetModalWrapper';

type AnimationType = 'slide' | 'none' | 'fade';

interface Options {
  animationType: AnimationType;
  closeIcon: boolean;
}

interface DialogContextInterface {
  closeDialog: () => void;
  isDialogOpen: boolean;
  openDialog: (content: ReactNode, options?: Partial<Options>, type?: ModalTypes) => void;
}

export const DialogContext = createContext<DialogContextInterface>({
  openDialog: () => null,
  closeDialog: () => null,
  isDialogOpen: false,
});

const modals = {
  main: MainModalWrapper,
  sheet: SheetModalWrapper,
};

type ModalTypes = keyof typeof modals;

export interface DialogProviderProps {
  animationType?: AnimationType;
  dark?: boolean;
  /*
  In case we  need additional type , we should extend
   */
  type?: 'main';
}

export const DialogProvider = ({ children, type = 'main', ...props }: PropsWithChildren<DialogProviderProps>) => {
  const [dialogContent, setDialogContent] = useState<ReactNode>(null);
  const [closeIconVisible, setCloseIconVisible] = useState<boolean>(true);
  const [animationType, setAnimationType] = useState<AnimationType>('slide');
  const [modalType, setModalType] = useState<ModalTypes>(type);

  const closeDialog = () => {
    setDialogContent(false);
    setModalType('main');
  };

  const ctx = useMemo(() => {
    return {
      openDialog: (content: ReactNode, options?: Partial<Options>, type?: ModalTypes) => {
        if (type) {
          setModalType(type);
        }

        setDialogContent(content);
        setCloseIconVisible(options?.closeIcon ?? true);
        setAnimationType(options?.animationType ?? 'slide');
      },
      closeDialog,
      isDialogOpen: !!dialogContent,
    };
  }, [dialogContent]);

  const Wrapper = modals[`${modalType}`];

  return (
    <DialogContext.Provider
      value={ctx}
      {...props}
    >
      {children}
      {!!dialogContent && (
        <Modal
          animationType={animationType}
          visible={!!dialogContent}
          transparent
        >
          <Wrapper
            closeIcon={closeIconVisible}
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
