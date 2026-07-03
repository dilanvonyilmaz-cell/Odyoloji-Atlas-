(function (root) {
  const STORAGE_KEY = 'odyoloji-atlas-auth';
  const DEMO_USER = {
    username: 'dilan',
    password: 'odyoloji2026',
    displayName: 'Dilan Vonyılmaz'
  };

  function createMemoryStorage() {
    const store = new Map();
    return {
      getItem(key) {
        return store.has(key) ? store.get(key) : null;
      },
      setItem(key, value) {
        store.set(key, String(value));
      },
      removeItem(key) {
        store.delete(key);
      },
      clear() {
        store.clear();
      }
    };
  }

  const storage = root.localStorage || createMemoryStorage();

  function saveSession(user) {
    storage.setItem(STORAGE_KEY, JSON.stringify({ loggedIn: true, username: user.username, displayName: user.displayName }));
  }

  function clearSession() {
    storage.removeItem(STORAGE_KEY);
  }

  function getSession() {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch (error) {
      return null;
    }
  }

  function authenticate(username, password) {
    const normalizedUsername = (username || '').trim().toLowerCase();
    const normalizedPassword = (password || '').trim();

    if (normalizedUsername === DEMO_USER.username && normalizedPassword === DEMO_USER.password) {
      saveSession(DEMO_USER);
      return {
        success: true,
        message: 'Giriş başarılı. Hoş geldiniz.',
        user: DEMO_USER
      };
    }

    return {
      success: false,
      message: 'Kullanıcı adı veya şifre yanlış.'
    };
  }

  function isAuthenticated() {
    return Boolean(getSession() && getSession().loggedIn);
  }

  const api = {
    authenticate,
    saveSession,
    clearSession,
    getSession,
    isAuthenticated
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  root.OdyolojiAuth = api;
})(typeof window !== 'undefined' ? window : globalThis);
