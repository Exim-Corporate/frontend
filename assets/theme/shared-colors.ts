/**
 * Shared color system for the entire application
 * Used by both Tailwind and PrimeVue to ensure consistency
 */

const sharedColors = {
  // Primary Palette
  'navy-blue': '#0A1F44',
  'navy-blue-hover': '#152D5C',
  'navy-blue-active': '#051229',
  accent: '#4CA1FF',
  'accent-hover': '#2B8DF2',
  'accent-active': '#0E72DE',
  background: '#2E1A47',
  'background-hover': '#3F2761',
  'background-gray': '#F5F7FA',
  'background-gray-hover': '#E9ECF2',
  'text-dark': '#2C2C2E',
  'text-light': '#F5F7FA',
  'text-muted': '#6B7280',

  // Optional Accent Colors
  'accent-mint': '#32D6A0',
  'accent-mint-hover': '#22C68F',
  'accent-coral': '#FF6B6B',
  'accent-coral-hover': '#FF5252',
  'accent-yellow': '#FFD56B',
  'accent-yellow-hover': '#FFC940',
  'accent-blue': '#33606B',
  'accent-blue-hover': '#264A53',

  // Dark Theme Colors
  'dark-background': '#121212',
  'dark-surface': '#1E1E1E',
  'dark-border': '#333333',
  'dark-text-primary': '#E0E0E0',
  'dark-text-secondary': '#A0A0A0',

  // System Colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Override primary color
  primary: '#0A1F44',
}

export default sharedColors

// Export a subset of colors formatted for Tailwind
export const tailwindColors = {
  'navy-blue': sharedColors['navy-blue'],
  accent: sharedColors.accent,
  background: sharedColors.background,
  'background-gray': sharedColors['background-gray'],
  'text-dark': sharedColors['text-dark'],
  'text-light': sharedColors['text-light'],
  'text-muted': sharedColors['text-muted'],
  'accent-mint': sharedColors['accent-mint'],
  'accent-coral': sharedColors['accent-coral'],
  'accent-yellow': sharedColors['accent-yellow'],
  'accent-blue': sharedColors['accent-blue'],
  primary: sharedColors.primary,
}
