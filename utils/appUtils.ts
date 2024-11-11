import { ActionStepType, AppIcon, AvatarIcon, BeaconTag, BeaconType, GospelChecklistItem, OneCategory, OneNoteType, OneStage, Priority, StoryChapterTag, StoryChapterType, StoryType } from "@/enums/enums";
import ActionStep from "@/models/actionStep";
import Beacon from "@/models/beacon";
import One from "@/models/one";
import StoryChapter from "@/models/storyChapter";
import User from "@/models/user";

export const getSelectedOne = (selectedOneId: string | null, ones: One[]) => {
    if (!selectedOneId) {
        return null;
    }
    return ones.find((one) => one.id === selectedOneId);
};

export function formatEnumKey<T>(enumObj: T, enumValue: T[keyof T]): string {
    const enumKey = Object.keys(enumObj).find(key => enumObj[key as keyof T] === enumValue);
    return enumKey ? enumKey.replace(/([a-z])([A-Z])/g, '$1 $2') : '';
}

export function getNow() {
    return new Date();
}

export function getTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
}

export function getNextWeek() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 8);
    return tomorrow;
}

export function getDayInFuture(day: number) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + day);
    return tomorrow;
}

export function isWithinNext24Hours(date: Date): boolean {
    const now = new Date();
    const future24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return date && date > now && date <= future24Hours;
}


export function getAppTimeAgoText(date: Date | undefined, expiration = false, plain = false): string {
    if (!date) {
        return '';
    }

    const now = new Date();
    const secondsDifference = Math.floor((date.getTime() - now.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
        year: 365 * 24 * 60 * 60,
        month: 30 * 24 * 60 * 60,
        week: 7 * 24 * 60 * 60,
        day: 24 * 60 * 60,
        hour: 60 * 60,
        minute: 60,
        second: 1,
    };

    const isFuture = secondsDifference > 0;
    const seconds = Math.abs(secondsDifference);

    for (const interval in intervals) {
        const intervalSeconds = intervals[interval];
        const count = Math.floor(seconds / intervalSeconds);
        if (count > 0) {
            const unit = `${interval}${count !== 1 ? 's' : ''}`;
            if (plain) {
                return isFuture ? `${count} ${unit}` : `${count} ${unit} ago`;
            } else if (expiration) {
                return isFuture ? `Expires in ${count} ${unit}` : `Expired ${count} ${unit} ago`;
            }
            return isFuture ? `In ${count} ${unit}` : `Passed ${count} ${unit} ago`;
        }
    }

    return isFuture ? 'soon' : 'just now';
}

export function formatDateTime(date: Date | null | undefined): string {
    if (!date) {
        return '';
    }

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour ? hour : 12; // The hour '0' should be '12'

    return `${dayOfWeek}, ${month} ${day}, ${year} at ${hour}:${minute} ${ampm}`;
}

export function formatDateTimeSimple(date: Date | null | undefined): string {
    if (!date) {
        return '';
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

export function getDaysPrayedForText(date: Date): string {
    const now = new Date();
    const timeDifference = now.getTime() - date.getTime();

    if (timeDifference < 0) {
        return "Just started praying.";
    }

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return `Been praying for ${days} days.`;
}


export function isBeaconActive(beacon: Beacon): boolean {
    if (!beacon.activeUntil) {
        return false;
    }
    return beacon.activeUntil.getTime() >= new Date();
}


export const getShowHideIcon = (show: boolean) => show ? AppIcon.Show : AppIcon.Hide;

export function mapPriorityToText(priority: Priority) {
    switch (priority) {
        case Priority.Low:
            return "Low";
        case Priority.Normal:
            return "Normal";
        case Priority.High:
            return "High";
    }
}

export function mapStageToText(stage: OneStage) {
    switch (stage) {
        case OneStage.Hurt:
            return "Hurt";
        case OneStage.Disciple:
            return "Disciple";
        case OneStage.NewBeliever:
            return "New Believer";
        case OneStage.Seeking:
            return "Seeking";
        case OneStage.Curious:
            return "Curious";
        case OneStage.Friendly:
            return "Friendly";
        case OneStage.Apathetic:
            return "Apathetic";
        case OneStage.Hostile:
            return "Hostile";
    }
    return "";
}

export function mapStageToDetailsText(stage: OneStage) {
    switch (stage) {
        case OneStage.Disciple:
            return "This person has intentionally followed Christ for multiple seasons of their life. They are committed to Scripture, growing in their faith, and sharing the Gospel.";
        case OneStage.NewBeliever:
            return "This person has made a commitment to follow Christ within the last year. They are in the early stages of understanding their faith and beginning their spiritual journey.";
        case OneStage.Seeking:
            return "This person is actively seeking answers about Christianity and the gospel. They are open to learning more and are considering a commitment to faith.";
        case OneStage.Curious:
            return "This person is curious about Christianity but has not yet made any significant steps toward faith. They are open to conversations and exploration.";
        case OneStage.Friendly:
            return "This person is friendly and open to believers, but they are not actively seeking faith or asking questions about Christianity.";
        case OneStage.Apathetic:
            return "This person shows little interest in spiritual matters or the Christian faith. They are indifferent and not currently open to discussions about faith.";
        case OneStage.Hurt:
            return "This person grew up with a religious background but has been hurt by church or religion. They may be averse to similar religious experiences.";
        case OneStage.Hostile:
            return "This person is opposed to Christianity and may actively resist conversations about faith. They have negative perceptions or strong objections to the gospel.";
    }
    return "";
}


export function mapStageToIcon(stage: OneStage) {
    switch (stage) {
        case OneStage.Disciple:
            return AppIcon.StageDisciple;
        case OneStage.NewBeliever:
            return AppIcon.StageNewBeliever;
        case OneStage.Seeking:
            return AppIcon.StageSeeking;
        case OneStage.Curious:
            return AppIcon.StageCurious;
        case OneStage.Friendly:
            return AppIcon.StageFriendly;
        case OneStage.Apathetic:
            return AppIcon.StageApathetic;
        case OneStage.Hurt:
            return AppIcon.StageHurt;
        case OneStage.Hostile:
            return AppIcon.StageHostile;
    }
    return "";
}

export function mapOneCategoryToText(category: OneCategory): String {
    switch (category) {
        case OneCategory.Family:
            return "Family";
        case OneCategory.CloseFriend:
            return "Close Friend";
        case OneCategory.Neighbor:
            return "Neighbor";
        case OneCategory.Coworker:
            return "Coworker";
        case OneCategory.Classmate:
            return "Classmate";
        case OneCategory.Roommate:
            return "Roommate";
        case OneCategory.Client:
            return "Client";
        case OneCategory.Cashier:
            return "Cashier";
        case OneCategory.Server:
            return "Server";
        case OneCategory.Barista:
            return "Barista";
        case OneCategory.Tutor:
            return "Tutor";
        case OneCategory.Teacher:
            return "Teacher";
        case OneCategory.FellowParent:
            return "Fellow Parent";
        case OneCategory.ClubMember:
            return "Club Member";
        case OneCategory.Teammate:
            return "Teammate";
        case OneCategory.HouseholdHelp:
            return "Help";
        case OneCategory.WorkoutPartner:
            return "Workout";
        case OneCategory.PersonalCareProfessional:
            return "Personal";
        case OneCategory.MedicalProf:
            return "Medical";
        case OneCategory.LongDistanceFriend:
            return "Long Distance";
        case OneCategory.Friend:
        default:
            return "Friend";
    }
};

export function mapOneCategoryToDetailsText(category: OneCategory): String {
    switch (category) {
        case OneCategory.Family:
            return "A relative or family member you are close to.";
        case OneCategory.CloseFriend:
            return "A lifelong friend with a strong bond.";
        case OneCategory.Neighbor:
            return "A person living near you.";
        case OneCategory.Coworker:
            return "Someone you work with.";
        case OneCategory.Classmate:
            return "A peer from your classes or courses.";
        case OneCategory.Roommate:
            return "Someone you share a living space with.";
        case OneCategory.Client:
            return "A person you provide services to.";
        case OneCategory.Cashier:
            return "A store or service counter attendant.";
        case OneCategory.Server:
            return "A person who serves food or drinks.";
        case OneCategory.Barista:
            return "A coffee shop staff member.";
        case OneCategory.Tutor:
            return "Someone who helps you with learning.";
        case OneCategory.Teacher:
            return "An educator or instructor.";
        case OneCategory.FellowParent:
            return "A parent of a child in your community.";
        case OneCategory.ClubMember:
            return "A participant in the same club or group.";
        case OneCategory.Teammate:
            return "A partner in sports or group activities.";
        case OneCategory.HouseholdHelp:
            return "Someone who assists with domestic tasks.";
        case OneCategory.WorkoutPartner:
            return "A companion for exercise or fitness.";
        case OneCategory.PersonalCareProfessional:
            return "A specialist in beauty, grooming, or wellness.";
        case OneCategory.MedicalProf:
            return "A healthcare or medical service provider.";
        case OneCategory.LongDistanceFriend:
            return "A friend who lives far away.";
        case OneCategory.Friend:
        default:
            return "A person you share a friendly relationship with.";
    }
}

export function mapOneCategoryToIcon(category: OneCategory): AppIcon {
    switch (category) {
        case OneCategory.Family:
        case OneCategory.Roommate:
        case OneCategory.HouseholdHelp:
            return AppIcon.House;
        case OneCategory.Neighbor:
            return AppIcon.NightPark;
        case OneCategory.Classmate:
            return AppIcon.Backpack;
        case OneCategory.Coworker:
        case OneCategory.Client:
            return AppIcon.Employee;
        case OneCategory.Cashier:
            return AppIcon.Cashier;
        case OneCategory.Server:
        case OneCategory.Barista:
            return AppIcon.Coffee;
        case OneCategory.Tutor:
        case OneCategory.Teacher:
            return AppIcon.Book2;
        case OneCategory.ClubMember:
        case OneCategory.Teammate:
            return AppIcon.Basketball;
        case OneCategory.FellowParent:
            return AppIcon.Conversation;
        case OneCategory.WorkoutPartner:
            return AppIcon.Gym;
        case OneCategory.PersonalCareProfessional:
        case OneCategory.MedicalProf:
            return AppIcon.Health;
        case OneCategory.LongDistanceFriend:
            return AppIcon.Globe;
        case OneCategory.CloseFriend:
        case OneCategory.Friend:
        default:
            return AppIcon.Rapport;
    }
};

export function mapOneNoteTypeToTitle(type: OneNoteType): string {
    switch (type) {
        case OneNoteType.CoreValues:
            return "Core Values";
        case OneNoteType.StoryOfHowYouBothMet:
            return "Story of How You Both Met";
        case OneNoteType.WhatIsRelationshipLike:
            return "What Is Your Relationship Like?";
        case OneNoteType.InterestsHobbiesGoals:
            return "Interests, Hobbies, and Goals";
        case OneNoteType.SpiritualBackgroundAndWorldView:
            return "Spiritual Background and Worldview";
        case OneNoteType.PerceptionOfChristianity:
            return "Their Perception of Christianity";
        case OneNoteType.EnvisionChristChangeLife:
            return "How Could Christ Change Their Life?";
        case OneNoteType.CurrentChallenges:
            return "Current Challenges They’re Facing";
        case OneNoteType.PrayersForThem:
            return "Prayers for Them";
        default:
            return "Unknown Note Type";
    }
}

export function mapOneNoteTypeToDetails(type: OneNoteType): string {
    switch (type) {
        case OneNoteType.CoreValues:
            return "Describe their core values and what principles guide their life.";
        case OneNoteType.StoryOfHowYouBothMet:
            return "Share the story of how you first met and got to know each other.";
        case OneNoteType.WhatIsRelationshipLike:
            return "Describe the nature of your relationship and any key dynamics.";
        case OneNoteType.InterestsHobbiesGoals:
            return "List their main interests, hobbies, and personal goals.";
        case OneNoteType.SpiritualBackgroundAndWorldView:
            return "Provide an overview of their spiritual background and worldview.";
        case OneNoteType.PerceptionOfChristianity:
            return "Detail their perception or understanding of Christianity.";
        case OneNoteType.EnvisionChristChangeLife:
            return "Reflect on how knowing Christ might transform their life.";
        case OneNoteType.CurrentChallenges:
            return "Discuss any challenges or struggles they are currently experiencing.";
        case OneNoteType.PrayersForThem:
            return "List specific prayers you have for them and their journey.";
        default:
            return "No details available for this note type.";
    }
}

export function mapOneNoteTypeToAppIcon(type: OneNoteType): AppIcon {
    switch (type) {
        case OneNoteType.CoreValues:
            return AppIcon.Heart;
        case OneNoteType.StoryOfHowYouBothMet:
            return AppIcon.NetworkPeople;
        case OneNoteType.WhatIsRelationshipLike:
            return AppIcon.Conversation;
        case OneNoteType.InterestsHobbiesGoals:
            return AppIcon.Popcorn;
        case OneNoteType.SpiritualBackgroundAndWorldView:
            return AppIcon.Globe;
        case OneNoteType.PerceptionOfChristianity:
            return AppIcon.CrossChurch;
        case OneNoteType.EnvisionChristChangeLife:
            return AppIcon.Christ;
        case OneNoteType.CurrentChallenges:
            return AppIcon.Fighting;
        case OneNoteType.PrayersForThem:
            return AppIcon.Prayer;
        default:
            return AppIcon.LightBulb;
    }
}

export function mapBeaconTagToTitleText(type: BeaconTag) {
    switch (type) {
        case BeaconTag.BoldnessToShare:
            return 'Boldness To Share';
        case BeaconTag.OpenHeart:
            return 'Open Heart';
        case BeaconTag.ClarityOfMessage:
            return 'Clarity Of Message';
        case BeaconTag.FruitfulConversations:
            return 'Fruitful Conversations';
        case BeaconTag.EncounterWithJesus:
            return 'Encounter With Jesus';
        case BeaconTag.WisdomAndDiscernment:
            return 'Wisdom And Discernment';
        case BeaconTag.HolySpiritsGuidance:
            return 'Holy Spirit’s Guidance';
        case BeaconTag.OpportunitiesToServe:
            return 'Opportunities To Serve';
        case BeaconTag.PeaceInConversation:
            return 'Peace In Conversation';
        case BeaconTag.RestorationOfRelationships:
            return 'Restoration Of Relationships';
        case BeaconTag.TrustInGodsPlan:
            return 'Trust In God’s Plan';
        case BeaconTag.PatienceInWaiting:
            return 'Patience In Waiting';
        case BeaconTag.NewHabits:
            return 'New Habits';
        case BeaconTag.FindingCommunity:
            return 'Finding Community';
        case BeaconTag.VictoryOverTemptation:
            return 'Victory Over Temptation';
        case BeaconTag.FinancialProvision:
            return 'Financial Provision';
        case BeaconTag.SafeTravels:
            return 'Safe Travels';
        case BeaconTag.Mentorship:
            return 'Mentorship';
        case BeaconTag.FamilyUnity:
            return 'Family Unity';
        case BeaconTag.Forgiveness:
            return 'Forgiveness';
        case BeaconTag.Hope:
            return 'Hope';
        case BeaconTag.SpiritualGrowth:
            return 'Spiritual Growth';
        case BeaconTag.OvercomingFear:
            return 'Overcoming Fear';
        case BeaconTag.Healing:
            return 'Healing';
        case BeaconTag.EmotionalHealing:
            return 'Emotional Healing';
        case BeaconTag.BreakingEnemyLies:
            return 'Breaking Enemy Lies';
        case BeaconTag.Perserverence:
            return 'Perseverance';
        case BeaconTag.GodsPresence:
            return 'God’s Presence';
        case BeaconTag.ComfortInGrief:
            return 'Comfort In Grief';
        case BeaconTag.EyesToSee:
            return 'Eyes To See';
    }
    return '';
}

export function mapBeaconTagToDetailsText(type: BeaconTag) {
    switch (type) {
        case BeaconTag.BoldnessToShare:
            return 'Pray for boldness to share my testimony or the Gospel.';
        case BeaconTag.OpenHeart:
            return 'Pray for my one to have an open heart to talk about God.';
        case BeaconTag.ClarityOfMessage:
            return 'Pray for clarity and effectiveness in sharing the message of Christ.';
        case BeaconTag.FruitfulConversations:
            return 'Pray for conversations that are meaningful and lead to spiritual growth.';
        case BeaconTag.EncounterWithJesus:
            return 'Pray for a life-changing encounter with Jesus for my one.';
        case BeaconTag.WisdomAndDiscernment:
            return 'Pray for wisdom and discernment in navigating spiritual conversations.';
        case BeaconTag.HolySpiritsGuidance:
            return 'Pray for the Holy Spirit to guide my words and actions.';
        case BeaconTag.OpportunitiesToServe:
            return 'Pray for practical opportunities to serve my one.';
        case BeaconTag.PeaceInConversation:
            return 'Pray for peace in my conversation, especially if discussing difficult topics.';
        case BeaconTag.RestorationOfRelationships:
            return 'Pray for healing and restoration in my one\'s relationships.';
        case BeaconTag.TrustInGodsPlan:
            return 'Pray for me to have a deeper trust in God’s plan for my one.';
        case BeaconTag.PatienceInWaiting:
            return 'Pray for patience and perseverance for my one.';
        case BeaconTag.NewHabits:
            return 'Pray for the formation of new, God-honoring habits in my one’s life.';
        case BeaconTag.FindingCommunity:
            return 'Pray for my one to find and engage in a supportive Christian community.';
        case BeaconTag.VictoryOverTemptation:
            return 'Pray for my one to have victory over sins and temptations.';
        case BeaconTag.FinancialProvision:
            return 'Pray for God’s financial provision for my one.';
        case BeaconTag.SafeTravels:
            return 'Pray for safety and protection for my one during their travel.';
        case BeaconTag.Mentorship:
            return 'Pray for opportunities to mentor and disciple my one effectively.';
        case BeaconTag.FamilyUnity:
            return 'Pray for unity and love within my one\'s family.';
        case BeaconTag.Forgiveness:
            return 'Pray for my one to receive God\'s forgivess and extend it to others.';
        case BeaconTag.Hope:
            return 'Pray for hope to fill my one\'s heart.';
        case BeaconTag.SpiritualGrowth:
            return 'Pray for spiritual growth in my one\'s walk with God.';
        case BeaconTag.OvercomingFear:
            return 'Pray for strength for my one to overcome fears holding them back.';
        case BeaconTag.Healing:
            return 'Pray for physical, emotional, or spiritual healing where needed.';
        case BeaconTag.EmotionalHealing:
            return 'Pray for healing from emotional pain, trauma, or anxiety.';
        case BeaconTag.BreakingEnemyLies:
            return 'Pray for the truth to replace any lies or deceptions from the enemy.';
        case BeaconTag.Perserverence:
            return 'Pray for perseverance in faith, especially during trials and challenges.';
        case BeaconTag.GodsPresence:
            return 'Pray for a deep awareness of God’s presence in my one\'s situation.';
        case BeaconTag.ComfortInGrief:
            return 'Pray for comfort and peace for my one as they grieve.';
        case BeaconTag.EyesToSee:
            return 'Pray for us to have eyes to see God\'s work in both our lives.';
    }
    return '';
}

export function mapBeaconTypeToAppIcon(type: BeaconType) {
    switch (type) {
        case BeaconType.SpiritualConversation:
            return AppIcon.Conversation;
        case BeaconType.PrayerNeed:
            return AppIcon.Prayer;
        case BeaconType.SharingGospel:
            return AppIcon.FastResponse;
        case BeaconType.InvitedToChurch:
            return AppIcon.Church;
        case BeaconType.OfferedHelp:
            return AppIcon.Car;
        case BeaconType.AttendedEventTogether:
            return AppIcon.Rapport;
        case BeaconType.GaveTestimony:
            return AppIcon.Book;
        case BeaconType.FollowedUp:
            return AppIcon.Phone;
        case BeaconType.Meeting:
        case BeaconType.Archived:
        default:
            return AppIcon.Coffee;
    }
}

export function mapBeaconTypeToTitleText(type: BeaconType,
    shareOwnName: boolean, initUserName: string, initOneName: string) {
    const userName = shareOwnName ? initUserName : 'A User';
    const oneName = 'their One';
    switch (type) {
        case BeaconType.SpiritualConversation:
            return `${userName} would like a spiritual conversation with ${oneName}.`;
        case BeaconType.PrayerNeed:
            return `${userName} heard about a prayer need from ${oneName}.`;
        case BeaconType.SharingGospel:
            return `${userName} would like to share an aspect of their faith with ${oneName}.`;
        case BeaconType.InvitedToChurch:
            return `${userName} is planning to invite ${oneName} to church.`;
        case BeaconType.OfferedHelp:
            return `${userName} wants to serve ${oneName} in some way.`;
        case BeaconType.AttendedEventTogether:
            return `${userName} wants to build rapport with ${oneName}.`;
        case BeaconType.GaveTestimony:
            return `${userName} wants to share their personal testimoney with ${oneName}.`;
        case BeaconType.FollowedUp:
            return `${userName} wants to follow-up on a previous conversation with ${oneName}.`;
        case BeaconType.Meeting:
        default:
            return `${userName} is meeting with ${oneName}`;
    }
}

export function mapActionStepTypeToIcon(type: ActionStepType): AppIcon {
    switch (type) {
        case ActionStepType.ShareGospel:
            return AppIcon.Christ;
        case ActionStepType.ShareTestimony:
        case ActionStepType.ListenToTestimony:
        case ActionStepType.AskSpiritualQuestion:
            return AppIcon.Conversation;
        case ActionStepType.InviteToEvent:
            return AppIcon.Mail;
        case ActionStepType.AskForPrayerRequest:
            return AppIcon.Prayer;
        case ActionStepType.InviteToGroup:
            return AppIcon.NetworkPeople;
        case ActionStepType.SendEncouragementText:
            return AppIcon.FastResponse;
        case ActionStepType.DiscussScripture:
        case ActionStepType.ShareDevotional:
            return AppIcon.Book;
        case ActionStepType.HostAtHome:
            return AppIcon.House;
        case ActionStepType.ProvideBiblicalCounsel:
            return AppIcon.LightBulb;
        case ActionStepType.ConnectWithOtherChristians:
            return AppIcon.Church;
        case ActionStepType.DropOffGiftWithBlessingNote:
            return AppIcon.Gift;
        case ActionStepType.TakeOutToCoffee:
            return AppIcon.Coffee;
        case ActionStepType.OfferToHelpWithErrands:
            return AppIcon.Car;
        case ActionStepType.Other:
        default:
            return AppIcon.Calendar;
    }
}

export function mapActionStepTypeToTitle(type: ActionStepType): string {
    switch (type) {
        case ActionStepType.ShareGospel:
            return "Share Gospel";
        case ActionStepType.ShareTestimony:
            return "Share Testimony";
        case ActionStepType.ListenToTestimony:
            return "Listen to Testimony";
        case ActionStepType.InviteToEvent:
            return "Invite to Event";
        case ActionStepType.AskSpiritualQuestion:
            return "Ask Spiritual Question";
        case ActionStepType.AskForPrayerRequest:
            return "Ask for Prayer Request";
        case ActionStepType.InviteToGroup:
            return "Invite to Group";
        case ActionStepType.SendEncouragementText:
            return "Send Encouragement Text";
        case ActionStepType.DiscussScripture:
            return "Discuss Scripture";
        case ActionStepType.HostAtHome:
            return "Host at Home";
        case ActionStepType.ShareDevotional:
            return "Share Devotional";
        case ActionStepType.ProvideBiblicalCounsel:
            return "Provide Biblical Counsel";
        case ActionStepType.ConnectWithOtherChristians:
            return "Connect with other Christians";
        case ActionStepType.DropOffGiftWithBlessingNote:
            return "Drop off Gift with Note Explaining Why";
        case ActionStepType.TakeOutToCoffee:
            return "Take out to Coffee";
        case ActionStepType.OfferToHelpWithErrands:
            return "Offer to Help with Errands";
        case ActionStepType.Other:
        default:
            return "Other";
    }
}

export function mapActionStepTypeToDetails(type: ActionStepType): string {
    switch (type) {
        case ActionStepType.ShareGospel:
            return "Share the message of the Gospel and the hope it offers.";
        case ActionStepType.ShareTestimony:
            return "Share your personal story of faith and transformation.";
        case ActionStepType.ListenToTestimony:
            return "Listen to their life story and get to know more about them.";
        case ActionStepType.InviteToEvent:
            return "Invite them to a church event, social gathering, or study.";
        case ActionStepType.AskSpiritualQuestion:
            return "Engage them in a conversation by asking a thought-provoking spiritual question.";
        case ActionStepType.AskForPrayerRequest:
            return "Offer to pray for them by asking if they have any prayer requests.";
        case ActionStepType.InviteToGroup:
            return "Invite them to join a small group, Bible study, or fellowship.";
        case ActionStepType.SendEncouragementText:
            return "Send a text message to encourage or uplift them.";
        case ActionStepType.DiscussScripture:
            return "Discuss a passage from the Bible and its meaning.";
        case ActionStepType.HostAtHome:
            return "Invite them to your home for a meal or gathering.";
        case ActionStepType.ShareDevotional:
            return "Share a devotional reading or spiritual reflection.";
        case ActionStepType.ProvideBiblicalCounsel:
            return "Offer guidance or advice based on biblical principles.";
        case ActionStepType.ConnectWithOtherChristians:
            return "Introduce them to other Christians who can support their spiritual journey.";
        case ActionStepType.DropOffGiftWithBlessingNote:
            return "Drop off a small gift with a note explaining its spiritual significance.";
        case ActionStepType.TakeOutToCoffee:
            return "Take them out for coffee to talk and build a relationship.";
        case ActionStepType.OfferToHelpWithErrands:
            return "Offer practical help by assisting with errands or tasks.";
        case ActionStepType.Other:
        default:
            return "Other - a custom action step.";
    }
}

export function generateActionStepsForStage(stage: OneStage, oneId: string | null): ActionStep[] {
    const actionSteps: ActionStep[] = [];
    if (!oneId) {
        return actionSteps;
    }

    switch (stage) {
        case OneStage.Disciple:
            actionSteps.push(
                ActionStep.create(oneId, ActionStepType.AskForPrayerRequest, getDayInFuture(7)),
                ActionStep.create(oneId, ActionStepType.InviteToGroup, getDayInFuture(14)),
                ActionStep.create(oneId, ActionStepType.HostAtHome, getDayInFuture(21)),
                ActionStep.create(oneId, ActionStepType.DiscussScripture, getDayInFuture(30)),
            );
            break;
        case OneStage.NewBeliever:
            actionSteps.push(
                ActionStep.create(oneId, ActionStepType.TakeOutToCoffee, getDayInFuture(7)),
                ActionStep.create(oneId, ActionStepType.InviteToGroup, getDayInFuture(14)),
                ActionStep.create(oneId, ActionStepType.OfferToHelpWithErrands, getDayInFuture(21)),
                ActionStep.create(oneId, ActionStepType.HostAtHome, getDayInFuture(30)),
            );
            break;
        case OneStage.Seeking:
            actionSteps.push(
                ActionStep.create(oneId, ActionStepType.TakeOutToCoffee, getDayInFuture(7)),
                ActionStep.create(oneId, ActionStepType.ShareGospel, getDayInFuture(14)),
                ActionStep.create(oneId, ActionStepType.InviteToGroup, getDayInFuture(21)),
                ActionStep.create(oneId, ActionStepType.ShareTestimony, getDayInFuture(30)),
            );
            break;
        case OneStage.Curious:
            actionSteps.push(
                ActionStep.create(oneId, ActionStepType.TakeOutToCoffee, getDayInFuture(7)),
                ActionStep.create(oneId, ActionStepType.ListenToTestimony, getDayInFuture(14)),
                ActionStep.create(oneId, ActionStepType.ShareTestimony, getDayInFuture(21)),
                ActionStep.create(oneId, ActionStepType.ShareGospel, getDayInFuture(30)),
            );
            break;
        case OneStage.Friendly:
            actionSteps.push(
                ActionStep.create(oneId, ActionStepType.SendEncouragementText, getDayInFuture(7)),
                ActionStep.create(oneId, ActionStepType.DropOffGiftWithBlessingNote, getDayInFuture(14)),
                ActionStep.create(oneId, ActionStepType.InviteToGroup, getDayInFuture(21)),
                ActionStep.create(oneId, ActionStepType.ShareGospel, getDayInFuture(30)),
            );
            break;
        case OneStage.Apathetic:
            actionSteps.push(
                ActionStep.create(oneId, ActionStepType.SendEncouragementText, getDayInFuture(7)),
                ActionStep.create(oneId, ActionStepType.OfferToHelpWithErrands, getDayInFuture(14)),
                ActionStep.create(oneId, ActionStepType.InviteToEvent, getDayInFuture(21)),
                ActionStep.create(oneId, ActionStepType.AskSpiritualQuestion, getDayInFuture(30)),
            );
            break;
        case OneStage.Hurt:
            actionSteps.push(
                ActionStep.create(oneId, ActionStepType.SendEncouragementText, getDayInFuture(7)),
                ActionStep.create(oneId, ActionStepType.TakeOutToCoffee, getDayInFuture(14)),
                ActionStep.create(oneId, ActionStepType.ListenToTestimony, getDayInFuture(21)),
                ActionStep.create(oneId, ActionStepType.InviteToEvent, getDayInFuture(30)),
            );
            break;
        case OneStage.Hostile:
            actionSteps.push(
                ActionStep.create(oneId, ActionStepType.OfferToHelpWithErrands, getDayInFuture(7)),
                ActionStep.create(oneId, ActionStepType.SendEncouragementText, getDayInFuture(14)),
                ActionStep.create(oneId, ActionStepType.TakeOutToCoffee, getDayInFuture(21)),
                ActionStep.create(oneId, ActionStepType.ListenToTestimony, getDayInFuture(30)),
            );
            break;
        default:
            break;
    }

    return actionSteps;
}

export function mapGospelChecklistItemTypeToTitle(item: GospelChecklistItem): string {
    switch (item) {
        case GospelChecklistItem.Creation:
            return "Creation";
        case GospelChecklistItem.Fall:
            return "The Fall";
        case GospelChecklistItem.Sin:
            return "Sin";
        case GospelChecklistItem.Prophets:
            return "The Prophets";
        case GospelChecklistItem.Incarnation:
            return "The Incarnation";
        case GospelChecklistItem.JesusLife:
            return "The Life of Jesus";
        case GospelChecklistItem.JesusOnTheCross:
            return "Jesus on the Cross";
        case GospelChecklistItem.Resurrection:
            return "Resurrection";
        case GospelChecklistItem.Ascension:
            return "Ascension";
        case GospelChecklistItem.Grace:
            return "Grace";
        case GospelChecklistItem.Faith:
            return "Faith";
        case GospelChecklistItem.Repentance:
            return "Repentance";
        case GospelChecklistItem.HolySpirit:
            return "Holy Spirit";
        case GospelChecklistItem.NewCreation:
            return "New Creation";
        case GospelChecklistItem.Discipleship:
            return "Discipleship";
        case GospelChecklistItem.GreatCommission:
            return "Great Commission";
        case GospelChecklistItem.SecondComing:
            return "Second Coming";
        case GospelChecklistItem.Heaven:
            return "Heaven";
        case GospelChecklistItem.Judgment:
            return "Judgment";
        case GospelChecklistItem.KingdomOfGod:
            return "Kingdom of God";
        case GospelChecklistItem.Reconciliation:
            return "Reconciliation";
        case GospelChecklistItem.Redemption:
            return "Redemption";
        case GospelChecklistItem.Forgiveness:
            return "Forgiveness";
        default:
            return "";
    }
}

export function mapGospelChecklistItemTypeToDetails(item: GospelChecklistItem): string {
    switch (item) {
        case GospelChecklistItem.Creation:
            return "Do they know God created the universe?";
        case GospelChecklistItem.Fall:
            return "Do they understand humanity's rebellion against God in Eden?";
        case GospelChecklistItem.Sin:
            return "Do they know that sin separates us from God?";
        case GospelChecklistItem.Prophets:
            return "Do they know prophets foretold the Messiah's coming?";
        case GospelChecklistItem.Incarnation:
            return "Do they believe Jesus came to earth as God in human form?";
        case GospelChecklistItem.JesusLife:
            return "Do they know how Jesus' life fulfilled God's plan?";
        case GospelChecklistItem.JesusOnTheCross:
            return "Do they understand Jesus' death paid for our sins?";
        case GospelChecklistItem.Resurrection:
            return "Do they know Jesus rose, defeating death and offering life?";
        case GospelChecklistItem.Ascension:
            return "Do they know Jesus ascended to reign with the Father?";
        case GospelChecklistItem.Grace:
            return "Do they understand salvation is a free gift through grace?";
        case GospelChecklistItem.Faith:
            return "Do they know faith in Jesus brings righteousness before God?";
        case GospelChecklistItem.Repentance:
            return "Do they understand repentance turns us away from sin?";
        case GospelChecklistItem.HolySpirit:
            return "Do they know the Holy Spirit empowers and guides believers?";
        case GospelChecklistItem.NewCreation:
            return "Do they understand believers become new creations in Christ?";
        case GospelChecklistItem.Discipleship:
            return "Do they know discipleship means following and learning from Jesus?";
        case GospelChecklistItem.GreatCommission:
            return "Do they know Jesus commands us to make disciples of all nations?";
        case GospelChecklistItem.SecondComing:
            return "Do they understand Jesus will return to establish His kingdom?";
        case GospelChecklistItem.Heaven:
            return "Do they know heaven is the eternal home for believers with God?";
        case GospelChecklistItem.Judgment:
            return "Do they understand God will judge all of humanity?";
        case GospelChecklistItem.KingdomOfGod:
            return "Do they know the Kingdom of God was inaugurated by Jesus?";
        case GospelChecklistItem.Reconciliation:
            return "Do they understand Christ restores our relationship with God?";
        case GospelChecklistItem.Redemption:
            return "Do they believe Jesus redeems us from sin and death?";
        case GospelChecklistItem.Forgiveness:
            return "Do they know God offers forgiveness through Jesus?";
        default:
            return "Unknown gospel checklist item.";
    }
}

export function mapGospelChecklistItemTypeToVersesAndQuestions(item: GospelChecklistItem): string {
    switch (item) {
        case GospelChecklistItem.Creation:
            return `Bible Passage: Genesis 1:1-31 (The Creation account) \n\nThematic Significance: This passage shows that God made everything good and intentional. Humans are made in God's image, which gives us inherent worth and value.\n\nDiscussion Questions:\n\nWhat do you think it means that we are created in God's image?\n\nHow does knowing that God created everything with purpose change the way you see the world and yourself?`;
        case GospelChecklistItem.Fall:
            return `Bible Passage: Genesis 3:1-19 (The Fall of Man) \n\nThematic Significance: This passage explains the origin of sin and why the world is broken. It also sets the stage for God’s plan to restore what was lost.\n\nDiscussion Questions:\n\nHow does this story explain some of the brokenness you see in the world today?\n\nHow do you feel knowing that God has been working to restore humanity since the Fall?`;
        case GospelChecklistItem.Sin:
            return `Bible Passage: Romans 3:9-26 (All have sinned, but there is redemption) \n\nThematic Significance: This passage explains that everyone has fallen short of God's standard, but it also introduces the hope of being made right with God through Jesus.\n\nDiscussion Questions:\n\nWhat does it mean to you that everyone has sinned, but that there is a way to be right with God?\n\nHow does understanding sin help you appreciate the need for Jesus?`;
        case GospelChecklistItem.Prophets:
            return `Bible Passage: Isaiah 53:1-12 (The prophecy of the Suffering Servant) \n\nThematic Significance: Isaiah points to Jesus hundreds of years before His birth, showing God’s consistent plan to save humanity through a suffering Messiah.\n\nDiscussion Questions:\n\nHow does this prophecy help you see the big picture of God's plan?\n\nWhat stands out to you about the way Jesus is described in this passage?`;
        case GospelChecklistItem.Incarnation:
            return `Bible Passage: John 1:1-18 (The Word became flesh) \n\nThematic Significance: Jesus is not just a teacher or a prophet—He is God who became human. This passage introduces the miracle of the Incarnation.\n\nDiscussion Questions:\n\nWhat does it mean to you that God Himself came to live among us?\n\nHow does Jesus' humanity make Him more relatable to you?`;
        case GospelChecklistItem.JesusLife:
            return `Bible Passage: Matthew 5:1-12 (The Beatitudes – Jesus’ teachings about the Kingdom) \n\nThematic Significance: This passage shows how Jesus turned the world’s values upside down, teaching us what it means to live according to God’s Kingdom.\n\nDiscussion Questions:\n\nWhat stands out to you about Jesus' teachings here?\n\nHow do you think living according to these principles would change your life?`;
        case GospelChecklistItem.JesusOnTheCross:
            return `Bible Passage: Luke 23:32-49 (The Crucifixion) \n\nThematic Significance: Jesus’ death on the cross is the ultimate act of love, paying the penalty for sin so that we can be made right with God.\n\nDiscussion Questions:\n\nHow does Jesus' sacrifice on the cross affect how you view God's love for you?\n\nWhat does this passage reveal about the cost of forgiveness?`;
        case GospelChecklistItem.Resurrection:
            return `Bible Passage: Matthew 28:1-10 (The Resurrection) \n\nThematic Significance: The resurrection is the cornerstone of the Christian faith, showing that death is not the end and that Jesus has the power to give us new life.\n\nDiscussion Questions:\n\nHow does the resurrection of Jesus give you hope for your own life?\n\nWhat do you think it means to have new life through Jesus?`;
        case GospelChecklistItem.Ascension:
            return `Bible Passage: Acts 1:6-11 (The Ascension) \n\nThematic Significance: Jesus’ ascension marks the beginning of His reign as the exalted Lord and points to His eventual return.\n\nDiscussion Questions:\n\nWhat does it mean to you that Jesus is alive and reigning today?\n\nHow does knowing that Jesus will return one day affect how you live now?`;
        case GospelChecklistItem.Grace:
            return `Bible Passage: Ephesians 2:1-10 (Saved by grace through faith) \n\nThematic Significance: This passage emphasizes that salvation is a gift from God, not something we can earn, highlighting God’s incredible love and mercy.\n\nDiscussion Questions:\n\nHow does understanding grace change how you see your relationship with God?\n\nWhat does it mean to live in response to God's grace?`;
        case GospelChecklistItem.Faith:
            return `Bible Passage: Hebrews 11:1-12 (Faith in Action) \n\nThematic Significance: This passage shows that faith is trusting in what we cannot see but what God has promised. It gives examples of people who lived by faith, encouraging us to do the same.\n\nDiscussion Questions:\n\nWhat does it mean to live by faith in your everyday life?\n\nHow does trusting God change the way you make decisions?`;
        case GospelChecklistItem.Repentance:
            return `Bible Passage: Luke 15:11-32 (The Parable of the Prodigal Son) \n\nThematic Significance: This story of repentance shows the heart of God as a loving Father who welcomes us back with open arms when we turn away from our sin.\n\nDiscussion Questions:\n\nHow does this story help you understand God's response when we repent?\n\nWhat does true repentance look like in your life?`;
        case GospelChecklistItem.HolySpirit:
            return `Bible Passage: John 14:15-31 (The Promise of the Holy Spirit) \n\nThematic Significance: Jesus promises that the Holy Spirit will come to guide and comfort believers, showing that we are never alone in our faith journey.\n\nDiscussion Questions:\n\nHow does knowing the Holy Spirit is with you give you confidence in your faith?\n\nHow do you experience the guidance of the Holy Spirit in your life?`;
        case GospelChecklistItem.NewCreation:
            return `Bible Passage: 2 Corinthians 5:16-21 (New Creation in Christ) \n\nThematic Significance: In Christ, we are made new, leaving behind our old selves. This passage highlights God's work of reconciliation through Jesus.\n\nDiscussion Questions:\n\nWhat does it mean to be a new creation in Christ?\n\nHow does this passage encourage you to live differently?`;
        case GospelChecklistItem.Discipleship:
            return `Bible Passage: Matthew 28:18-20 (The Great Commission) \n\nThematic Significance: Jesus commands His followers to make disciples of all nations, calling us to live out our faith by helping others follow Him.\n\nDiscussion Questions:\n\nWhat does it mean to be a disciple of Jesus?\n\nHow can you actively participate in making disciples?`;
        case GospelChecklistItem.GreatCommission:
            return `Bible Passage: Matthew 28:18-20 (The Great Commission) \n\nThematic Significance: Jesus commissions His followers to spread the gospel to all people, showing that every believer has a role in His mission.\n\nDiscussion Questions:\n\nHow does Jesus’ command to make disciples challenge you?\n\nWhat steps can you take to share the gospel with others?`;
        case GospelChecklistItem.SecondComing:
            return `Bible Passage: 1 Thessalonians 4:13-18 (The Second Coming) \n\nThematic Significance: This passage describes the return of Jesus and offers hope for believers, knowing that He will come back to restore all things.\n\nDiscussion Questions:\n\nHow does knowing Jesus will return affect your perspective on life?\n\nWhat do you look forward to most about His second coming?`;
        case GospelChecklistItem.Heaven:
            return `Bible Passage: Revelation 21:1-7 (The New Heaven and New Earth) \n\nThematic Significance: This passage describes the future hope of eternal life with God in a place where there will be no more pain, suffering, or death.\n\nDiscussion Questions:\n\nWhat stands out to you about the picture of heaven described in this passage?\n\nHow does this hope impact the way you live today?`;
        case GospelChecklistItem.Judgment:
            return `Bible Passage: Revelation 20:11-15 (The Final Judgment) \n\nThematic Significance: This passage describes God's righteous judgment of all people. It reminds us of the reality of eternity and the importance of faith in Jesus.\n\nDiscussion Questions:\n\nHow does the reality of judgment shape your understanding of God's justice?\n\nWhat does this passage make you reflect on regarding your relationship with Jesus?`;
        case GospelChecklistItem.KingdomOfGod:
            return `Bible Passage: Matthew 6:9-13 (The Lord’s Prayer – The Kingdom of God) \n\nThematic Significance: Jesus teaches us to pray for God’s kingdom to come on earth, reflecting His rule and reign in every part of life.\n\nDiscussion Questions:\n\nWhat does it mean to seek God's kingdom first in your life?\n\nHow can you demonstrate the values of the Kingdom of God in your daily actions?`;
        case GospelChecklistItem.Reconciliation:
            return `Bible Passage: 2 Corinthians 5:18-19 (Ministry of Reconciliation) \n\nThematic Significance: God has called us to be ambassadors of reconciliation, demonstrating His love by bringing people back to Him.\n\nDiscussion Questions:\n\nWhat does reconciliation mean to you?\n\nHow can you be a messenger of reconciliation in your relationships?`;
        case GospelChecklistItem.Redemption:
            return `Bible Passage: Colossians 1:13-14 (Redemption through Christ) \n\nThematic Significance: This passage highlights our redemption through the blood of Jesus, freeing us from the power of darkness and bringing us into His light.\n\nDiscussion Questions:\n\nWhat does it mean to you that you have been redeemed?\n\nHow does understanding your redemption impact your daily life?`;
        case GospelChecklistItem.Forgiveness:
            return `Bible Passage: Ephesians 4:32 (Forgive as Christ Forgave) \n\nThematic Significance: This passage encourages believers to forgive others as God forgave us in Christ, demonstrating His grace in our relationships.\n\nDiscussion Questions:\n\nHow does understanding God's forgiveness shape your ability to forgive others?\n\nWhat are some challenges you face in forgiving someone?`;
        default:
            return '';
    }
}


export function mapGospelChecklistItemTypeToIcon(item: GospelChecklistItem): AppIcon {
    switch (item) {
        case GospelChecklistItem.Creation:
        case GospelChecklistItem.Fall:
        case GospelChecklistItem.Sin:
        case GospelChecklistItem.Prophets:
        case GospelChecklistItem.Incarnation:
        case GospelChecklistItem.JesusLife:
        case GospelChecklistItem.JesusOnTheCross:
        case GospelChecklistItem.Resurrection:
        case GospelChecklistItem.Ascension:
        case GospelChecklistItem.Grace:
        case GospelChecklistItem.Faith:
        case GospelChecklistItem.Repentance:
        case GospelChecklistItem.HolySpirit:
        case GospelChecklistItem.NewCreation:
        case GospelChecklistItem.Discipleship:
        case GospelChecklistItem.GreatCommission:
        case GospelChecklistItem.SecondComing:
        case GospelChecklistItem.Heaven:
        case GospelChecklistItem.Judgment:
        case GospelChecklistItem.KingdomOfGod:
        case GospelChecklistItem.Reconciliation:
        case GospelChecklistItem.Redemption:
        case GospelChecklistItem.Forgiveness:
        default:
            return AppIcon.Christ;
    }
}

export function generateRandomId(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

export function mapStoryTypeToText(type: StoryType): string {
    switch (type) {
        case StoryType.Personal:
            return "My Story";
        case StoryType.Gods:
            return "Gods Story";
    }
    return "";
}

export function mapStoryChapterTypeToText(type: StoryChapterType): string {
    switch (type) {
        case StoryChapterType.BeforeChrist:
            return 'Before Christ';
        case StoryChapterType.SalvationMoment:
            return 'Salvation Moment';
        case StoryChapterType.AfterChrist:
            return 'After Christ';
        case StoryChapterType.Creation:
            return 'Creation';
        case StoryChapterType.Sin:
            return 'Sin';
        case StoryChapterType.OldTestament:
            return 'Old Testament';
        case StoryChapterType.Jesus:
            return 'Jesus';
        case StoryChapterType.Resurrection:
            return 'Resurrection';
        case StoryChapterType.Crucifixion:
            return 'Crucifixion';
        case StoryChapterType.Church:
            return 'Church';
        case StoryChapterType.ChosenPeople:
            return 'Chosen People';
        case StoryChapterType.JesusMinistry:
            return 'Jesus Ministry';
        case StoryChapterType.ScriptureHighlight:
            return 'Scripture Highlight';
        case StoryChapterType.Character:
            return 'Character';
        default:
            return 'Unknown Chapter Type';
    }
}

export function mapStoryChapterTypeToAppIcon(type: StoryChapterType): AppIcon {
    switch (type) {
        case StoryChapterType.BeforeChrist:
            return AppIcon.Rainy;
        case StoryChapterType.SalvationMoment:
            return AppIcon.OpenHands;
        case StoryChapterType.AfterChrist:
            return AppIcon.PlantGrow;
        case StoryChapterType.Creation:
            return AppIcon.Tree;
        case StoryChapterType.Sin:
            return AppIcon.Skull;
        case StoryChapterType.JesusMinistry:
            return AppIcon.Sheep;
        case StoryChapterType.Jesus:
        case StoryChapterType.Crucifixion:
            return AppIcon.Christ;
        case StoryChapterType.Resurrection:
            return AppIcon.CrossChurch;
        case StoryChapterType.Church:
            return AppIcon.Church;
        case StoryChapterType.ChosenPeople:
            return AppIcon.Exodus;
        case StoryChapterType.OldTestament:
        case StoryChapterType.ScriptureHighlight:
        case StoryChapterType.Character:
        default:
            return AppIcon.Book;
    }
}

export function mapStoryChapterTagToText(tag: StoryChapterTag): string {
    switch (tag) {
        case StoryChapterTag.Youth:
            return "Youth";
        case StoryChapterTag.AddictionRecovery:
            return "Addiction Recovery";
        case StoryChapterTag.Family:
            return "Family";
        case StoryChapterTag.CollegeStudent:
            return "College Student";
        case StoryChapterTag.Parent:
            return "Parent";
        case StoryChapterTag.Marriage:
            return "Marriage";
        case StoryChapterTag.Grief:
            return "Grief";
        case StoryChapterTag.Health:
            return "Health";
        case StoryChapterTag.Identity:
            return "Identity";
        case StoryChapterTag.Doubts:
            return "Doubts";
        case StoryChapterTag.SocialJustice:
            return "Social Justice";
        case StoryChapterTag.Community:
            return "Community";
        case StoryChapterTag.LifeTransition:
            return "Life Transition";
        case StoryChapterTag.Purpose:
            return "Purpose";
        case StoryChapterTag.LGBTQ:
            return "LGBTQ+";
        case StoryChapterTag.Military:
            return "Military";
        case StoryChapterTag.Immigrant:
            return "Immigrant";
        case StoryChapterTag.Prison:
            return "Prison";
        case StoryChapterTag.Service:
            return "Service";
        case StoryChapterTag.Workplace:
            return "Workplace";
        case StoryChapterTag.Racial:
            return "Racial";
        case StoryChapterTag.Nature:
            return "Nature";
        case StoryChapterTag.Missions:
            return "Missions";
        case StoryChapterTag.Finances:
            return "Finances";
        case StoryChapterTag.Atheist:
            return "Atheist";
        case StoryChapterTag.Culture:
            return "Culture";
        case StoryChapterTag.Games:
            return "Games";
        case StoryChapterTag.Spirituality:
            return "Spirituality";
        case StoryChapterTag.Forgiveness:
            return "Forgiveness";
        case StoryChapterTag.Joy:
            return "Joy";
        case StoryChapterTag.Peace:
            return "Peace";
        case StoryChapterTag.Love:
            return "Love";
        case StoryChapterTag.Faithfulness:
            return "Faithfulness";
        case StoryChapterTag.Music:
            return "Music";
        case StoryChapterTag.Prayer:
            return "Prayer";
        case StoryChapterTag.Worship:
            return "Worship";
        case StoryChapterTag.Discipleship:
            return "Discipleship";
        case StoryChapterTag.Scripture:
            return "Scripture";
        case StoryChapterTag.Upbringing:
            return "Upbringing";
        case StoryChapterTag.Suffering:
            return "Suffering";
        default:
            return "Unknown Tag";
    }
};

export function mapStoryChapterQualityToText(quality: number): string {
    if (quality >= 8) {
        return 'Essential';
    } else if (quality >= 5) {
        return 'Important';
    } else if (quality >= 3) {
        return 'Interesting';
    }
    return 'Neutral';
}

export function shouldKeepChapter(quality: number): boolean {
    return quality >= 5;
}



/**
 * Function to shuffle an array (Fisher-Yates Shuffle Algorithm)
 */
function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

/**
 * Function to calculate the difference in days between two dates
 */
export function getDaysDifference(startDate: Date, currentDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const diffInTime = currentDate.getTime() - startDate.getTime();
    return Math.abs(Math.floor(diffInTime / oneDay));
}

/**
 * Function to get the item for the given date
 */
export function getItemForDate(currentDate: Date, array: string[]): string {
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const startDate = new Date(0);
    const daysPassed = Math.floor((currentDate.getTime() - startDate.getTime()) / millisecondsInADay);
    const index = daysPassed % array.length;
    return array[index];
}

export function getDatesInRange(startDate: Date, endDate: Date): Date[] {
    const dateArray: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return dateArray;
}

export function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength - 3) + '...';
}

export function calculatePercent(arr1: Number[], arr2: Number[]): number {
    const countInSecondArray = arr2.filter(num => arr1.includes(num)).length;
    const percentage = Math.ceil((countInSecondArray / arr2.length) * 100);
    return percentage;
}

export function getRandomString(strings: string[]): string {
    const randomIndex = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
}

export const isAppIcon = (value: any): value is AppIcon => {
    return Object.values(AppIcon).includes(value);
};

export const isAvatarIcon = (value: any): value is AvatarIcon => {
    return Object.values(AvatarIcon).includes(value);
};

export function getAppIconKey(value: any): string | undefined {
    for (const [key, val] of Object.entries(AppIcon)) {
        if (val === value) {
            return key;
        }
    }
    return undefined;
}

export function getAvatarIconKey(value: any): string | undefined {
    for (const [key, val] of Object.entries(AvatarIcon)) {
        if (val === value) {
            return key;
        }
    }
    return undefined;
}

export function partitionChaptersByTag(storyChapters: StoryChapter[]): { key: StoryChapterTag; items: StoryChapter[] }[] {1
    const partitioned = new Map<StoryChapterTag, StoryChapter[]>();

    storyChapters.forEach((chapter) => {
        chapter.tags.forEach((tag) => {
            // If the tag is not already in the map, add it with an empty array
            if (!partitioned.has(tag)) {
                partitioned.set(tag, []);
            }
            // Add the chapter to the array for this tag
            partitioned.get(tag)!.push(chapter);
        });
    });

    return Array.from(partitioned, ([key, items]) => ({ key, items }))
        .sort((a, b) => b.items.length - a.items.length);
}

export function toggleTagFromFilter(tag: StoryChapterTag, tagFilters: StoryChapterTag[]) {
    if (!tagFilters) {
        return [];
    }

    if (tagFilters.includes(tag)) {
        return [...tagFilters].filter((t) => t !== tag);
    }
    return [...tagFilters, tag];
}

export function toggleTypeFromFilter(type: StoryChapterType, typeFilters: StoryChapterType[]) {
    if (!typeFilters) {
        return [];
    }

    if (typeFilters.includes(type)) {
        return [...typeFilters].filter((t) => t !== type);
    }
    return [...typeFilters, type];
}

export const countRenderableChapters = (storyChapters: StoryChapter[], tagFilters: StoryChapterTag[],
     typeFilters: StoryChapterType[]): number => {
    return storyChapters.filter(chapter => doesChapterMatchFilter(chapter, tagFilters, typeFilters)).length;
};

export function doesChapterMatchFilter(chapter: StoryChapter, tagFilters: StoryChapterTag[], typeFilters: StoryChapterType[]) : Boolean {
    const hasFilter = tagFilters.length + typeFilters.length > 0;
    return !hasFilter || (tagFilters.some((tag => chapter.tags.includes(tag))) || typeFilters.includes(chapter.chapterType));
}