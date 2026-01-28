import { useEffect } from 'react';

/**
 * Botpress Webchat Widget Component
 */

export function BotpressChat() {
  useEffect(() => {
    // Prevent duplicate loading
    if (document.getElementById('bp-inject-script')) {
      return;
    }

    // Load the inject script (no defer)
    const injectScript = document.createElement('script');
    injectScript.id = 'bp-inject-script';
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v3.5/inject.js';
    document.body.appendChild(injectScript);

    // Load config script with defer
    const configScript = document.createElement('script');
    configScript.id = 'bp-config-script';
    configScript.src = 'https://files.bpcontent.cloud/2026/01/19/10/20260119104725-Y0R8K1SI.js';
    configScript.defer = true;
    document.body.appendChild(configScript);

    // Cleanup
    return () => {
      document.getElementById('bp-inject-script')?.remove();
      document.getElementById('bp-config-script')?.remove();
      document.querySelectorAll('[class*="bpw"]').forEach(el => el.remove());
      document.querySelectorAll('[id*="bp-"]').forEach(el => el.remove());
    };
  }, []);

  return null;
}

/**
 * Custom Botpress configuration hook
 * Use this to programmatically control the webchat
 */
export function useBotpress() {
  const openChat = () => {
    if (window.botpress) {
      window.botpress.open();
    }
  };

  const closeChat = () => {
    if (window.botpress) {
      window.botpress.close();
    }
  };

  const toggleChat = () => {
    if (window.botpress) {
      window.botpress.toggle();
    }
  };

  const sendMessage = (message) => {
    if (window.botpress) {
      window.botpress.sendMessage(message);
    }
  };

  const setUser = (userId, userData = {}) => {
    if (window.botpress) {
      window.botpress.mergeConfig({
        userData: {
          userId,
          ...userData
        }
      });
    }
  };

  return {
    openChat,
    closeChat,
    toggleChat,
    sendMessage,
    setUser,
    isLoaded: () => !!window.botpress
  };
}

export default BotpressChat;
