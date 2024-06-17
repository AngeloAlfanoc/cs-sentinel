import { create } from 'zustand';

interface Breadcrumb {
  label: string;
  href: string;
}

interface BreadcrumbsState {
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  addBreadcrumb: (breadcrumb: Breadcrumb) => void;
  clearBreadcrumbs: () => void;
}

const useBreadcrumbsStore = create<BreadcrumbsState>((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
  addBreadcrumb: (breadcrumb) =>
    set((state) => ({
      breadcrumbs: [...state.breadcrumbs, breadcrumb]
    })),
  clearBreadcrumbs: () => set({ breadcrumbs: [] })
}));

export default useBreadcrumbsStore;
