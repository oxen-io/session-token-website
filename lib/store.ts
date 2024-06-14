import { create } from 'zustand';
import { createTrackedSelector } from 'react-tracked';

const useStore = create((set) => ({
  lenis: undefined,
  setLenis: (lenis) => set({ lenis }),
  modalData: null,
  openModal: (props) => set({ modalData: { ...props, isVisible: true } }),
  closeModal: () => set((_state) => ({ modalData: { data: null, isVisible: false } })),
  applyType: 0,
  setApplyType: (applyType) => set({ applyType }),
}));

export default createTrackedSelector(useStore);
