import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { ShopProvider } from "./components/shop/ShopProvider";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import ServicesPage from "./pages/ServicesPage";
import WorkshopsPage from "./pages/WorkshopsPage";

// We don't necessarily need Tanstack Query for a purely static presentation site, 
// but we keep the provider setup per standard React architectural requirements.
const queryClient = new QueryClient();

// Simple 404 page if someone navigates to a weird route
function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">404</h1>
        <p className="mt-2 text-lg text-muted-foreground mb-8">The path you seek has not been paved.</p>
        <a href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
          Return to Sanctuary
        </a>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/workshops" component={WorkshopsPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </ShopProvider>
    </QueryClientProvider>
  );
}

export default App;
