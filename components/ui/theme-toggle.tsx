'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/components/theme-provider';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { mode, toggleMode } = useTheme();

    // Prevent SSR hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="p-2 w-9 h-9" />; // Placeholder to prevent layout shift
    }

    return (
        <button
            onClick={toggleMode}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
            aria-label="Toggle theme"
        >
            {/* Sun Icon - visible in dark mode */}
            <Sun
                className={`w-5 h-5 transition-all duration-300 ${mode === 'dark'
                        ? 'rotate-0 scale-100 opacity-100'
                        : 'rotate-90 scale-0 opacity-0 absolute'
                    }`}
            />

            {/* Moon Icon - visible in light mode */}
            <Moon
                className={`w-5 h-5 transition-all duration-300 ${mode === 'light'
                        ? 'rotate-0 scale-100 opacity-100'
                        : '-rotate-90 scale-0 opacity-0 absolute'
                    }`}
            />

            {/* Hover effect */}
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
    );
}
