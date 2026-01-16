import { ThemeProvider as NextThemeProvider } from "next-themes";

export function AppThemeProvider({ children }) {
    return (
        <NextThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
        </NextThemeProvider>
    );
}