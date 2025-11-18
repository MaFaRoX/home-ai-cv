"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type SharePlatform = 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'email' | 'copylink';

export interface ShareEvent {
  platform: SharePlatform;
  timestamp: number;
}

export interface ShareStats {
  platform: SharePlatform;
  count: number;
  label: string;
  color: string;
}

export interface TimeRange {
  start: number;
  end: number;
}

export interface TrendData {
  date: string;
  timestamp: number;
  total: number;
  facebook: number;
  twitter: number;
  linkedin: number;
  whatsapp: number;
  email: number;
  copylink: number;
}

export interface ComparisonData {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
}

interface AnalyticsContextType {
  trackShare: (platform: SharePlatform) => void;
  getShareStats: (range?: TimeRange) => ShareStats[];
  getTotalShares: (range?: TimeRange) => number;
  getTrendData: (range: TimeRange, groupBy: 'day' | 'week' | 'month') => TrendData[];
  getComparison: (range: TimeRange) => ComparisonData;
  clearAnalytics: () => void;
  shareHistory: ShareEvent[];
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

const STORAGE_KEY = 'cv_maker_share_analytics';

const platformConfig: Record<SharePlatform, { label: string; color: string }> = {
  facebook: { label: 'Facebook', color: '#1877F2' },
  twitter: { label: 'Twitter/X', color: '#1DA1F2' },
  linkedin: { label: 'LinkedIn', color: '#0A66C2' },
  whatsapp: { label: 'WhatsApp', color: '#25D366' },
  email: { label: 'Email', color: '#6B7280' },
  copylink: { label: 'Copy Link', color: '#8B5CF6' },
};

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [shareHistory, setShareHistory] = useState<ShareEvent[]>([]);

  // Load analytics from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setShareHistory(parsed);
      } catch (e) {
        console.error('Failed to load analytics:', e);
      }
    }
  }, []);

  // Save analytics to localStorage whenever it changes
  useEffect(() => {
    if (shareHistory.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shareHistory));
    }
  }, [shareHistory]);

  const trackShare = (platform: SharePlatform) => {
    const event: ShareEvent = {
      platform,
      timestamp: Date.now(),
    };
    setShareHistory(prev => [...prev, event]);
  };

  const filterByRange = (events: ShareEvent[], range?: TimeRange): ShareEvent[] => {
    if (!range) return events;
    return events.filter(e => e.timestamp >= range.start && e.timestamp <= range.end);
  };

  const getShareStats = (range?: TimeRange): ShareStats[] => {
    const filteredEvents = filterByRange(shareHistory, range);
    const counts = filteredEvents.reduce((acc, event) => {
      acc[event.platform] = (acc[event.platform] || 0) + 1;
      return acc;
    }, {} as Record<SharePlatform, number>);

    return Object.entries(platformConfig).map(([platform, config]) => ({
      platform: platform as SharePlatform,
      count: counts[platform as SharePlatform] || 0,
      label: config.label,
      color: config.color,
    }));
  };

  const getTotalShares = (range?: TimeRange) => {
    return filterByRange(shareHistory, range).length;
  };

  const getTrendData = (range: TimeRange, groupBy: 'day' | 'week' | 'month'): TrendData[] => {
    const filteredEvents = filterByRange(shareHistory, range);
    const grouped: { [key: string]: TrendData } = {};

    filteredEvents.forEach(event => {
      const date = new Date(event.timestamp);
      let key: string;
      
      if (groupBy === 'day') {
        key = date.toISOString().split('T')[0]; // YYYY-MM-DD
      } else if (groupBy === 'week') {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
      } else {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      }

      if (!grouped[key]) {
        grouped[key] = {
          date: key,
          timestamp: new Date(key).getTime(),
          total: 0,
          facebook: 0,
          twitter: 0,
          linkedin: 0,
          whatsapp: 0,
          email: 0,
          copylink: 0,
        };
      }

      grouped[key].total++;
      grouped[key][event.platform]++;
    });

    return Object.values(grouped).sort((a, b) => a.timestamp - b.timestamp);
  };

  const getComparison = (range: TimeRange): ComparisonData => {
    const duration = range.end - range.start;
    const previousRange: TimeRange = {
      start: range.start - duration,
      end: range.start,
    };

    const currentCount = getTotalShares(range);
    const previousCount = getTotalShares(previousRange);
    const change = currentCount - previousCount;
    const changePercent = previousCount === 0 ? 100 : (change / previousCount) * 100;

    return {
      current: currentCount,
      previous: previousCount,
      change,
      changePercent,
    };
  };

  const clearAnalytics = () => {
    setShareHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AnalyticsContext.Provider value={{
      trackShare,
      getShareStats,
      getTotalShares,
      getTrendData,
      getComparison,
      clearAnalytics,
      shareHistory,
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
}
