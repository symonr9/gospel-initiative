import { AppIcon, AvatarIcon, Role } from "@/enums/enums";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role; // Enum for roles
  createdAt: Date | undefined;
  icon: AvatarIcon;
  lastPartitionDate: Date | undefined;
  extraPartitionCount: number;

  // Goals Class - measured by action steps, activities, etc.
}

export default class User implements IUser {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: Date | undefined;
    icon: AvatarIcon;
    lastPartitionDate: Date | undefined;
    extraPartitionCount: number;
  
    constructor(id: string, name: string, email: string, 
      role: Role, icon: AvatarIcon, createdAt: Date | undefined,
      lastPartitionDate: Date | undefined, extraPartitionCount: number) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = role;
      this.createdAt = createdAt;
      this.icon = icon;
      this.lastPartitionDate = lastPartitionDate;
      this.extraPartitionCount = extraPartitionCount;
    }
  }