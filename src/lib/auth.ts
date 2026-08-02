import bcrypt from 'bcryptjs';

const USERS_KEY = 'interview_platform_users';
const SESSION_KEY = 'interview_platform_session';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

export const getAuthUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveAuthUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const checkPassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
