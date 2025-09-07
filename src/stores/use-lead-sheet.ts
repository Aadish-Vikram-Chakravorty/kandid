import { create } from 'zustand';

type LeadSheetState = {
  isOpen: boolean;
  leadId?: number; // Optional, as it's null when closed
  onOpen: (id: number) => void;
  onClose: () => void;
};

export const useLeadSheet = create<LeadSheetState>((set) => ({
  isOpen: false,
  leadId: undefined,
  onOpen: (id: number) => set({ isOpen: true, leadId: id }),
  onClose: () => set({ isOpen: false, leadId: undefined }),
}));