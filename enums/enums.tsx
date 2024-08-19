
// Users

export enum Role {
    Admin = 'ADMIN',
    User = 'USER',
    Guest = 'GUEST',
};

// Prayers

export enum PrayerType {
    ForOne = 1,
    ForCityMinistry = 2,
    ForTheWorld = 3
}

export enum PrayerBeaconType {
    ToCommunity = 1,
    ToPrayerGroup = 2,
    ToLeadershipTeam = 3,
};

// Meetings

export enum MeetingTag {
    Friendship = 1,
    SharedGospel = 2,
    SharedFaith = 3,
    PrayedTogether = 4,
    ScriptureStudy = 5,
    Encouragement = 6,
    AddressedDoubts = 7,
    ActsOfService = 8,
    AttendedChurch = 9,
    SharedPersonalStruggles = 10,
    DiscussedPurpose = 11,
    FollowedUp = 12,
    InvitedToEvent = 13,
    SharedTestimony = 14,
    SharedResources = 15,
    InvitedToSmallGroup = 16,
    InvitedToServe = 17,
    ExploredBeliefs = 18,
    ListenedWell = 19,
    OfferedComfort = 20,
    AddressedMisconceptions = 21,
    Other = 22,
    Discipleship = 23,
    Worship = 24
};

export enum Location {
    Home = 1,
    Church = 2,
    Coffee = 3,
    Breakfast = 4,
    Lunch = 5,
    Dinner = 6,
    Park = 7,
    Work = 8,
    Recreation = 9,
    Online = 10,
    Gym = 11,
    Outdoors = 12,
    Trip = 13
};

// One

export enum OneStage {
    Disciple = 1,
    NewBeliever = 2,
    Seeking = 3,
    Curious = 4,
    Apathetic = 5
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

// Action Steps

export enum ActionStepType {
    ShareGospel = 1,
    ShareTestimony = 2,
    InviteToEvent = 3,
    SpiritualConversation = 4,
    OfferPrayer = 5,
    InviteToGroup = 6,
    Encouragement = 7,
    DiscussScripture = 8,
    HostAtHome = 9,
    ShareDevotional = 10,
    ProvideBiblicalCounsel = 11,
    ConnectWithOtherChristians = 12,
    ShareWorshipMusisc = 13,
    BuildRapport = 14,
    Serve = 15,
    Other = 16
};

// Stories

export enum StoryType {
    Yours = 1,
    Gods = 2
};

export enum StoryChapterType {
    // Your Story
    Seeking = 1,
    Curious = 2,
    SalvationExperience = 3,
    Struggle = 4,
    Highlight = 5,
    Lowlight = 6,
    Misc = 7,

    // God's Story
    CoreGospel = 101,
    ScriptureHighlight = 102,
    Character = 103,
};

export enum StoryChapterIcon {
    Man1 = '../assets/images/story/man1.png',
}