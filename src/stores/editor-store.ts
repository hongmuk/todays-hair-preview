import { create } from 'zustand';
import { temporal } from 'zundo';
import { type HairParameters, DEFAULT_HAIR_PARAMS } from '@/types/hair-params';

interface EditorState {
  hairParams: HairParameters;
  isDirty: boolean;

  setHairParam: <K extends keyof HairParameters>(key: K, value: HairParameters[K]) => void;
  setHairParams: (params: Partial<HairParameters>) => void;
  resetParams: () => void;
  loadPreset: (params: HairParameters) => void;
}

export const useEditorStore = create<EditorState>()(
  temporal(
    (set) => ({
      hairParams: { ...DEFAULT_HAIR_PARAMS },
      isDirty: false,

      setHairParam: (key, value) =>
        set((state) => ({
          hairParams: { ...state.hairParams, [key]: value },
          isDirty: true,
        })),

      setHairParams: (params) =>
        set((state) => ({
          hairParams: { ...state.hairParams, ...params },
          isDirty: true,
        })),

      resetParams: () =>
        set({ hairParams: { ...DEFAULT_HAIR_PARAMS }, isDirty: false }),

      loadPreset: (params) =>
        set({ hairParams: { ...params }, isDirty: false }),
    }),
    { limit: 50 }
  )
);
