import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import InstallButton from "./components/InstallButton.tsx";
import { AuthProvider } from "./context/AuthProvider";
import { ProductsProvider } from "./context/ProductsProvider";
import "./index.css";
import router from "./router/Routes.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <InstallButton />
        <RouterProvider router={router} />
      </ProductsProvider>
    </AuthProvider>
  </StrictMode>,
);
