import type { Theme, ThemeVariant } from '@/types/theme';

export const themes: Record<ThemeVariant, Theme> = {
    default: {
        mode: 'light',
        variant: 'default',
        colors: {
            light: {
                primary: '#0066cc',
                secondary: '#666666',
                accent: '#f59e0b',
                background: '#ffffff',
                foreground: '#0a0a0a',
                muted: '#f5f5f5',
                mutedForeground: '#737373',
                border: '#e5e5e5',
            },
            dark: {
                primary: '#3b82f6',
                secondary: '#9ca3af',
                accent: '#fbbf24',
                background: '#0a0a0a',
                foreground: '#fafafa',
                muted: '#1a1a1a',
                mutedForeground: '#a3a3a3',
                border: '#262626',
            },
        },
    },
    ocean: {
        mode: 'light',
        variant: 'ocean',
        colors: {
            light: {
                primary: '#0891b2',
                secondary: '#0e7490',
                accent: '#06b6d4',
                background: '#ffffff',
                foreground: '#0a0a0a',
                muted: '#f0fdfa',
                mutedForeground: '#134e4a',
                border: '#ccfbf1',
            },
            dark: {
                primary: '#22d3ee',
                secondary: '#06b6d4',
                accent: '#67e8f9',
                background: '#083344',
                foreground: '#f0fdfa',
                muted: '#0e4c5f',
                mutedForeground: '#99f6e4',
                border: '#155e75',
            },
        },
    },
    forest: {
        mode: 'light',
        variant: 'forest',
        colors: {
            light: {
                primary: '#16a34a',
                secondary: '#15803d',
                accent: '#84cc16',
                background: '#ffffff',
                foreground: '#0a0a0a',
                muted: '#f0fdf4',
                mutedForeground: '#14532d',
                border: '#dcfce7',
            },
            dark: {
                primary: '#4ade80',
                secondary: '#22c55e',
                accent: '#a3e635',
                background: '#052e16',
                foreground: '#f0fdf4',
                muted: '#14532d',
                mutedForeground: '#bbf7d0',
                border: '#166534',
            },
        },
    },
    sunset: {
        mode: 'light',
        variant: 'sunset',
        colors: {
            light: {
                primary: '#ea580c',
                secondary: '#dc2626',
                accent: '#f59e0b',
                background: '#ffffff',
                foreground: '#0a0a0a',
                muted: '#fff7ed',
                mutedForeground: '#7c2d12',
                border: '#fed7aa',
            },
            dark: {
                primary: '#fb923c',
                secondary: '#f87171',
                accent: '#fbbf24',
                background: '#431407',
                foreground: '#fff7ed',
                muted: '#7c2d12',
                mutedForeground: '#fed7aa',
                border: '#9a3412',
            },
        },
    },
    midnight: {
        mode: 'light',
        variant: 'midnight',
        colors: {
            light: {
                primary: '#4f46e5',
                secondary: '#6366f1',
                accent: '#8b5cf6',
                background: '#ffffff',
                foreground: '#0a0a0a',
                muted: '#f5f3ff',
                mutedForeground: '#3730a3',
                border: '#e0e7ff',
            },
            dark: {
                primary: '#818cf8',
                secondary: '#a5b4fc',
                accent: '#c4b5fd',
                background: '#1e1b4b',
                foreground: '#f5f3ff',
                muted: '#312e81',
                mutedForeground: '#c7d2fe',
                border: '#4338ca',
            },
        },
    },
    lavender: {
        mode: 'light',
        variant: 'lavender',
        colors: {
            light: {
                primary: '#a855f7',
                secondary: '#c084fc',
                accent: '#e879f9',
                background: '#ffffff',
                foreground: '#0a0a0a',
                muted: '#faf5ff',
                mutedForeground: '#581c87',
                border: '#f3e8ff',
            },
            dark: {
                primary: '#c084fc',
                secondary: '#d8b4fe',
                accent: '#f0abfc',
                background: '#3b0764',
                foreground: '#faf5ff',
                muted: '#581c87',
                mutedForeground: '#e9d5ff',
                border: '#6b21a8',
            },
        },
    },
};

export function getThemeColors(variant: ThemeVariant, mode: 'light' | 'dark') {
    return themes[variant].colors[mode];
}
