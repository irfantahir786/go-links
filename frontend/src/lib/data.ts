import type { User, LinkType, Stats } from './definitions';

// --- Helper Functions ---
const USERS_KEY = 'tinylink_users';
const LINKS_KEY = 'tinylink_links';

const ensureDefaultUser = () => {
    if (typeof window === 'undefined') return;
    const users = getUsersFromStorage();
    const defaultUserExists = users.some(u => u.email === 'name@example.com');
  
    if (!defaultUserExists) {
      const defaultUser: User = {
        id: '0',
        name: 'Demo User',
        email: 'name@example.com',
        password: 'password',
      };
      users.push(defaultUser);
      saveUsersToStorage(users);
    }
};

const getUsersFromStorage = (): User[] => {
  if (typeof window === 'undefined') return [];
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

const saveUsersToStorage = (users: User[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

const getLinksFromStorage = (): LinkType[] => {
  if (typeof window === 'undefined') return [];
  const linksJson = localStorage.getItem(LINKS_KEY);
  let links = linksJson ? JSON.parse(linksJson) : [];
  
  // Create some mock data if it doesn't exist for the demo user
  if (links.length === 0) {
    const demoUserId = '0';
    links = [
        { id: '1', code: "abc", longUrl: "https://google.co.in", clicks: 10, lastClickedAt: "2025-11-22T11:06:22.153Z", createdAt: "2025-11-22T01:44:21.119Z", updatedAt: "2025-11-23T01:45:09.921Z", isActive: true, userId: demoUserId },
        { id: '2', code: "abc1232", longUrl: "https://irfanweb.in/as", clicks: 2, lastClickedAt: "2025-11-22T04:56:09.536Z", createdAt: "2025-11-22T02:06:25.756Z", updatedAt: "2025-11-23T01:54:53.579Z", isActive: true, userId: demoUserId },
        { id: '3', code: "abc123", longUrl: "https://oobi.com", clicks: 3, lastClickedAt: "2025-11-22T04:12:34.256Z", createdAt: "2025-11-22T02:05:24.831Z", updatedAt: "2025-11-23T01:46:09.445Z", isActive: true, userId: demoUserId },
        { id: '4', code: "oobi", longUrl: "https://instagram.com/irfan_oobi", clicks: 1, lastClickedAt: "2025-11-23T00:23:54.602Z", createdAt: "2025-11-23T00:23:41.917Z", updatedAt: "2025-11-23T03:30:44.689Z", isActive: true, userId: demoUserId },
    ];
    saveLinksToStorage(links);
  }

  return links;
};

const saveLinksToStorage = (links: LinkType[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LINKS_KEY, JSON.stringify(links));
  }
};

const simulateDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- User Functions ---

export async function checkEmailExists(email: string): Promise<{ exists: boolean }> {
    await simulateDelay(500); // Simulate network delay
    const users = getUsersFromStorage();
    const exists = users.some(u => u.email === email);
    return { exists };
  }

export async function registerUser(userData: Omit<User, 'id'>): Promise<User> {
  await simulateDelay(1000);
  const users = getUsersFromStorage();
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    throw new Error('An account with this email already exists.');
  }
  const newUser: User = { ...userData, id: Date.now().toString() };
  saveUsersToStorage([...users, newUser]);
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export async function loginUser(credentials: Pick<User, 'email' | 'password'>): Promise<User> {
  await simulateDelay(1000);
  ensureDefaultUser(); // Make sure demo user exists
  const users = getUsersFromStorage();
  const user = users.find(u => u.email === credentials.email);
  if (!user || user.password !== credentials.password) {
    throw new Error('Invalid email or password.');
  }
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function updateUser(userId: string, data: Partial<Pick<User, 'name' | 'email'>>): Promise<User> {
  await simulateDelay(700);
  let users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found.');
  }
  users[userIndex] = { ...users[userIndex], ...data };
  saveUsersToStorage(users);
  const { password, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
}

export async function changePassword(userId: string, newPassword: string): Promise<void> {
  await simulateDelay(700);
  let users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found.');
  }
  users[userIndex].password = newPassword;
  saveUsersToStorage(users);
}

// --- Link Functions ---

export async function getDashboardData(userId: string): Promise<{links: LinkType[], stats: Stats[]}> {
  await simulateDelay(500);
  const allLinks = getLinksFromStorage();
  const userLinks = allLinks
    .filter(link => link.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const totalClicks = userLinks.reduce((sum, link) => sum + link.clicks, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const clickedToday = userLinks.filter(link => 
    link.lastClickedAt && new Date(link.lastClickedAt) >= today
  ).length;


  const stats: Stats[] = [
    { title: "Total Links", value: userLinks.length.toString() },
    { title: "Active Links", value: userLinks.filter(l => l.isActive).length.toString() },
    { title: "Inactive Links", value: userLinks.filter(l => !l.isActive).length.toString() },
    { title: "Total Clicks", value: totalClicks.toString() },
    { title: "Clicked Today", value: clickedToday.toString() },
  ]
  
  return { links: userLinks, stats };
}


export async function createLink(longUrl: string, userId: string, customCode?: string): Promise<LinkType> {
  await simulateDelay(800);
  const allLinks = getLinksFromStorage();
  
  let code = customCode;
  if (code) {
    if (allLinks.some(link => link.code === code)) {
      throw new Error('This custom code is already taken.');
    }
  } else {
    code = Math.random().toString(36).substring(2, 8);
    while (allLinks.some(link => link.code === code)) {
      code = Math.random().toString(36).substring(2, 8);
    }
  }

  const newLink: LinkType = {
    id: Date.now().toString(),
    code,
    longUrl,
    userId,
    clicks: 0,
    lastClickedAt: null,
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  saveLinksToStorage([...allLinks, newLink]);
  return newLink;
}

export async function deleteLink(linkId: string, userId: string): Promise<void> {
  await simulateDelay(300);
  let allLinks = getLinksFromStorage();
  const linkToDelete = allLinks.find(l => l.id === linkId);

  if (!linkToDelete || linkToDelete.userId !== userId) {
    throw new Error('Link not found or you do not have permission to delete it.');
  }
  
  const updatedLinks = allLinks.filter(link => link.id !== linkId);
  saveLinksToStorage(updatedLinks);
}

export async function getLinkByCode(code: string): Promise<(LinkType & { success: boolean }) | { success: false }> {
  await simulateDelay(200);
  const allLinks = getLinksFromStorage();
  const link = allLinks.find(l => l.code === code);
  if (!link) {
    return { success: false };
  }
return { ...link, success: true };
}

export async function recordLinkClick(code: string): Promise<void> {
  await simulateDelay(100);
  let allLinks = getLinksFromStorage();
  const linkIndex = allLinks.findIndex(l => l.code === code);
  if (linkIndex > -1) {
    allLinks[linkIndex].clicks += 1;
    allLinks[linkIndex].lastClickedAt = new Date().toISOString();
    saveLinksToStorage(allLinks);
  }
}
// Initialize default user on load
if (typeof window !== 'undefined') {
    ensureDefaultUser();
    getLinksFromStorage(); // This will create mock links if they don't exist
}
