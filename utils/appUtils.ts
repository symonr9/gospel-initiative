import { ActionStepType, AppIcon, BeaconType, OneCategory, OneFactType, OneStage, Priority, ShareChristPageState, StoryChapterType, StoryType } from "@/enums/enums";
import Beacon from "@/models/beacon";
import One from "@/models/one";
import StoryChapter from "@/models/storyChapter";
import User from "@/models/user";
import { Action } from "@/redux/actions";

// console.log(formatEnumKey(OneFactType, OneFactType.SpiritualBeliefs)); // Output: "Spiritual Beliefs"
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
    tomorrow.setDate(today.getDate() + 7);
    return tomorrow;
}

export function isWithinNext24Hours(date: Date): boolean {
    const now = new Date();
    const future24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return date && date > now && date <= future24Hours;
}


export function getAppTimeAgoText(date: Date | undefined, expiration = false): string {
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
            if (expiration) {
                return isFuture ? `Expires in ${count} ${unit}` : `Expired ${count} ${unit} ago`;
            }
            return isFuture ? `Target date in ${count} ${unit}` : `Target Date passed ${count} ${unit} ago`;
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
    return isWithinNext24Hours(beacon.activeUntil);
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
            return "This person is actively following Christ, growing in faith, and learning to disciple others. They are committed to living out biblical principles and sharing their faith with others.";
        case OneStage.NewBeliever:
            return "This person has recently made a commitment to follow Christ. They are in the early stages of understanding their faith and beginning their spiritual journey.";
        case OneStage.Seeking:
            return "This person is actively seeking answers about Christianity and the gospel. They are open to learning more and are considering a commitment to faith.";
        case OneStage.Curious:
            return "This person is curious about Christianity but has not yet made any significant steps toward faith. They are open to conversations and exploration.";
        case OneStage.Friendly:
            return "This person is friendly and open to believers, but they are not actively seeking faith or asking questions about Christianity.";
        case OneStage.Apathetic:
            return "This person shows little interest in spiritual matters or the Christian faith. They are indifferent and not currently open to discussions about faith.";
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
        case OneStage.Hostile:
            return AppIcon.StageHostile;
    }   
    return "";
}

export function mapOneCategoryToText(category: OneCategory) : String {
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
            return "Cashief";
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
            return "Household Help";
        case OneCategory.WorkoutPartner:
            return "Workout Partner";
        case OneCategory.PersonalCareProfessional:
            return "Personal Care Professional";
        case OneCategory.MedicalProf:
            return "Medical Professional";
        case OneCategory.LongDistanceFriend:
            return "Long Distance Friend";
        case OneCategory.Friend:
        default:
            return "Friend.";
    }
};

export function mapOneCategoryToIcon(category: OneCategory) : AppIcon {
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

export function mapOneFactTypeToAppIcon(oneFactType: OneFactType): AppIcon {
    switch (oneFactType) {
        case OneFactType.Background:
            return AppIcon.Man1;
        case OneFactType.Family:
            return AppIcon.Tree;
        case OneFactType.Likes:
            return AppIcon.Cherries;
        case OneFactType.Dislikes:
            return AppIcon.Skull;
        case OneFactType.Work:
            return AppIcon.City;
        case OneFactType.Hobbies:
            return AppIcon.Bird;
        case OneFactType.Education:
            return AppIcon.Edit;
        case OneFactType.SpiritualBeliefs:
            return AppIcon.Christ;
        case OneFactType.LifeGoals:
            return AppIcon.CrossChurch;
        case OneFactType.Favorite:
            return AppIcon.ChurchValentines;
        case OneFactType.FaithBackground:
            return AppIcon.Church;
        case OneFactType.CommonGround:
            return AppIcon.NetworkPeople;
        case OneFactType.PrayerPoint:
            return AppIcon.Prayer;
        default:
            return AppIcon.Globe;
    }
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

export function mapBeaconTypeToTitleText(type: BeaconType, shareOneName: boolean, 
    shareOwnName: boolean, user: User, one: One) {
    const userName = shareOwnName ? user.name : 'A User';
    const oneName = shareOneName ? one.name :'their One';
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
    switch(type) {
        case ActionStepType.ShareGospel:
            return AppIcon.Christ;
        case ActionStepType.ShareTestimony:
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

export function mapActionStepTypeToText(type: ActionStepType) : string {
    switch (type) {
        case ActionStepType.ShareGospel:
            return "Share Gospel";
        case ActionStepType.ShareTestimony:
            return "Share Testimony";
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

export function isEditing(pageState: ShareChristPageState) {
    return [
        ShareChristPageState.Edit,
    ].includes(pageState);
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

  export function mapStoryChapterTypeToAppIcon(type: StoryChapterType) : AppIcon {
    switch (type) {
        case StoryChapterType.Background:
            return AppIcon.Bird;
        case StoryChapterType.Seeking:
            return AppIcon.StageSeeking;
        case StoryChapterType.Curious:
            return AppIcon.StageCurious;
        case StoryChapterType.SalvationExperience:
            return AppIcon.OpenHands;
        case StoryChapterType.Struggle:
            return AppIcon.Fighting;
        case StoryChapterType.Highlight:
            return AppIcon.Dove;
        case StoryChapterType.Lowlight:
            return AppIcon.Rainy;
        case StoryChapterType.GrowingInFaith:
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
        case StoryChapterType.Misc:
        default:
            return AppIcon.Book;
    }
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
  function getDaysDifference(startDate: Date, currentDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const diffInTime = currentDate.getTime() - startDate.getTime();
    return Math.floor(diffInTime / oneDay);
  }
  
  /**
   * Function to get the item for the given date
   */
  export function getItemForDate(currentDate: Date, array: string[]): string {
    const cycleLength = array.length;
  
    // Calculate how many days have passed since the start date
    const daysPassed = getDaysDifference(new Date('2024-09-01'), currentDate);
  
    // Determine the cycle number (how many full cycles have completed)
    const cycleNumber = Math.floor(daysPassed / cycleLength);
  
    // For each new cycle, shuffle the array
    let shuffledArray = shuffleArray(array);
    if (cycleNumber > 0) {
      shuffledArray = shuffleArray(array); // Reshuffle for each new cycle
    }
  
    // Get the index within the current cycle
    const indexInCycle = daysPassed % cycleLength;
  
    return shuffledArray[indexInCycle];
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
