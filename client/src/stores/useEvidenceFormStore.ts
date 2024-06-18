import { create } from 'zustand';

export interface EvidenceFormState {
  selectedType: string;
  step: number;
  setType: (type: string) => void;
  setStep: (step: number) => void;
  setStepValidated: (validated: number[]) => void;
  stepValidated: number[];
}

const useEvidenceFormStore = create<EvidenceFormState>((set) => ({
  selectedType: '',
  step: 0,
  setType: (type: string) => set({ selectedType: type }),
  setStep: (step: number) => set({ step }),
  setStepValidated: (validated: number[]) =>
    set((state) => ({ stepValidated: [...state.stepValidated, ...validated] })),
  stepValidated: []
}));

export default useEvidenceFormStore;
