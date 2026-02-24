"use client";

import { useState, useCallback } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

export interface Pack {
  packId: string;
  name: string;
  tokens: number;
  priceNGN: number;
  priceUSD: number;
  isActive: boolean;
  polarProductId?: string;
}

export interface TokenCosts {
  formAnalysis: number;
  textEnhancement: number;
  cvParsing: number;
  profileUsage: number;
}

export interface CreditStats {
  totalPurchased: number;
  totalUsed: number;
  totalRefunded: number;
  totalBonus: number;
  purchaseCount: number;
  usageCount: number;
}

export interface Transaction {
  id: string;
  type: "purchase" | "usage" | "refund" | "bonus";
  amount: number;
  balanceAfter: number;
  description: string;
  metadata?: {
    packId?: string;
    packName?: string;
    operation?: string;
    priceUSD?: number;
    priceNGN?: number;
  };
  createdAt: string;
}

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  const getCredits = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/payment/credits");
      return response.data.data as {
        credits: number;
        stats: CreditStats;
      };
    } catch (error: any) {
      toast.error("Failed to fetch credits", {
        description: error.response?.data?.message || "Please try again",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTransactions = useCallback(
    async (options?: { limit?: number; skip?: number; type?: string }) => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (options?.limit) params.append("limit", options.limit.toString());
        if (options?.skip) params.append("skip", options.skip.toString());
        if (options?.type) params.append("type", options.type);

        const response = await api.get(`/payment/transactions?${params}`);
        return response.data.data as Transaction[];
      } catch (error: any) {
        toast.error("Failed to fetch transactions", {
          description: error.response?.data?.message || "Please try again",
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createCheckout = useCallback(async (packId: string) => {
    try {
      setCheckoutLoading(packId);
      const response = await api.post("/payment/checkout", { packId });
      const { checkoutUrl } = response.data.data;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }

      return response.data.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to start checkout";
      toast.error("Checkout failed", {
        description: message,
      });
      throw error;
    } finally {
      setCheckoutLoading(null);
    }
  }, []);

  const getPricing = useCallback(async () => {
    try {
      const response = await api.get("/pricing");
      return response.data.data as {
        tokenCosts: TokenCosts;
        packs: Pack[];
      };
    } catch (error: any) {
      console.error("Failed to fetch pricing:", error);
      throw error;
    }
  }, []);

  return {
    loading,
    checkoutLoading,
    getCredits,
    getTransactions,
    createCheckout,
    getPricing,
  };
}

export default usePayment;
