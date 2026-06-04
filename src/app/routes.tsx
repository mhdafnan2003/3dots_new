import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "services/:slug", Component: ServiceDetail },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "contact", Component: Contact },
      { path: "gallery", Component: Gallery },
      { path: "about", Component: About },
    ],
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);
