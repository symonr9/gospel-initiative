
// App

export enum NewUserStep {
    Completed = 0,
    Splash = 1,
    WhatIsTheGospelInitiative = 2,
    WhoIsYourOne = 3,
    ActionSteps = 4,
    Stories = 5,
    PrayerBeacons = 6,
    CreateAProfile = 7,
    Finished = 8,
    Loading = 100,
};

export enum RefreshSpec {
    None,
    All,
    User,
    Ones,
    Stories,
    Beacons
};

// TODO: Refactor into ShareChristPageState.
export enum Page {
    ShareChrist = 1,
    ShareChristOnes = 2,
    ShareChristBeacons = 3,
    ShareChristStories = 4,
}

export enum FadeDirection {
    Up,
    Down,
    Left,
    Right
};

export enum ItemRowContainerType {
    Completed = 1,
    Incoming = 2
};

// Users

export enum Role {
    Admin = 1,
    User = 2,
    Guest = 3,
};

// Beacons

export enum BeaconType {
    Archived = 0,
    GetToKnowThem = 1,
    SpiritualConversation = 2,
    GospelConversation = 3,
    CaringForYourOne = 4,
    ConfidenceForMe = 6,
    Invitation = 5,
};


// README: If you want to change, please also change enums.js in the gospel-initiative-backend server project.
export enum GlobalBeaconType {
    None = 0,
    NewBelievers = 1,
    BoldnessToShare = 2,
    Missionaries = 3,
    MissionsTrips = 4,
    OurCity = 5,
    Neighborhood = 6,
    Schools = 7,
    PoorHungry = 8,
    Families = 9,
    Parents = 10,
    Marriages = 11,
    Nation = 12,
    Toddlers = 13,
    ElementarySchoolers = 14,
    MiddleSchoolers = 15,
    HighSchoolers = 16,
    Mosaic = 17,
    YoungAdults = 18,
    Elderly = 19,
    Workplaces = 20,
    Leaders = 21,
    Discipleship = 22,
    ChurchUnity = 23,
    AddictionRecovery = 24,
    LeadersInTraining = 25
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

export enum BeaconTag {
    BoldnessToShare = 1,
    OpenHeart = 2,
    ClarityOfMessage = 3,
    FruitfulConversations = 4,
    EncounterWithJesus = 5,
    WisdomAndDiscernment = 6,
    HolySpiritsGuidance = 7,
    OpportunitiesToServe = 8,
    PeaceInConversation = 9,
    RestorationOfRelationships = 10,
    TrustInGodsPlan = 11,
    PatienceInWaiting = 12,
    NewHabits = 13,
    FindingCommunity = 14,
    VictoryOverTemptation = 15,
    FinancialProvision = 16,
    SafeTravels = 17,
    Mentorship = 18,
    FamilyUnity = 19,
    Forgiveness = 20,
    Hope = 21,
    SpiritualGrowth = 22,
    OvercomingFear = 23,
    Healing = 24,
    EmotionalHealing = 25,
    BreakingEnemyLies = 26,
    Perserverence = 27,
    GodsPresence = 28,
    ComfortInGrief = 29,
    EyesToSee = 30,
}

// Auto Beacons

export enum AutoBeaconType {
    Opportunities = 1,
    Rest = 2,
    Family = 3,
    Friends = 4,
    Workplace = 5,
}

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
    Hurt = 7,
    Hostile = 8
};

export enum OneNoteType {
    StoryOfHowYouBothMet = 1,
    WhatIsRelationshipLike = 2,
    InterestsHobbiesGoals = 3,
    CoreValues = 4,
    SpiritualBackgroundAndWorldView = 5,
    PerceptionOfChristianity = 6,
    EnvisionChristChangeLife = 7,
    CurrentChallenges = 8,
    PrayersForThem = 9
};

export enum GospelStepType {
    // Conversations
    SpiritualConversations = 1,
    GospelConversations = 2,
    GodsExistence = 3,

    // Core Gospel Message
    GodsLoveForThem = 4,
    SeparationFromGod = 5,
    JesusLifeDeath = 6,
    SalvationByGraceThroughFaith = 7,

    // Salvation
    SalvationMoment = 8,

    // Spiritual Practices
    Bible = 9,
    Prayer = 10,
    Worship = 11,
    Repentance = 12,

    // Doctrine
    Creation = 13,
    Heaven = 14,
    Trinity = 15,
    HolySpirit = 16,
    Prophets = 17,

    // Next Steps
    Baptism = 18,
    Community = 19,
    Disciple = 20,
    DiscipleOthers = 21
}

export enum GospelStepLayoutType {
    Binary = 1,
    Scale = 2,
    BinaryCounter = 3,
    PositiveCounter = 4,
};

export enum GospelChecklistItem {
    Creation = 0,                 // The creation of the world by God
    Fall = 1,                     // Humanity's fall into sin
    Sin = 2,                      // The concept of sin and separation from God
    Prophets = 3,                 // Prophets foretelling the coming of the Messiah
    Incarnation = 4,              // Jesus' birth as God becoming man
    JesusLife = 5,                // Jesus' life and ministry on earth
    JesusOnTheCross = 6,          // Jesus' crucifixion and sacrifice for sin
    Resurrection = 7,             // Jesus' resurrection from the dead
    Ascension = 8,                // Jesus' ascension to heaven
    Grace = 9,                    // Salvation by grace, not by works
    Faith = 10,                   // Faith in Jesus as the way to salvation
    Repentance = 11,              // Turning away from sin and toward God
    HolySpirit = 12,              // The coming of the Holy Spirit for guidance and empowerment
    NewCreation = 13,             // Becoming a new creation in Christ
    Discipleship = 14,            // Following Jesus and living as His disciple
    GreatCommission = 15,         // The call to spread the gospel and make disciples
    SecondComing = 16,            // Jesus' promised return
    Heaven = 17,                  // The promise of eternal life with God
    Judgment = 18,                // Final judgment and accountability before God
    KingdomOfGod = 19,            // The reality of the Kingdom of God now and in the future
    Reconciliation = 20,          // Reconciliation of humanity with God through Jesus
    Redemption = 21,              // Jesus redeeming humanity from sin and death
    Forgiveness = 22,             // The forgiveness of sins through Jesus
}

export enum MissionalLivingWheelStep {
    Introduction = 1,
    General = 2,
    Spiritual = 3,
    Gospel = 4,
    Deciison = 5
};

// Action Steps
export enum ActionStepType {
    SendEncouragementText = 8,
    TakeOutToCoffee = 17,
    OfferToHelpWithErrands = 15,
    InviteToEvent = 4,
    AskSpiritualQuestion = 5,
    ListenToTestimony = 3,
    ShareTestimony = 2,
    ShareGospel = 1,
    InviteToGroup = 7,
    HostAtHome = 10,
    DropOffGiftWithBlessingNote = 14,
    AskForPrayerRequest = 6,
    DiscussScripture = 9,
    ShareDevotional = 11,
    ProvideBiblicalCounsel = 12,
    ConnectWithOtherChristians = 13,
    Other = 16,
};

// Stories

export enum StoryType {
    Personal = 1,
    Gods = 2,
};

export enum StoryChapterType {
    // Your Story
    BeforeChrist = 1,
    SalvationMoment = 2,
    AfterChrist = 3,

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

export enum StoryChapterTag {
    Youth = 1,
    AddictionRecovery = 2,
    Family = 3,
    CollegeStudent = 4,
    Parent = 5,
    Marriage = 6,
    Grief = 7,
    Health = 8,
    Identity = 9,
    Doubts = 10,
    SocialJustice = 11,
    Community = 12,
    LifeTransition = 13,
    Purpose = 14,
    Military = 16,
    Immigrant = 17,
    Prison = 18,
    Service = 19,
    Workplace = 20,
    Race = 21,
    Nature = 22,
    Missions = 23,
    Finances = 24,
    Atheist = 25,
    Culture = 26,
    Games = 27,
    Sexuality = 15,
    Spirituality = 28,
    Forgiveness = 29,
    Joy = 30,
    Peace = 31,
    Love = 32,
    Faithfulness = 33,
    Music = 34,
    Prayer = 35,
    Worship = 36,
    Discipleship = 37,
    Scripture = 38,
    Upbringing = 39,
    Suffering = 40,
}

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
    AppLogoTransparent = require('../assets/images/app-icons/app-logo-transparent.png'),
    GospelInitiativeTransparent = require('../assets/images/app-icons/gospel-initiative-transparent.png'),
    GospelInitiativeGreen = require('../assets/images/app-icons/gospel-initiative-green.png'),
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
    NavDown = require('../assets/images/app-icons/navDown.png'),
    NavUp = require('../assets/images/app-icons/navUp.png'),
    MosaicOrange = require('../assets/images/app-icons/mosaic_orange.png'),
    TV = require('../assets/images/app-icons/tv.png'),
    Turkey = require('../assets/images/app-icons/turkey.png'),
    Mountain = require('../assets/images/app-icons/mountain.png'),
    Gift = require('../assets/images/app-icons/gift.png'),
    NetworkPeople = require('../assets/images/app-icons/networkPeople.png'),
    ArrowBack = require('../assets/images/app-icons/arrowBack.png'),
    ArrowNext = require('../assets/images/app-icons/arrowNext.png'),
    ChevronUp = require('../assets/images/app-icons/chevronUp.png'),
    ChevronDown = require('../assets/images/app-icons/chevronDown.png'),
    ChevronLeft = require('../assets/images/app-icons/chevronLeft.png'),
    ChevronRight = require('../assets/images/app-icons/chevronRight.png'),
    Edit = require('../assets/images/app-icons/edit.png'),
    Plus = require('../assets/images/app-icons/plus.png'),
    Pencil = require('../assets/images/app-icons/pencil.png'),
    Save = require('../assets/images/app-icons/save.png'),
    Hide = require('../assets/images/app-icons/hide.png'),
    Show = require('../assets/images/app-icons/show.png'),
    Send = require('../assets/images/app-icons/send.png'),
    Refresh = require('../assets/images/app-icons/refresh.png'),
    Checkmark = require('../assets/images/app-icons/checkmark.png'),
    Cancel = require('../assets/images/app-icons/cancel.png'),
    Chart = require('../assets/images/app-icons/chart.png'),
    Search = require('../assets/images/app-icons/search.png'),
    Chat = require('../assets/images/app-icons/chat.png'),
    ShieldSecure = require('../assets/images/app-icons/shieldSecure.png'),
    WirelessSignal = require('../assets/images/app-icons/wirelessSignal.png'),
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
    Book = require('../assets/images/app-icons/book.png'),
    Book2 = require('../assets/images/app-icons/book2.png'),
    Marker = require('../assets/images/app-icons/marker.png'),
    Info = require('../assets/images/app-icons/info.png'),
    Pin = require('../assets/images/app-icons/pin.png'),
    Tag = require('../assets/images/app-icons/tag.png'),
    User = require('../assets/images/app-icons/user.png'),
    UserId = require('../assets/images/app-icons/userId.png'),
    UserGroup = require('../assets/images/app-icons/userGroup.png'),
    Phone = require('../assets/images/app-icons/phone.png'),
    Star = require('../assets/images/app-icons/star.png'),
    Sheep = require('../assets/images/app-icons/sheep.png'),
    OpenHands = require('../assets/images/app-icons/open-hands.png'),
    Fighting = require('../assets/images/app-icons/fighting.png'),
    LightBulb = require('../assets/images/app-icons/lightbulb.png'),
    Exodus = require('../assets/images/app-icons/exodus.png'),
    Hindu = require('../assets/images/app-icons/hindu.png'),
    Muslim = require('../assets/images/app-icons/muslim.png'),
    Mormon = require('../assets/images/app-icons/mormon.png'),
    Buddhist = require('../assets/images/app-icons/buddhist.png'),
    Atheist = require('../assets/images/app-icons/atheist.png'),
    PlantGrow = require('../assets/images/app-icons/plant-grow.png'),
    Water = require('../assets/images/app-icons/water.png'),
    GroupOfThree = require('../assets/images/app-icons/groupOfThree.png'),
    Heaven = require('../assets/images/app-icons/heaven.png'),
    FastResponse = require('../assets/images/app-icons/fast-response.png'),
    StageSeeking = require('../assets/images/app-icons/stage-seeking.png'),
    StageCurious = require('../assets/images/app-icons/stage-curious.png'),
    StageFriendly = require('../assets/images/app-icons/stage-friendly.png'),
    StageApathetic = require('../assets/images/app-icons/stage-apathetic.png'),
    StageHostile = require('../assets/images/app-icons/stage-hostile.png'),
    StageNewBeliever = require('../assets/images/app-icons/stage-new-believer.png'),
    StageDisciple = require('../assets/images/app-icons/stage-disciple.png'),
    StageHurt = require('../assets/images/app-icons/stage-hurt.png'),

    // To Add
    Care = require('../assets/images/app-icons/care.png'),
    Music = require('../assets/images/app-icons/music.png'),
    Microphone = require('../assets/images/app-icons/microphone.png'),
    PlantMature = require('../assets/images/app-icons/plantMature.png'),
    PlantSeeds = require('../assets/images/app-icons/plantSeeds.png'),
    PlantSun = require('../assets/images/app-icons/plantSun.png'),
    PlantWater = require('../assets/images/app-icons/plantWater.png'),
    Sleep = require('../assets/images/app-icons/sleep.png'),

    BeforeChrist = require('../assets/images/app-icons/beforeChrist.png'),
    Repentance = require('../assets/images/app-icons/repentance.png'),
    Cross = require('../assets/images/app-icons/cross.png'),
    SnakeSin = require('../assets/images/app-icons/snakeSin.png'),
    Scripture = require('../assets/images/app-icons/scripture.png'),
    ScriptureOpen = require('../assets/images/app-icons/scriptureOpen.png'),

    Note = require('../assets/images/app-icons/note.png'),
    Jesus = require('../assets/images/app-icons/jesus.png'),
    BreadFish = require('../assets/images/app-icons/breadFish.png'),
    ShareHeart = require('../assets/images/app-icons/shareHeart.png'),
    Leadership = require('../assets/images/app-icons/leadership.png'),
    Poor = require('../assets/images/app-icons/poor.png'),
    Barista = require('../assets/images/app-icons/barista.png'),
    Dinner = require('../assets/images/app-icons/dinner.png'),
    Client = require('../assets/images/app-icons/client.png'),
    
    Elementary = require('../assets/images/app-icons/elementary.png'),
    Guide = require('../assets/images/app-icons/guide.png'),
    Family = require('../assets/images/app-icons/family.png'),
    Parents = require('../assets/images/app-icons/parents.png'),
    SchoolBus = require('../assets/images/app-icons/schoolBus.png'),
    Apple = require('../assets/images/app-icons/apple.png'),
    Elderly = require('../assets/images/app-icons/elderly.png'),
    Zoom = require('../assets/images/app-icons/zoom.png'),
    Controller = require('../assets/images/app-icons/controller.png'),
    Makeup = require('../assets/images/app-icons/makeup.png'),
    Friend = require('../assets/images/app-icons/friend.png'),
    BestFriend = require('../assets/images/app-icons/bestFriend.png'),
    Filter = require('../assets/images/app-icons/filter.png'),
    CloseSimple = require('../assets/images/app-icons/closeSimple.png'),

    MeetingWithOneSplash = require('../assets/images/gospel-initiative/meeting-with-one-splash.png'),
    PracticeTestimonySplash = require('../assets/images/gospel-initiative/practice.png')
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
    Man8 = require('../assets/images/avatars/man8.png'),
    Man9 = require('../assets/images/avatars/man9.png'),
    Man10 = require('../assets/images/avatars/man10.png'),
    Man11 = require('../assets/images/avatars/man11.png'),
    Man12 = require('../assets/images/avatars/man12.png'),
    Man13 = require('../assets/images/avatars/man13.png'),
    Man14 = require('../assets/images/avatars/man14.png'),
    Man15 = require('../assets/images/avatars/man15.png'),
    Man16 = require('../assets/images/avatars/man16.png'),
    Man17 = require('../assets/images/avatars/man17.png'),
    Man18 = require('../assets/images/avatars/man18.png'),
    Man19 = require('../assets/images/avatars/man19.png'),
    Man20 = require('../assets/images/avatars/man20.png'),
    Woman1 = require('../assets/images/avatars/woman1.png'),
    Woman2 = require('../assets/images/avatars/woman2.png'),
    Woman3 = require('../assets/images/avatars/woman3.png'),
    Woman4 = require('../assets/images/avatars/woman4.png'),
    Woman5 = require('../assets/images/avatars/woman5.png'),
    Woman6 = require('../assets/images/avatars/woman6.png'),
    Woman7 = require('../assets/images/avatars/woman7.png'),
    Woman8 = require('../assets/images/avatars/woman8.png'),
    Woman9 = require('../assets/images/avatars/woman9.png'),
    Woman10 = require('../assets/images/avatars/woman10.png'),
    Woman11 = require('../assets/images/avatars/woman11.png'),
    Woman12 = require('../assets/images/avatars/woman12.png'),
    Woman13 = require('../assets/images/avatars/woman13.png'),
    Woman14 = require('../assets/images/avatars/woman14.png'),
    Woman15 = require('../assets/images/avatars/woman15.png'),
    Woman16 = require('../assets/images/avatars/woman16.png'),
    Woman17 = require('../assets/images/avatars/woman17.png'),
    Woman18 = require('../assets/images/avatars/woman18.png'),
    Woman19 = require('../assets/images/avatars/woman19.png'),
    Woman20 = require('../assets/images/avatars/woman20.png'),
    Woman21 = require('../assets/images/avatars/woman21.png'),
    Woman22 = require('../assets/images/avatars/woman22.png'),
    Woman23 = require('../assets/images/avatars/woman23.png'),
    Woman24 = require('../assets/images/avatars/woman24.png'),
    Woman25 = require('../assets/images/avatars/woman25.png'),
    Woman26 = require('../assets/images/avatars/woman26.png'),
    Woman27 = require('../assets/images/avatars/woman27.png'),
    Woman28 = require('../assets/images/avatars/woman28.png'),
    Woman29 = require('../assets/images/avatars/woman29.png'),
    Woman30 = require('../assets/images/avatars/woman30.png'),

    Misc1 = require('../assets/images/avatars/misc1.png'),
    Misc2 = require('../assets/images/avatars/misc2.png'),
    Misc3 = require('../assets/images/avatars/misc3.png'),
    Misc4 = require('../assets/images/avatars/misc4.png'),
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
    AvatarIcon.Man8,
    AvatarIcon.Man9,
    AvatarIcon.Man10,
    AvatarIcon.Man11,
    AvatarIcon.Man12,
    AvatarIcon.Man13,
    AvatarIcon.Man14,
    AvatarIcon.Man15,
    AvatarIcon.Man16,
    AvatarIcon.Man17,
    AvatarIcon.Man18,
    AvatarIcon.Man19,
    AvatarIcon.Man20,
    AvatarIcon.Woman1,
    AvatarIcon.Woman2,
    AvatarIcon.Woman3,
    AvatarIcon.Woman4,
    AvatarIcon.Woman5,
    AvatarIcon.Woman6,
    AvatarIcon.Woman7,
    AvatarIcon.Woman8,
    AvatarIcon.Woman9,
    AvatarIcon.Woman10,
    AvatarIcon.Woman11,
    AvatarIcon.Woman12,
    AvatarIcon.Woman13,
    AvatarIcon.Woman14,
    AvatarIcon.Woman15,
    AvatarIcon.Woman16,
    AvatarIcon.Woman17,
    AvatarIcon.Woman18,
    AvatarIcon.Woman19,
    AvatarIcon.Woman20,
    AvatarIcon.Woman21,
    AvatarIcon.Woman22,
    AvatarIcon.Woman23,
    AvatarIcon.Woman24,
    AvatarIcon.Woman25,
    AvatarIcon.Woman26,
    AvatarIcon.Woman27,
    AvatarIcon.Woman28,
    AvatarIcon.Woman29,
    AvatarIcon.Woman30,
    AvatarIcon.Misc1,
    AvatarIcon.Misc2,
    AvatarIcon.Misc3,
    AvatarIcon.Misc4,
];