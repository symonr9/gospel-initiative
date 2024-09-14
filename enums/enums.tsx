
// App

// TODO: Refactor into ShareChristPageState.
export enum Page {
    ShareChrist = 1,
    ShareChristOnes = 2,
    ShareChristBeacons = 3,
    ShareChristStories = 4,
}

export enum ShareChristPageState {
    Default = 1,
    Edit = 2,

    AllBeaconTemplates = 3,
    SavingBeaconForm = 4,
    ConfirmBeacon = 5,
    SentBeaconResponse = 6,

    AllStories = 7
}

export enum LoveCityPageState {
    Default = 1
}

export enum ReachWorldPageState {
    Default = 1
}

export enum FadeDirection {
    Up,
    Down,
    Left,
    Right
};

export enum RoadContainerType {
    Completed = 1,
    Incoming = 2
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

export enum OneCategory {
    Family = 1,
    CloseFriend = 2,
    Neighbor = 3,
    Coworker = 4,
    Classmate = 5,
    Roommate = 6,
    Client = 7,
    Cashier = 8,
    Server = 9,
    Barista = 10,
    Tutor = 11,
    Teacher = 12,
    FellowParent = 13,
    ClubMember = 14,
    Teammate = 15,
    HouseholdHelp = 16,
    WorkoutPartner = 17,
    PersonalCareProfessional = 18,
    MedicalProf = 19,
    LongDistanceFriend = 20,
    Friend = 21 
}

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
    AskSpiritualQuestion = 4,
    AskForPrayerRequest = 5,
    InviteToGroup = 6,
    SendEncouragementText = 7,
    DiscussScripture = 8,
    HostAtHome = 9,
    ShareDevotional = 10,
    ProvideBiblicalCounsel = 11,
    ConnectWithOtherChristians = 12,
    DropOffGiftWithBlessingNote = 13,
    OfferToHelpWithErrands = 15,
    Other = 16,
    TakeOutToCoffee = 17,
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
    ChosenPeople = 108,
    JesusMinistry = 109,

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
    AppLogo = require('../assets/images/app-icons/gospel-initiative-logo.png'),
    Man1 = require('../assets/images/app-icons/man1.png'),
    Bird = require('../assets/images/app-icons/bird.png'),
    Cherries = require('../assets/images/app-icons/cherries.png'),
    Calendar = require('../assets/images/app-icons/calendar.png'),
    Christ = require('../assets/images/app-icons/christ.png'),
    Church = require('../assets/images/app-icons/church.png'),
    ChurchValentines = require('../assets/images/app-icons/churchValentines.png'),
    City = require('../assets/images/app-icons/city.png'),
    CrossChurch = require('../assets/images/app-icons/crossChurch.png'),
    Globe = require('../assets/images/app-icons/globe.png'),
    Prayer = require('../assets/images/app-icons/prayer.png'),
    Tree = require('../assets/images/app-icons/tree.png'),
    Skull = require('../assets/images/app-icons/skull.png'),
    Music = require('../assets/images/app-icons/music.png'),
    Gift = require('../assets/images/app-icons/gift.png'),
    NetworkPeople = require('../assets/images/app-icons/networkPeople.png'),
    ArrowBack = require('../assets/images/app-icons/arrowBack.png'),
    ArrowRight = require('../assets/images/app-icons/arrowRight.png'),
    ArrowLeft = require('../assets/images/app-icons/arrowLeft.png'),
    ArrowUp = require('../assets/images/app-icons/arrowUp.png'),
    ArrowDown = require('../assets/images/app-icons/arrowDown.png'),
    Edit = require('../assets/images/app-icons/edit.png'),
    Plus = require('../assets/images/app-icons/plus.png'),
    Pencil = require('../assets/images/app-icons/pencil.png'),
    Save = require('../assets/images/app-icons/save.png'),
    Hide = require('../assets/images/app-icons/hide.png'),
    Show = require('../assets/images/app-icons/show.png'),
    Send = require('../assets/images/app-icons/send.png'),
    Checkmark = require('../assets/images/app-icons/checkmark.png'),
    Cancel = require('../assets/images/app-icons/cancel.png'),
    Chart = require('../assets/images/app-icons/chart.png'),
    Search = require('../assets/images/app-icons/search.png'),
    Chat = require('../assets/images/app-icons/chat.png'),
    ShieldSecure = require('../assets/images/app-icons/shieldSecure.png'),
    WirelessSignal = require('../assets/images/app-icons/wirelessSignal.png'),
    Lock = require('../assets/images/app-icons/lock.png'),
    Trash = require('../assets/images/app-icons/trash.png'),
    Document = require('../assets/images/app-icons/document.png'),
    Heart = require('../assets/images/app-icons/heart.png'),
    Mail = require('../assets/images/app-icons/mail.png'),
    Health = require('../assets/images/app-icons/health.png'),
    Gym = require('../assets/images/app-icons/gym.png'),
    Employee = require('../assets/images/app-icons/employee.png'),
    NightPark = require('../assets/images/app-icons/night-park.png'),
    Backpack = require('../assets/images/app-icons/backpack.png'),
    Cashier = require('../assets/images/app-icons/cashier.png'),
    Basketball = require('../assets/images/app-icons/basketball.png'),
    Hourglass = require('../assets/images/app-icons/hourglass.png'),
    Menu = require('../assets/images/app-icons/menu.png'),
    Image = require('../assets/images/app-icons/image.png'),
    Settings = require('../assets/images/app-icons/settings.png'),
    House = require('../assets/images/app-icons/house.png'),
    Dove = require('../assets/images/app-icons/dove.png'),
    LightHouse = require('../assets/images/app-icons/lighthouse.png'),
    Coffee = require('../assets/images/app-icons/coffee.png'),
    Boat = require('../assets/images/app-icons/boat.png'),
    Conversation = require('../assets/images/app-icons/conversation.png'),
    Rapport = require('../assets/images/app-icons/rapport.png'),
    Book = require('../assets/images/app-icons/book.png'),
    Book2 = require('../assets/images/app-icons/book2.png'),
    Marker = require('../assets/images/app-icons/marker.png'),
    Info = require('../assets/images/app-icons/info.png'),
    Pin = require('../assets/images/app-icons/pin.png'),
    Tag = require('../assets/images/app-icons/tag.png'),
    User = require('../assets/images/app-icons/user.png'),
    UserId = require('../assets/images/app-icons/userId.png'),
    UserGroup = require('../assets/images/app-icons/userGroup.png'),
    Car = require('../assets/images/app-icons/car.png'),
    Phone = require('../assets/images/app-icons/phone.png'),
    Star = require('../assets/images/app-icons/star.png'),
    Sheep = require('../assets/images/app-icons/sheep.png'),
    OpenHands = require('../assets/images/app-icons/open-hands.png'),
    Fighting = require('../assets/images/app-icons/fighting.png'),
    Rainy = require('../assets/images/app-icons/rainy.png'),
    LightBulb = require('../assets/images/app-icons/lightbulb.png'),
    Exodus = require('../assets/images/app-icons/exodus.png'),
    Hindu = require('../assets/images/app-icons/hindu.png'),
    Muslim = require('../assets/images/app-icons/muslim.png'),
    Mormon = require('../assets/images/app-icons/mormon.png'),
    Buddhist = require('../assets/images/app-icons/buddhist.png'),
    Atheist = require('../assets/images/app-icons/atheist.png'),
    PlantGrow = require('../assets/images/app-icons/plant-grow.png'),
    FastResponse = require('../assets/images/app-icons/fast-response.png'),
    StageSeeking = require('../assets/images/app-icons/stage-seeking.png'),
    StageCurious = require('../assets/images/app-icons/stage-curious.png'),
    StageFriendly = require('../assets/images/app-icons/stage-friendly.png'),
    StageApathetic = require('../assets/images/app-icons/stage-apathetic.png'),
    StageHostile = require('../assets/images/app-icons/stage-hostile.png'),
    StageNewBeliever = require('../assets/images/app-icons/stage-new-believer.png'),
    StageDisciple = require('../assets/images/app-icons/stage-disciple.png'),
}

export enum AvatarIcon {
    User = require('../assets/images/app-icons/user.png'),
    Man1 = require('../assets/images/avatars/man1.png'),
    Man2 = require('../assets/images/avatars/man2.png'),
    Man3 = require('../assets/images/avatars/man3.png'),
    Man4 = require('../assets/images/avatars/man4.png'),
    Man5 = require('../assets/images/avatars/man5.png'),
    Man6 = require('../assets/images/avatars/man6.png'),
    Man7 = require('../assets/images/avatars/man7.png'),
    Woman1 = require('../assets/images/avatars/woman1.png'),
    Woman2 = require('../assets/images/avatars/woman2.png'),
    Woman3 = require('../assets/images/avatars/woman3.png'),
    Woman4 = require('../assets/images/avatars/woman4.png'),

    Bird = require('../assets/images/app-icons/bird.png'),
    Cherries = require('../assets/images/app-icons/cherries.png'),
    Christ = require('../assets/images/app-icons/christ.png'),
    Church = require('../assets/images/app-icons/church.png'),
    City = require('../assets/images/app-icons/city.png'),
    CrossChurch = require('../assets/images/app-icons/crossChurch.png'),
    Globe = require('../assets/images/app-icons/globe.png'),
    Prayer = require('../assets/images/app-icons/prayer.png'),
    Tree = require('../assets/images/app-icons/tree.png'),
    NetworkPeople = require('../assets/images/app-icons/networkPeople.png'),
    Send = require('../assets/images/app-icons/send.png'),
    Chart = require('../assets/images/app-icons/chart.png'),
    Search = require('../assets/images/app-icons/search.png'),
    Chat = require('../assets/images/app-icons/chat.png'),
    ShieldSecure = require('../assets/images/app-icons/shieldSecure.png'),
    WirelessSignal = require('../assets/images/app-icons/wirelessSignal.png'),
    Lock = require('../assets/images/app-icons/lock.png'),
    Heart = require('../assets/images/app-icons/heart.png'),
    Mail = require('../assets/images/app-icons/mail.png'),
    Image = require('../assets/images/app-icons/image.png'),
    House = require('../assets/images/app-icons/house.png'),
    Dove = require('../assets/images/app-icons/dove.png'),
    LightHouse = require('../assets/images/app-icons/lighthouse.png'),
    Coffee = require('../assets/images/app-icons/coffee.png'),
    Conversation = require('../assets/images/app-icons/conversation.png'),
    Rapport = require('../assets/images/app-icons/rapport.png'),
    Book = require('../assets/images/app-icons/book.png'),
    Car = require('../assets/images/app-icons/car.png'),
    Star = require('../assets/images/app-icons/star.png'),
    Sheep = require('../assets/images/app-icons/sheep.png'),
    OpenHands = require('../assets/images/app-icons/open-hands.png'),
    Rainy = require('../assets/images/app-icons/rainy.png'),
    Exodus = require('../assets/images/app-icons/exodus.png'),
    Hindu = require('../assets/images/app-icons/hindu.png'),
    Muslim = require('../assets/images/app-icons/muslim.png'),
    Mormon = require('../assets/images/app-icons/mormon.png'),
    Buddhist = require('../assets/images/app-icons/buddhist.png'),
    Atheist = require('../assets/images/app-icons/atheist.png'),
    PlantGrow = require('../assets/images/app-icons/plant-grow.png'),
    FastResponse = require('../assets/images/app-icons/fast-response.png'),
    StageSeeking = require('../assets/images/app-icons/stage-seeking.png'),
    StageCurious = require('../assets/images/app-icons/stage-curious.png'),
    StageFriendly = require('../assets/images/app-icons/stage-friendly.png'),
    StageApathetic = require('../assets/images/app-icons/stage-apathetic.png'),
    StageHostile = require('../assets/images/app-icons/stage-hostile.png'),
    StageNewBeliever = require('../assets/images/app-icons/stage-new-believer.png'),
    StageDisciple = require('../assets/images/app-icons/stage-disciple.png'),
}

export const AvatarIconArray = [
    AvatarIcon.User,
    AvatarIcon.Man1,
    AvatarIcon.Man2,
    AvatarIcon.Man3,
    AvatarIcon.Man4,
    AvatarIcon.Man5,
    AvatarIcon.Man6,
    AvatarIcon.Man7,
    AvatarIcon.Woman1,
    AvatarIcon.Woman2,
    AvatarIcon.Woman3,
    AvatarIcon.Woman4,
    AvatarIcon.Bird,
    AvatarIcon.Cherries,
    AvatarIcon.Christ,
    AvatarIcon.Church,
    AvatarIcon.City,
    AvatarIcon.CrossChurch,
    AvatarIcon.Globe,
    AvatarIcon.Prayer,
    AvatarIcon.Tree,
    AvatarIcon.NetworkPeople,
    AvatarIcon.Send,
    AvatarIcon.Chart,
    AvatarIcon.Search,
    AvatarIcon.Chat,
    AvatarIcon.ShieldSecure,
    AvatarIcon.WirelessSignal,
    AvatarIcon.Lock,
    AvatarIcon.Heart,
    AvatarIcon.Mail,
    AvatarIcon.Image,
    AvatarIcon.House,
    AvatarIcon.Dove,
    AvatarIcon.LightHouse,
    AvatarIcon.Coffee,
    AvatarIcon.Conversation,
    AvatarIcon.Rapport,
    AvatarIcon.Book,
    AvatarIcon.Car,
    AvatarIcon.Star,
    AvatarIcon.Sheep,
    AvatarIcon.OpenHands,
    AvatarIcon.Rainy,
    AvatarIcon.Exodus,
    AvatarIcon.Hindu,
    AvatarIcon.Muslim,
    AvatarIcon.Mormon,
    AvatarIcon.Buddhist,
    AvatarIcon.Atheist,
    AvatarIcon.PlantGrow,
    AvatarIcon.FastResponse,
    AvatarIcon.StageSeeking,
    AvatarIcon.StageCurious,
    AvatarIcon.StageFriendly,
    AvatarIcon.StageApathetic,
    AvatarIcon.StageHostile,
    AvatarIcon.StageNewBeliever,
    AvatarIcon.StageDisciple,
];