export type ThemeMode = 'light' | 'dark';

export type ThemeVariant =
    | 'default'
    | 'ocean'
    | 'forest'
    | 'sunset'
    | 'midnight'
    | 'lavender';

export interface ThemeColors {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
}

export interface Theme {
    mode: ThemeMode;
    variant: ThemeVariant;
    colors: {
        light: ThemeColors;
        dark: ThemeColors;
    };
}

export interface ThemeContextType {
    mode: ThemeMode;
    variant: ThemeVariant;
    toggleMode: () => void;
    setVariant: (variant: ThemeVariant) => void;
    setTheme: (mode: ThemeMode, variant: ThemeVariant) => void;
}
