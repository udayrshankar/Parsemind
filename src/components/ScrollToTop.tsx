import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Mathematically reset viewport to origin (0,0) on path change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}