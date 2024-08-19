import { IUser } from "@/interfaces/interfaces";
import { Role } from "@/enums/enums";

export default class User implements IUser {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: Date;
  
    constructor(id: string, name: string, email: string, role: Role) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = role;
      this.createdAt = new Date();
    }
  
    displayUser(): string {
      return `${this.name} (${this.email})`;
    }
  }