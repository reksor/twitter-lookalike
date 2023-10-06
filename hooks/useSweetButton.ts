import { create } from "zustand";

interface SweetModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSweetModal = create<SweetModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSweetModal;
