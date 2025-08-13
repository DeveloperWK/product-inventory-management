import { useEffect, useState } from "react";

function usePWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      if (!localStorage.getItem("pwa_install_skipped")) {
        setDeferredPrompt(e);
        setIsInstallable(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    const promptEvent = deferredPrompt as BeforeInstallPromptEvent;
    promptEvent.prompt();

    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") {
      console.log("✅ App installed");
    } else {
      console.log("❌ Install dismissed");
      localStorage.setItem("pwa_install_skipped", "true");
      setTimeout(
        () => {
          localStorage.removeItem("pwa_install_skipped");
        },
        7 * 24 * 60 * 60 * 1000,
      );
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return { isInstallable, installApp };
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}
export default usePWAInstallPrompt;
