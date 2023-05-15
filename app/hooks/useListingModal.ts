import { create } from "zustand";

interface ListingModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useListingModal = create<ListingModalStore>((set) => {
  return {
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  };
});

export default useListingModal;
