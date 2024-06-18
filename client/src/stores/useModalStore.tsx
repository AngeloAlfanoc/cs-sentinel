import { create } from 'zustand';

type ModalState = {
  isModalOpen: boolean;
  toggleModal: () => void;
  setPayload: (state: Payload) => void;
  modalHeader: JSX.Element;
  modalContent: JSX.Element;
  modalFooter: JSX.Element;
};

type Payload = {
  modalHeader: JSX.Element;
  modalContent: JSX.Element;
  modalFooter: JSX.Element;
};

const useStore = create<ModalState>((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  setPayload: (state: Payload) =>
    set(() => ({
      modalHeader: state.modalHeader,
      modalContent: state.modalContent,
      modalFooter: state.modalFooter
    })),
  modalHeader: <></>,
  modalContent: <></>,
  modalFooter: <></>
}));

export default useStore;
