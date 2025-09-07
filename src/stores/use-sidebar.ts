import { create } from 'zustand';

type SidebarState = {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggle: () => void; // Add this line
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })), // Add this line
}));