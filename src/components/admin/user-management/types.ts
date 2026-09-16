export interface UserRecord {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  role?: string;
  status?: "Active" | "Inactive";
  dateJoined?: string;
  lastActive?: string;
  avatar: string;
}

export const usersData: UserRecord[] = [
  { id: "1", name: "Treasure Jairus", username: "@treasure_J", email: "Treasy.Jai@gmail.com", phone: "081 521 9963", role: "Student", status: "Active", dateJoined: "Aug 24, 2026", lastActive: "Today, 9:42 AM", avatar: "https://unsplash.com" },
  { id: "2", name: "Sarah Williams", username: "@sarah_w", email: "Treasy.Jai@gmail.com", status: "Active", avatar: "https://unsplash.com" },
  { id: "3", name: "Anita Eke", username: "@Anita_E", email: "Treasy.Jai@gmail.com", status: "Active", avatar: "https://unsplash.com" },
  { id: "4", name: "Esther Sunday", username: "@esther_s", email: "Treasy.Jai@gmail.com", status: "Active", avatar: "https://unsplash.com" },
  { id: "5", name: "Esther Sunday", username: "@esther_s", email: "Treasy.Jai@gmail.com", status: "Active", avatar: "https://unsplash.com" },
  { id: "6", name: "Esther Sunday", username: "@esther_s", email: "Treasy.Jai@gmail.com", status: "Active", avatar: "https://unsplash.com" },
  { id: "7", name: "Esther Sunday", username: "@esther_s", email: "Treasy.Jai@gmail.com", status: "Active", avatar: "https://unsplash.com" },
];
