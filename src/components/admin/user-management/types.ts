export interface UserRecord {
  id: string;
  name: string;
  username: string;
  email: string;
  role?: string;
  phone?: string;
  status?: "Active" | "Inactive";
  dateJoined?: string;
  lastActive?: string;
  avatar: string;
}
