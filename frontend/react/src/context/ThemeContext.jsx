import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const getInitialTheme = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const stored = window.localStorage.getItem('color-theme');
            if (typeof stored === 'string') return stored;
            if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        }
        return 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme);

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        if (typeof window !== 'undefined' && window.localStorage) window.localStorage.setItem('color-theme', next);
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const root = window.document.documentElement;

        // Only manage the `dark` class (Tailwind `dark:` variants rely on this class)
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');

        if (window.localStorage) window.localStorage.setItem('color-theme', theme);

        return () => {
            // when provider unmounts, remove dark to avoid leaking theme to other parts
            root.classList.remove('dark');
        };
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
