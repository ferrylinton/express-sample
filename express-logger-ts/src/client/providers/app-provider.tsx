import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { IntlProvider, } from 'react-intl';
import { DEFAULT_LOCALE } from '../utils/constant';
import enJson from "../messages/en.json";
import idJson from "../messages/id.json";

const THEME = "theme";

type Theme = "light" | "dark";

type AppContextProps = {
    theme: Theme,
    toggleTheme: () => void,
    locale: string,
    setLocale: (locale: string) => void
}

const getTheme = (): Theme => {
    let theme = localStorage.getItem(THEME);

    if (!theme) {
        theme = "light";
    }

    localStorage.setItem(THEME, theme);
    document.body.classList.add(theme);
    return theme as Theme
};

export const AppContext = createContext<AppContextProps>({
    theme: getTheme(),
    toggleTheme: () => Function(),
    locale: DEFAULT_LOCALE,
    setLocale: () => Function()
});

export const AppProvider = ({ children }: PropsWithChildren) => {

    const [locale, setCurrentLocale] = useState<string>(DEFAULT_LOCALE);

    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            localStorage.setItem(THEME, "dark");
            document.body.classList.add("dark");
            document.body.classList.remove("light");
        } else {
            setTheme("light");
            localStorage.setItem(THEME, "light");
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        }

    };

    const setLocale = (locale: string) => {
        setCurrentLocale(locale);
    }

    const value: AppContextProps = {
        theme: "light",
        toggleTheme,
        locale,
        setLocale
    };

    return (
        <AppContext.Provider value={value}>
            <IntlProvider
                key={locale}
                locale={locale}
                messages={locale === 'en' ? enJson : idJson}
                defaultLocale={DEFAULT_LOCALE}>
                {children}
            </IntlProvider>
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);