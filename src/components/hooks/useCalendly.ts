import { useCallback } from 'react';

export const useCalendly = () => {

  // Only load the script when this function is called (onHover or onClick)
  const loadScript = useCallback(() => {
    if (window.Calendly) return; // Already loaded

    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openPopup = useCallback(() => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/kg-goutham-anseru/30min',
      });
    } else {
      // If user clicks before script loads, load it and try again immediately
      loadScript();
      const check = setInterval(() => {
        if (window.Calendly) {
          window.Calendly.initPopupWidget({
             url: 'https://calendly.com/kg-goutham-anseru/30min',
          });
          clearInterval(check);
        }
      }, 100);
    }
  }, [loadScript]);

  return { loadScript, openPopup };
};