import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Check local storage or system preference
    const getInitialTheme = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedPrefs = window.localStorage.getItem('color-theme');
            if (typeof storedPrefs === 'string') {
                return storedPrefs;
            }

            const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
            if (userMedia.matches) {
                return 'dark';
            }
        }
        return 'light'; // Default to light
    };

    const [theme, setTheme] = useState(getInitialTheme);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        window.localStorage.setItem('color-theme', newTheme);
    };

    useEffect(() => {
        const root = window.document.documentElement;
        // Remove previous classes
        root.classList.remove('light', 'dark');
        // Add current theme class
        root.classList.add(theme);

        // Save to local storage
        localStorage.setItem('color-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
