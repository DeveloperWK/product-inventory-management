import usePWAInstallPrompt from "../hooks/usePWAInstallPrompt";

function InstallButton() {
  const { isInstallable, installApp } = usePWAInstallPrompt();

  if (!isInstallable) return null;

  return (
    <button
      onClick={installApp}
      className="fixed bottom-5 right-5 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors duration-300 z-50"
    >
      📲 <span className="font-medium">Install App</span>
    </button>
  );
}
export default InstallButton;
