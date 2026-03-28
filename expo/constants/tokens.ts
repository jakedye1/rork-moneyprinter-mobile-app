export const colors = {
  bg: '#0B0D10',
  surface: '#0F1216',
  card: '#12161B',
  border: '#1E242B',
  text: '#EEF2F6',
  textMuted: '#94A3B8',
  green: '#22C55E',
  cyan: '#06B6D4',
  amber: '#F59E0B',
  red: '#EF4444',
  glass: 'rgba(255, 255, 255, 0.05)',
  overlay: 'rgba(0, 0, 0, 0.7)',
} as const;

export const lightColors = {
  bg: '#FFFFFF',
  surface: '#F7F9FB',
  card: '#FFFFFF',
  border: '#E6EAEE',
  text: '#0B0D10',
  textMuted: '#64748B',
  green: '#16A34A',
  cyan: '#0891B2',
  amber: '#D97706',
  red: '#DC2626',
  glass: 'rgba(0, 0, 0, 0.02)',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export const radii = { 
  xs: 8, 
  sm: 12, 
  md: 16, 
  lg: 24 
} as const;

export const spacing = (n: number) => n * 4;

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
} as const;

export const fonts = {
  family: 'System',
  sizes: {
    xxl: 32,
    xl: 28,
    lg: 22,
    md: 16,
    sm: 14,
    xs: 12,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;