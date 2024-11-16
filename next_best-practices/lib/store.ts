import { create } from 'zustand';

interface LayoutState {
    sidebarOpen: boolean
}

interface LayoutActions {
    setSidebarOpen: (value: boolean) => void
}

const useLayoutStore = create<LayoutState & LayoutActions>()((set) => ({
    sidebarOpen: false,
    setSidebarOpen: (value) => set(({ sidebarOpen: value }))
}))

export default useLayoutStore