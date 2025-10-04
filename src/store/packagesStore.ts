/**
 * Packages Store - Premium plans & purchases / Premium planlar və alışlar
 */

import { create } from 'zustand';

export interface Package {
  id: string;
  name: string;
  nameEn: string;
  nameRu: string;
  price: number;
  priceMonthly?: number;
  currency: string;
  duration: 'monthly' | 'yearly' | 'lifetime';
  features: string[];
  featuresEn: string[];
  featuresRu: string[];
  popular?: boolean;
  stripePriceId?: string;
}

interface PackagesState {
  packages: Package[];
  currentPackage: string | null;
  purchaseInProgress: boolean;
  
  // Actions
  setPackages: (packages: Package[]) => void;
  setCurrentPackage: (packageId: string) => void;
  purchasePackage: (packageId: string) => Promise<boolean>;
  redeemTeacherCode: (code: string) => Promise<boolean>;
  redeemPromoCode: (code: string) => Promise<{ success: boolean; discount?: number }>;
  restorePurchases: () => Promise<void>;
}

export const usePackagesStore = create<PackagesState>((set) => ({
  packages: [],
  currentPackage: null,
  purchaseInProgress: false,
  
  setPackages: (packages) => set({ packages }),
  
  setCurrentPackage: (packageId) => set({ currentPackage: packageId }),
  
  purchasePackage: async (packageId) => {
    set({ purchaseInProgress: true });
    
    try {
      // TODO: Integrate with Stripe / Apple/Google IAP
      // Stripe və ya IAP inteqrasiyası
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay
      
      // Mock success
      set({ currentPackage: packageId, purchaseInProgress: false });
      return true;
    } catch (error) {
      console.error('Purchase failed:', error);
      set({ purchaseInProgress: false });
      return false;
    }
  },
  
  redeemTeacherCode: async (code) => {
    try {
      // TODO: API call to validate and redeem teacher code
      // Müəllim kodunu yoxla və aktivləşdir
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock validation
      if (code === 'TEACHER-DEMO-2025') {
        set({ currentPackage: 'premium' });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Teacher code redemption failed:', error);
      return false;
    }
  },
  
  redeemPromoCode: async (code) => {
    try {
      // TODO: API call to validate promo code
      // Promo kodu yoxla
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock response
      if (code === 'DISCOUNT20') {
        return { success: true, discount: 20 };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Promo code validation failed:', error);
      return { success: false };
    }
  },
  
  restorePurchases: async () => {
    try {
      // TODO: Restore IAP purchases for iOS/Android
      // IAP alışları bərpa et
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Purchases restored');
    } catch (error) {
      console.error('Restore purchases failed:', error);
    }
  },
}));
