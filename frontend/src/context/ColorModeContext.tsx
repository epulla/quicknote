import { useState, useMemo, createContext, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const getSystemTheme = (): "light" | "dark" => {
  const hasDarkTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return hasDarkTheme ? "dark" : "light";
};

export const ColorModeContextProvider = ({ customTheme, children }: any) => {
  const [mode, setMode] = useState<"light" | "dark">(getSystemTheme());
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        ...customTheme,
        palette: {
          mode,
        },
      }),
    [mode, customTheme]
  );
  return (
    <ColorModeContext.Provider
      value={{ toggleColorMode: colorMode.toggleColorMode }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("Color Mode Context must be used within a Provider");
  }
  return context;
};
