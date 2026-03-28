export type Mode = 'SAFE' | 'TURBO' | 'YOLO' | 'CUSTOM';

export interface ModePreset {
  name: Mode;
  params: BotParams;
  description: string;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  color: string;
}

export interface BotParams {
  entryLiquidityUsd: number;
  exitLiquidityUsd: number;
  slippagePct: number;
  takeProfitPct: number;
  stopLossPct: number;
  tokenAgeMaxHr: number;
  amountToSpendUsd: number;
}

export interface TradeItem {
  id: string;
  timestampIso: string;
  token: string;
  side: 'BUY' | 'SELL';
  sizeUsd: number;
  entryPrice?: number;
  exitPrice?: number;
  pnlUsd?: number;
  roiPct?: number;
  mode: Mode;
  feesUsd?: number;
  txHash: string;
  walletAddress: string;
  strategyId?: string;
  xpEarned?: number;
}

export interface CreditPack {
  key: 'starter' | 'grinder' | 'whale';
  trades: number;
  priceUsd: number;
  caption: string;
  popular?: boolean;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName?: string;
  bio?: string;
  photoUrl?: string;
  level: number;
  xp: number;
  totalPnl: number;
  winRate: number;
  streak: number;
}

export type BotStatus = 'STOPPED' | 'RUNNING' | 'PAUSED';

export interface AppState {
  isOnboarded: boolean;
  hasAcceptedTerms: boolean;
  hasAcceptedRisk: boolean;
  walletConnected: boolean;
  privateKey?: string;
  currentMode: Mode;
  customParams?: BotParams;
  botStatus: BotStatus;
  credits: number;
  autoTopUp: boolean;
  user?: UserProfile;
}