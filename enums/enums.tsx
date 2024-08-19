import { ImageSourcePropType } from "react-native";

export enum Role {
    Admin = 'ADMIN',
    User = 'USER',
    Guest = 'GUEST',
};

export enum AvatarIcon {
    Man1 = '../assets/images/avatars/man1.png',
    Man2 = '../assets/images/avatars/man2.png',
    Man3 = '../assets/images/avatars/man3.png',
    Man4 = '../assets/images/avatars/man4.png',
    Man5 = '../assets/images/avatars/man5.png',
    Man6 = '../assets/images/avatars/man6.png',
    Man7 = '../assets/images/avatars/man7.png',
    Woman1 = '../assets/images/avatars/woman1.png',
    Woman2 = '../assets/images/avatars/woman2.png',
    Woman3 = '../assets/images/avatars/woman3.png',
    Woman4 = '../assets/images/avatars/woman4.png'
}

export enum PrayerType {
    ForOne = 1,
    ForCityMinistry = 2,
    ForTheWorld
}

export enum OneStage {
    Disciple = 1,
    NewBeliever = 2,
    Seeking = 3,
    Curious = 4,
    Apathetic = 5
};