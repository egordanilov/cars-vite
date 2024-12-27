import React, { useState, useEffect } from 'react';
import ThemeContext, {LOCAL_STORAGE_THEME_KEY, THEME} from './ThemeContext';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedTheme: THEME = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as THEME || THEME.LIGHT;
    const [theme, setTheme] = useState<THEME>(storedTheme);

    const toggleTheme = () => {
        const newTheme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
        setTheme(newTheme as THEME);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;