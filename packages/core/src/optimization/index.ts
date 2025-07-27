export interface OptimizationSettings {
  fpsBoost: boolean;
  networkOptimization: boolean;
  gpuTweaks: boolean;
}

export const defaultOptimizationSettings: OptimizationSettings = {
  fpsBoost: false,
  networkOptimization: false,
  gpuTweaks: false,
};