import { AppIcon, AutoBeaconType, AvatarIcon, BeaconTag, Role } from "@/enums/enums";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role; // Enum for roles
  createdAt: Date | undefined;
  icon: AvatarIcon;
  lastPartitionDate: Date | undefined;
  lastExtraPartitionGranted: Date | undefined;
  extraPartitionCount: number;
  enableAutoBeacons: boolean;
  autoBeaconType: AutoBeaconType;
  autoBeaconTags: BeaconTag[];
  hasAutoBeaconBeenCreatedThisCycle: boolean;

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
    lastExtraPartitionGranted: Date | undefined;
    extraPartitionCount: number;
    enableAutoBeacons: boolean;
    autoBeaconType: AutoBeaconType;
    autoBeaconTags: BeaconTag[];
    hasAutoBeaconBeenCreatedThisCycle: boolean;
  
    constructor(id: string, name: string, email: string, 
      role: Role, icon: AvatarIcon, createdAt: Date | undefined,
      lastPartitionDate: Date | undefined, lastExtraPartitionGranted: Date | undefined,
      extraPartitionCount: number, enableAutoBeacons: boolean, autoBeaconType: AutoBeaconType,
      autoBeaconTags: BeaconTag[], hasAutoBeaconBeenCreatedThisCycle: boolean) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = role;
      this.createdAt = createdAt;
      this.icon = icon;
      this.lastPartitionDate = lastPartitionDate;
      this.extraPartitionCount = extraPartitionCount;
      this.lastExtraPartitionGranted = lastExtraPartitionGranted;
      this.enableAutoBeacons = enableAutoBeacons;
      this.autoBeaconType = autoBeaconType;
      this.autoBeaconTags = autoBeaconTags;
      this.hasAutoBeaconBeenCreatedThisCycle = hasAutoBeaconBeenCreatedThisCycle;
    }
  }