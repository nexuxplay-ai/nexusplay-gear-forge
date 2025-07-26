import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { License, LicenseTier, LicenseSchema } from '../types';

// Secret for license encryption (in production, use environment variable)
const LICENSE_SECRET = process.env.NEXUS_LICENSE_SECRET || 'nexus-play-secret-key';

export class LicenseManager {
  /**
   * Generate a new license key
   */
  static generateKey(tier: LicenseTier): string {
    const prefix = tier === LicenseTier.PRO_TIER_2 ? 'NEXUS-PRO-T2' : 'NEXUS-PRO';
    const uniqueId = uuidv4().split('-')[0].toUpperCase();
    const checksum = this.generateChecksum(`${prefix}-${uniqueId}`);
    return `${prefix}-${uniqueId}-${checksum}`;
  }

  /**
   * Validate license key format and checksum
   */
  static validateKeyFormat(key: string): boolean {
    const patterns = [
      /^NEXUS-PRO-[A-F0-9]{8}-[A-F0-9]{4}$/, // Tier 1
      /^NEXUS-PRO-T2-[A-F0-9]{8}-[A-F0-9]{4}$/, // Tier 2
      /^NEXUS-PRO-DEMO$/, // Demo keys
      /^NEXUS-PRO-T2-DEMO$/,
    ];

    if (!patterns.some(pattern => pattern.test(key))) {
      return false;
    }

    // Skip checksum validation for demo keys
    if (key.endsWith('-DEMO')) {
      return true;
    }

    const parts = key.split('-');
    const providedChecksum = parts[parts.length - 1];
    const baseKey = parts.slice(0, -1).join('-');
    const expectedChecksum = this.generateChecksum(baseKey);

    return providedChecksum === expectedChecksum;
  }

  /**
   * Extract tier from license key
   */
  static getTierFromKey(key: string): LicenseTier {
    if (key.includes('T2')) {
      return LicenseTier.PRO_TIER_2;
    } else if (key.includes('PRO')) {
      return LicenseTier.PRO_TIER_1;
    }
    return LicenseTier.FREE;
  }

  /**
   * Create a license object from key
   */
  static async createLicense(
    key: string,
    userId?: string,
    expiresAt?: Date
  ): Promise<License> {
    if (!this.validateKeyFormat(key)) {
      throw new Error('Invalid license key format');
    }

    const tier = this.getTierFromKey(key);
    const features = this.getFeaturesForTier(tier);

    const license: License = {
      key,
      tier,
      status: 'active',
      expiresAt,
      userId,
      features,
      maxDevices: tier === LicenseTier.PRO_TIER_2 ? 5 : tier === LicenseTier.PRO_TIER_1 ? 3 : 1,
    };

    return LicenseSchema.parse(license);
  }

  /**
   * Validate license (check expiration, status, etc.)
   */
  static async validateLicense(license: License): Promise<boolean> {
    if (license.status !== 'active') {
      return false;
    }

    if (license.expiresAt && license.expiresAt < new Date()) {
      return false;
    }

    return this.validateKeyFormat(license.key);
  }

  /**
   * Check if license allows specific feature
   */
  static hasFeature(license: License, feature: string): boolean {
    return license.features.includes(feature) || license.features.includes('*');
  }

  /**
   * Get features for license tier
   */
  static getFeaturesForTier(tier: LicenseTier): string[] {
    switch (tier) {
      case LicenseTier.FREE:
        return [
          'basic_optimization',
          'system_monitoring',
          'vsync_disable',
          'fullscreen_optimization',
        ];

      case LicenseTier.PRO_TIER_1:
        return [
          ...this.getFeaturesForTier(LicenseTier.FREE),
          'cpu_optimization',
          'ram_optimization',
          'network_optimization',
          'disk_optimization',
          'advanced_monitoring',
          'preset_profiles',
        ];

      case LicenseTier.PRO_TIER_2:
        return [
          ...this.getFeaturesForTier(LicenseTier.PRO_TIER_1),
          'registry_tweaks',
          'service_optimization',
          'security_bypass',
          'overclocking',
          'thermal_management',
          'custom_profiles',
          'background_optimization',
          'priority_support',
        ];

      default:
        return [];
    }
  }

  /**
   * Encrypt license data for storage
   */
  static encryptLicense(license: License): string {
    const data = JSON.stringify(license);
    return CryptoJS.AES.encrypt(data, LICENSE_SECRET).toString();
  }

  /**
   * Decrypt license data from storage
   */
  static decryptLicense(encryptedData: string): License {
    const bytes = CryptoJS.AES.decrypt(encryptedData, LICENSE_SECRET);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    const license = JSON.parse(decryptedData);
    return LicenseSchema.parse(license);
  }

  /**
   * Generate checksum for license key validation
   */
  private static generateChecksum(input: string): string {
    const hash = CryptoJS.SHA256(input + LICENSE_SECRET).toString();
    return hash.substring(0, 4).toUpperCase();
  }

  /**
   * Mock license validation for demo keys
   */
  static async validateDemoKey(key: string): Promise<License | null> {
    const demoLicenses: Record<string, License> = {
      'NEXUS-PRO-DEMO': {
        key: 'NEXUS-PRO-DEMO',
        tier: LicenseTier.PRO_TIER_1,
        status: 'active',
        features: this.getFeaturesForTier(LicenseTier.PRO_TIER_1),
        maxDevices: 3,
      },
      'NEXUS-PRO-T2-DEMO': {
        key: 'NEXUS-PRO-T2-DEMO',
        tier: LicenseTier.PRO_TIER_2,
        status: 'active',
        features: this.getFeaturesForTier(LicenseTier.PRO_TIER_2),
        maxDevices: 5,
      },
    };

    return demoLicenses[key] || null;
  }

  /**
   * Get license tier display name
   */
  static getTierDisplayName(tier: LicenseTier): string {
    switch (tier) {
      case LicenseTier.FREE:
        return 'Free';
      case LicenseTier.PRO_TIER_1:
        return 'Pro Tier 1';
      case LicenseTier.PRO_TIER_2:
        return 'Pro Tier 2';
      default:
        return 'Unknown';
    }
  }

  /**
   * Get license tier price
   */
  static getTierPrice(tier: LicenseTier): number {
    switch (tier) {
      case LicenseTier.FREE:
        return 0;
      case LicenseTier.PRO_TIER_1:
        return 9.99;
      case LicenseTier.PRO_TIER_2:
        return 19.99;
      default:
        return 0;
    }
  }
}