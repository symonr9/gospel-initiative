import { AppIcon, AvatarIcon, Role } from "@/enums/enums";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role; // Enum for roles
  createdAt: Date;
  icon: AvatarIcon;

  // Goals Class - measured by action steps, activities, etc.
}

export default class User implements IUser {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: Date;
    icon: AvatarIcon;
  
    constructor(id: string, name: string, email: string, 
      role: Role, icon: AvatarIcon, createdAt: Date) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = role;
      this.createdAt = createdAt;
      this.icon = icon;
    }
  
    displayUser(): string {
      return `${this.name} (${this.email})`;
    }
  }