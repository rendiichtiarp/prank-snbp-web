import { create } from 'zustand';

const useFormStore = create((set) => ({
  formData: null,
  setFormData: (data) => set({ formData: data }),
}));

export default useFormStore; 