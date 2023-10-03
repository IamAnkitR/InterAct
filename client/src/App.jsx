import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  // grabbing the mode from state
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        {/* css Reset  */}
        <CssBaseline />
        <RouterProvider router={router()} />
      </ThemeProvider>
    </div>
  );
}

export default App;
