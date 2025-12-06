'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeMode, ThemeVariant, ThemeContextType } from '@/types/theme';
import { getThemeColors } from '@/lib/themes';

const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    variant: 'default',
    toggleMode: () => { },
    setVariant: () => { },
    setTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<ThemeMode>('light');
    const [variant, setVariantState] = useState<ThemeVariant>('default');
    const [mounted, setMounted] = useState(false);

    // Initialize theme from localStorage
    useEffect(() => {
        setMounted(true);
        const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null;
        const savedVariant = localStorage.getItem('theme-variant') as ThemeVariant | null;

        if (savedMode) setMode(savedMode);
        if (savedVariant) setVariantState(savedVariant);
    }, []);

    // Apply theme to document
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        const colors = getThemeColors(variant, mode);

        // Remove old mode class and add new one
        root.classList.remove('light', 'dark');
        root.classList.add(mode);

        // Apply CSS variables
        root.style.setProperty('--color-primary', colors.primary);
        root.style.setProperty('--color-secondary', colors.secondary);
        root.style.setProperty('--color-accent', colors.accent);
        root.style.setProperty('--color-background', colors.background);
        root.style.setProperty('--color-foreground', colors.foreground);
        root.style.setProperty('--color-muted', colors.muted);
        root.style.setProperty('--color-muted-foreground', colors.mutedForeground);
        root.style.setProperty('--color-border', colors.border);

        // Save to localStorage
        localStorage.setItem('theme-mode', mode);
        localStorage.setItem('theme-variant', variant);
    }, [mode, variant, mounted]);

    const toggleMode = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const setVariant = (newVariant: ThemeVariant) => {
        setVariantState(newVariant);
    };

    const setTheme = (newMode: ThemeMode, newVariant: ThemeVariant) => {
        setMode(newMode);
        setVariantState(newVariant);
    };

    const value: ThemeContextType = {
        mode,
        variant,
        toggleMode,
        setVariant,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    return context;
}
