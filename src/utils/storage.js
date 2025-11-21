// Simple localStorage database for NFTauth demo
const STORAGE_KEY = "nftauth_users";

// Normalize wallet address everywhere
const normalize = (addr) => (addr ? addr.toLowerCase() : "");

// ---------------------- GET ALL USERS ----------------------
export const getUsers = () => {
  try {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

// ---------------------- SAVE ALL USERS ----------------------
export const saveUsers = (users) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// ---------------------- CHECK IF USER EXISTS ----------------------
export const userExists = (walletAddress) => {
  if (!walletAddress) return false;

  const addr = normalize(walletAddress);
  const users = getUsers();

  return users.some(
    (user) => normalize(user.walletAddress) === addr
  );
};

// ---------------------- ADD OR UPDATE USER ----------------------
export const saveUser = (walletAddress, profile = {}) => {
  const addr = normalize(walletAddress);
  const users = getUsers();

  const existingUserIndex = users.findIndex(
    (user) => normalize(user.walletAddress) === addr
  );

  const userData = {
    walletAddress: addr,
    profile,
    registered: true,
    createdAt: Date.now(),
  };

  if (existingUserIndex >= 0) {
    // update existing user
    users[existingUserIndex] = {
      ...users[existingUserIndex],
      ...userData,
    };
  } else {
    // add new user
    users.push(userData);
  }

  saveUsers(users);
  return userData;
};

// ---------------------- GET USER BY WALLET ----------------------
export const getUser = (walletAddress) => {
  const addr = normalize(walletAddress);
  const users = getUsers();

  return users.find(
    (user) => normalize(user.walletAddress) === addr
  );
};
