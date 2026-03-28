import { ModePreset, CreditPack } from '@/types';
import { colors } from './tokens';

export const MODE_PRESETS: Record<string, ModePreset> = {
  SAFE: {
    name: 'SAFE',
    description: 'Capital preservation focus',
    riskLevel: 'low',
    color: colors.cyan,
    params: {
      entryLiquidityUsd: 30000,
      exitLiquidityUsd: 40000,
      slippagePct: 0.5,
      takeProfitPct: 6,
      stopLossPct: 5,
      tokenAgeMaxHr: 12,
      amountToSpendUsd: 25,
    },
  },
  TURBO: {
    name: 'TURBO',
    description: 'Balanced growth strategy',
    riskLevel: 'medium',
    color: colors.green,
    params: {
      entryLiquidityUsd: 20000,
      exitLiquidityUsd: 30000,
      slippagePct: 1.0,
      takeProfitPct: 15,
      stopLossPct: 10,
      tokenAgeMaxHr: 36,
      amountToSpendUsd: 50,
    },
  },
  YOLO: {
    name: 'YOLO',
    description: 'Aggressive moon shots',
    riskLevel: 'extreme',
    color: colors.amber,
    params: {
      entryLiquidityUsd: 10000,
      exitLiquidityUsd: 15000,
      slippagePct: 2.5,
      takeProfitPct: 40,
      stopLossPct: 20,
      tokenAgeMaxHr: 72,
      amountToSpendUsd: 100,
    },
  },
};

export const CREDIT_PACKS: CreditPack[] = [
  {
    key: 'starter',
    trades: 50,
    priceUsd: 5,
    caption: 'A +10% pump on a $25 position covers this pack.',
  },
  {
    key: 'grinder',
    trades: 150,
    priceUsd: 15,
    caption: 'One +20% trade on $75 pays for itself.',
    popular: true,
  },
  {
    key: 'whale',
    trades: 300,
    priceUsd: 30,
    caption: 'One +25% trade on $120 covers this pack.',
  },
];