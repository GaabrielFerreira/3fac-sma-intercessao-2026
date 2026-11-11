import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Home } from "@/pages/Home";
import { Prayer } from "@/pages/Prayer";
import { VidaPlena } from "@/pages/VidaPlena";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oracao/:slug" element={<Prayer />} />
        <Route path="/vida-plena" element={<VidaPlena />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
