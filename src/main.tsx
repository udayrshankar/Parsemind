// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TransitionProvider } from "./components/TransitionContext";
import App from "./App";
import "./index.css";

// 1. Import PostHog
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react';

// 2. Initialize PostHog
posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  person_profiles: 'identified_only', // Recommended for better privacy/performance
  // capture_pageview: false // Uncomment this if you want to manually control page views
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 3. Wrap app in PostHogProvider */}
    <PostHogProvider client={posthog}>
      <BrowserRouter>
        <TransitionProvider>
          <App />
        </TransitionProvider>
      </BrowserRouter>
    </PostHogProvider>
  </React.StrictMode>
);