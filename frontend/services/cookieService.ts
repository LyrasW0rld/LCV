import { SavedSessionState } from '../types';

const SESSION_COOKIE_KEY = 'lcv_saved_session_v1';
const URL_COOKIE_KEY = 'lcv_saved_remote_url';

export function setPreferenceCookie(name: string, value: string, days = 365): void {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {
    // Fallback if cookies restricted in iframe
  }
  try {
    localStorage.setItem(name, value);
  } catch {
    // Ignore storage error
  }
}

export function getPreferenceCookie(name: string, defaultValue: string): string {
  try {
    const cookies = document.cookie ? document.cookie.split('; ') : [];
    for (const part of cookies) {
      const [k, ...v] = part.split('=');
      if (decodeURIComponent(k) === name) {
        return decodeURIComponent(v.join('='));
      }
    }
  } catch {
    // Fallback to localStorage
  }
  try {
    const ls = localStorage.getItem(name);
    if (ls !== null) return ls;
  } catch {
    // Ignore
  }
  return defaultValue;
}

export function removePreferenceCookie(name: string): void {
  try {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
  } catch {
    // Ignore
  }
  try {
    localStorage.removeItem(name);
  } catch {
    // Ignore
  }
}

export function saveGraphSessionToCookie(session: SavedSessionState): void {
  const serialized = JSON.stringify(session);
  setPreferenceCookie(SESSION_COOKIE_KEY, serialized, 365);
  if (session.remoteUrl !== undefined) {
    setPreferenceCookie(URL_COOKIE_KEY, session.remoteUrl, 365);
  }
}

export function loadGraphSessionFromCookie(): SavedSessionState | null {
  const raw = getPreferenceCookie(SESSION_COOKIE_KEY, '');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SavedSessionState;
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch {
    // Ignore malformed JSON
  }
  return null;
}

export function clearGraphSessionCookie(): void {
  removePreferenceCookie(SESSION_COOKIE_KEY);
  removePreferenceCookie(URL_COOKIE_KEY);
}

export function getSavedRemoteUrlCookie(): string {
  return getPreferenceCookie(URL_COOKIE_KEY, '');
}

export function setSavedRemoteUrlCookie(url: string): void {
  setPreferenceCookie(URL_COOKIE_KEY, url, 365);
}
