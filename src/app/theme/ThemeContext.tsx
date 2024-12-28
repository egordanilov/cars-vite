import { createContext } from 'react';
export enum THEME {
    LIGHT = 'light',
    DARK = 'dark',
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';
const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as THEME || THEME.LIGHT;
export interface ThemeContextProps {
    theme: THEME;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: defaultTheme,
    toggleTheme: () => { }
});



export default ThemeContext;