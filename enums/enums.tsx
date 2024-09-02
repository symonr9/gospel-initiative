
// App

export enum Page {
    ShareChrist = 1,
    ShareChristOnes = 2,
    ShareChristBeacons = 3,

    GodsStory = 4,
    YourStory = 5,

    Beacon = 6,
    AddEditOnes = 7,
    AddEditActionStep = 8,

    ShareChristStories = 9
}

export enum ShareChristPageState {
    Default = 1,
    Edit = 2,
    EditActionSteps = 3,
    EditOneFacts = 4,

    Beacon = 5,
    SaveBeacon = 8,
    SendBeacon = 9,
    ConfirmSendBeacon = 10,

    AllStories = 11
}


export enum FadeDirection {
    Up,
    Down,
    Left,
    Right
};

// Users

export enum Role {
    Admin = 'ADMIN',
    User = 'USER',
    Guest = 'GUEST',
};

// Beacons

export enum BeaconType {
    Archived = 0,
    Meeting = 1,
    SpiritualConversation = 2,
    PrayerNeed = 3,
    SharingGospel = 4,
    InvitedToChurch = 5,
    OfferedHelp = 6,
    AttendedEventTogether = 7,
    GaveTestimony = 8,
    FollowedUp = 9
};

export enum BeaconLogTag {
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
    Worship = 24,
    SalvationExperience = 25
}

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
    Friendly = 5,
    Apathetic = 6,
    Hostile = 7
};

export enum OneFactType {
    Background = 1,
    Family = 2,
    Likes = 3,
    Dislikes = 4,
    Work = 5,
    Hobbies = 6,
    Education = 7,
    SpiritualBeliefs = 8,
    LifeGoals = 9,
    Favorite = 10,
    FaithBackground = 11,
    CommonGround = 12,
    PrayerPoint = 13,
};

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
    Personal = 1,
    Gods = 2,
};

export enum StoryChapterType {
    // Your Story
    Background = 1,
    Seeking = 2,
    Curious = 3,
    SalvationExperience = 4,
    Struggle = 5,
    Highlight = 6,
    Lowlight = 7,
    Misc = 8,
    GrowingInFaith = 9,

    // God's Story
    Creation = 101,
    Sin = 102,
    OldTestament = 103,
    Jesus = 104,
    Resurrection = 105,
    Crucifixion = 106,
    Church = 107,

    ScriptureHighlight = 202,
    Character = 203,
};

// Prompt

export enum PromptType {
    Normal = 1,
};

// Journal

export enum JournalEntryType {
    Beacon = 1,
}

// Missions Trips, Events, Ministries

export enum LeaderType {
    LocalMinistry = 1,
    Event = 2,
    MissionsTrip = 3
}

// Misc

export enum Priority {
    Low = 1,
    Normal = 2,
    High = 3
}

export enum AppIcon {
    Man1 = '../assets/images/app-icons/man1.png',
    Bird = '../assets/images/app-icons/bird.png',
    Cherries = '../assets/images/app-icons/cherries.png',
    Christ = '../assets/images/app-icons/christ.png',
    Church = '../assets/images/app-icons/church.png',
    ChurchValentines = '../assets/images/app-icons/churchValentines.png',
    City = '../assets/images/app-icons/city.png',
    CrossChurch = '../assets/images/app-icons/crossChurch.png',
    Globe = '../assets/images/app-icons/globe.png',
    Prayer = '../assets/images/app-icons/prayer.png',
    Tree = '../assets/images/app-icons/tree.png',
    Skull = '../assets/images/app-icons/skull.png',
    NetworkPeople = '../assets/images/app-icons/networkPeople.png',
    ArrowBack = '../assets/images/app-icons/arrowBack.png',
    Edit = "../assets/images/app-icons/edit.png",
    Plus = "../assets/images/app-icons/plus.png",
    Pencil = "../assets/images/app-icons/pencil.png",
    Save = "../assets/images/app-icons/save.png",
    Hide = "../assets/images/app-icons/hide.png",
    Show = "../assets/images/app-icons/show.png",
    Send = "../assets/images/app-icons/send.png",
    Checkmark = "../assets/images/app-icons/checkmark.png",
    Cancel = "../assets/images/app-icons/cancel.png",
    Chart = "../assets/images/app-icons/chart.png",
    Search = "../assets/images/app-icons/search.png",
    Chat = "../assets/images/app-icons/chat.png",
    ShieldSecure = "../assets/images/app-icons/shieldSecure.png",
    WirelessSignal = "../assets/images/app-icons/wirelessSignal.png",
    Lock = "../assets/images/app-icons/lock.png",
    Trash = "../assets/images/app-icons/trash.png",
    Document = "../assets/images/app-icons/document.png",
    Heart = "../assets/images/app-icons/heart.png",
    Mail = "../assets/images/app-icons/mail.png",
    Hourglass = "../assets/images/app-icons/hourglass.png",
    Menu = "../assets/images/app-icons/menu.png",
    Image = "../assets/images/app-icons/image.png",
    Settings = "../assets/images/app-icons/settings.png",
    House = "../assets/images/app-icons/house.png",
    Dove = "../assets/images/app-icons/dove.png",
    LightHouse = "../assets/images/app-icons/lighthouse.png",
    Coffee = "../assets/images/app-icons/coffee.png",
    Boat = "../assets/images/app-icons/boat.png",
    Conversation = "../assets/images/app-icons/conversation.png",
    Rapport = "../assets/images/app-icons/rapport.png",
    Book = "../assets/images/app-icons/book.png",
    FollowUp = "../assets/images/app-icons/follow-up.png",
    Car = "../assets/images/app-icons/car.png",
    Phone = "../assets/images/app-icons/phone.png",
    Star = "../assets/images/app-icons/star.png",
    Sheep = "../assets/images/app-icons/sheep.png",
    OpenHands = "../assets/images/app-icons/open-hands.png",
    Fighting = "../assets/images/app-icons/fighting.png",
    Rainy = "../assets/images/app-icons/rainy.png",
    PlantGrow = "../assets/images/app-icons/plant-grow.png",
    FastResponse = "../assets/images/app-icons/fast-response.png",
    StageSeeking = "../assets/images/app-icons/stage-seeking.png",
    StageCurious = "../assets/images/app-icons/stage-curious.png",
    StageFriendly = "../assets/images/app-icons/stage-friendly.png",
    StageApathetic = "../assets/images/app-icons/stage-apathetic.png",
    StageHostile = "../assets/images/app-icons/stage-hostile.png",
    StageNewBeliever = "../assets/images/app-icons/stage-new-believer.png",
    StageDisciple = "../assets/images/app-icons/stage-disciple.png",
}

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