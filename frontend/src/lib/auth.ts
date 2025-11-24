import type { User } from './definitions';

const SESSION_KEY = 'tinylink_session';

export function getSession(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const userJson = localStorage.getItem(SESSION_KEY);
  if (!userJson) {
    return null;
  }
  try {
    const user = JSON.parse(userJson);
    return user;
  } catch (e) {
    return null;
  }
}

export function setSession(user: Omit<User, 'password'>) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }
}

export function clearSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
  }
}
