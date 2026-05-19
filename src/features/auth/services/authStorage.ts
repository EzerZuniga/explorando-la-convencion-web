import type { User } from '@/types';

export type StoredUser = User & { password?: string };

const CURRENT_USER_KEY = 'currentUser';
const USERS_KEY = 'users';

function isUser(value: unknown): value is User {
  return (
    Boolean(value) &&
    typeof value === 'object' &&
    typeof (value as User).name === 'string' &&
    typeof (value as User).email === 'string'
  );
}

export function getCurrentUser(): User | null {
  try {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!savedUser) return null;

    const parsed = JSON.parse(savedUser);
    if (!isUser(parsed)) {
      clearCurrentUser();
      return null;
    }

    return {
      name: parsed.name,
      email: parsed.email,
      picture: typeof parsed.picture === 'string' ? parsed.picture : undefined,
    };
  } catch {
    clearCurrentUser();
    return null;
  }
}

export function saveCurrentUser(user: User) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function readStoredUsers(): StoredUser[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is StoredUser => isUser(item))
      .map((item) => ({
        name: item.name.trim(),
        email: item.email.trim().toLowerCase(),
        picture: typeof item.picture === 'string' ? item.picture : undefined,
        password: typeof item.password === 'string' ? item.password : undefined,
      }));
  } catch {
    return [];
  }
}

export function writeStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
