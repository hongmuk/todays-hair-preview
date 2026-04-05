export type UserRole = 'admin' | 'designer' | 'customer';

export interface Member {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: number;
  lastLoginAt: number;
}
