import { z } from 'zod';

// System Information Types
export const SystemInfoSchema = z.object({
  cpu: z.object({
    usage: z.number().min(0).max(100),
    temperature: z.number().min(0).max(120),
    cores: z.number().int().positive(),
    frequency: z.number().positive(),
    model: z.string().optional(),
  }),
  memory: z.object({
    used: z.number().positive(),
    total: z.number().positive(),
    available: z.number().positive(),
  }),
  gpu: z.object({
    usage: z.number().min(0).max(100),
    temperature: z.number().min(0).max(120),
    memory: z.number().positive(),
    power: z.number().positive(),
    model: z.string().optional(),
  }),
  disk: z.object({
    used: z.number().positive(),
    total: z.number().positive(),
    readSpeed: z.number().positive(),
    writeSpeed: z.number().positive(),
  }),
  network: z.object({
    download: z.number().positive(),
    upload: z.number().positive(),
    latency: z.number().positive(),
  }),
  system: z.object({
    uptime: z.number().int().nonnegative(),
    processes: z.number().int().positive(),
    threats: z.number().int().nonnegative(),
    platform: z.enum(['windows', 'macos', 'linux', 'android', 'ios']),
  }),
});

export type SystemInfo = z.infer<typeof SystemInfoSchema>;

// License Types
export enum LicenseTier {
  FREE = 'free',
  PRO_TIER_1 = 'pro_tier_1',
  PRO_TIER_2 = 'pro_tier_2',
}

export const LicenseSchema = z.object({
  key: z.string().min(1),
  tier: z.nativeEnum(LicenseTier),
  status: z.enum(['active', 'expired', 'suspended', 'invalid']),
  expiresAt: z.date().optional(),
  userId: z.string().optional(),
  features: z.array(z.string()),
  maxDevices: z.number().int().positive().default(1),
});

export type License = z.infer<typeof LicenseSchema>;

// Optimization Types
export const OptimizationSettingsSchema = z.object({
  // Basic optimizations (Free tier)
  disableVsync: z.boolean().default(false),
  fullscreenOptimization: z.boolean().default(false),
  highPerformanceMode: z.boolean().default(false),
  disableWindowsUpdates: z.boolean().default(false),
  gameMode: z.boolean().default(false),
  backgroundApps: z.boolean().default(false),
  
  // Pro Tier 1 optimizations
  cpuOptimization: z.boolean().default(false),
  ramOptimization: z.boolean().default(false),
  diskOptimization: z.boolean().default(false),
  networkOptimization: z.boolean().default(false),
  mouseSensitivity: z.boolean().default(false),
  systemCleaner: z.boolean().default(false),
  
  // Pro Tier 2 optimizations
  advancedTweaks: z.boolean().default(false),
  customRegistry: z.boolean().default(false),
  serviceOptimization: z.boolean().default(false),
  securityBypass: z.boolean().default(false),
  overclocking: z.boolean().default(false),
  thermalManagement: z.boolean().default(false),
});

export type OptimizationSettings = z.infer<typeof OptimizationSettingsSchema>;

export const OptimizationPresetSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  requiredTier: z.nativeEnum(LicenseTier),
  platform: z.enum(['windows', 'macos', 'linux', 'android', 'ios']),
  settings: OptimizationSettingsSchema,
  performance: z.object({
    expectedFpsGain: z.number().min(0).max(100),
    expectedLatencyReduction: z.number().min(0).max(100),
    systemImpact: z.enum(['low', 'medium', 'high']),
  }),
});

export type OptimizationPreset = z.infer<typeof OptimizationPresetSchema>;

// API Response Types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  timestamp: z.date().default(() => new Date()),
});

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
};

// User Types
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  license: LicenseSchema.optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']).default('dark'),
    notifications: z.boolean().default(true),
    autoOptimize: z.boolean().default(false),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// Hardware Detection Types
export const HardwareProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  cpu: z.string(),
  gpu: z.string(),
  ram: z.number().positive(),
  storage: z.enum(['hdd', 'ssd', 'nvme']),
  platform: z.enum(['windows', 'macos', 'linux', 'android', 'ios']),
  recommendedPresets: z.array(z.string()),
});

export type HardwareProfile = z.infer<typeof HardwareProfileSchema>;

// Telemetry Types
export const TelemetryEventSchema = z.object({
  event: z.string(),
  userId: z.string().optional(),
  sessionId: z.string(),
  timestamp: z.date().default(() => new Date()),
  platform: z.enum(['web', 'desktop', 'mobile']),
  data: z.record(z.any()).optional(),
});

export type TelemetryEvent = z.infer<typeof TelemetryEventSchema>;

// Export all schemas for validation
export const schemas = {
  SystemInfoSchema,
  LicenseSchema,
  OptimizationSettingsSchema,
  OptimizationPresetSchema,
  ApiResponseSchema,
  UserSchema,
  HardwareProfileSchema,
  TelemetryEventSchema,
} as const;