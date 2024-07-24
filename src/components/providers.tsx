import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "@/contexts/app.context";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./theme-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AppProvider>{children}</AppProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Providers;
