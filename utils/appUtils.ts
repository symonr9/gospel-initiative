import { ActionStepType, AppIcon, BeaconType, GospelChecklistItem, OneCategory, OneFactType, OneStage, Priority, StoryChapterTag, StoryChapterType, StoryType } from "@/enums/enums";
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
            return "Friend";
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

export function mapBeaconTypeToTitleText(type: BeaconType, 
    shareOwnName: boolean, user: User, one: One) {
    const userName = shareOwnName ? user.name : 'A User';
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

export function mapGospelChecklistItemTypeToTitle(item: GospelChecklistItem): string {
    switch(item) {
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
            return "God created the heavens and the earth, establishing His sovereignty and purpose for humanity.";
        case GospelChecklistItem.Fall:
            return "Humanity's rebellion against God in the Garden of Eden, leading to sin entering the world and the need for redemption.";
        case GospelChecklistItem.Sin:
            return "Sin is humanity's disobedience to God, separating us from His holiness and creating the need for a Savior.";
        case GospelChecklistItem.Prophets:
            return "God sent prophets to warn, guide, and foretell the coming of the Messiah, emphasizing His plan for salvation.";
        case GospelChecklistItem.Incarnation:
            return "Jesus Christ, fully God and fully man, came to earth in human form to dwell among us and redeem humanity.";
        case GospelChecklistItem.JesusLife:
            return "The perfect life of Jesus demonstrated God's love, fulfilled the Law, and revealed His kingdom through teachings and miracles.";
        case GospelChecklistItem.JesusOnTheCross:
            return "Jesus' death on the cross was the ultimate sacrifice, paying for the sins of humanity and offering reconciliation with God.";
        case GospelChecklistItem.Resurrection:
            return "On the third day, Jesus rose from the dead, conquering death and sin, offering eternal life to all who believe.";
        case GospelChecklistItem.Ascension:
            return "Jesus ascended to heaven, where He reigns at the right hand of the Father, interceding for believers.";
        case GospelChecklistItem.Grace:
            return "Salvation is a free gift of grace from God, given to humanity through faith in Jesus Christ, not earned by works.";
        case GospelChecklistItem.Faith:
            return "Faith in Jesus Christ is the means by which individuals are saved and made righteous before God.";
        case GospelChecklistItem.Repentance:
            return "Repentance involves turning away from sin and turning toward God in humility and faith, seeking forgiveness.";
        case GospelChecklistItem.HolySpirit:
            return "The Holy Spirit is sent to dwell within believers, empowering them for holy living, guidance, and spiritual growth.";
        case GospelChecklistItem.NewCreation:
            return "In Christ, believers become a new creation, with old things passed away and a new life in God's kingdom.";
        case GospelChecklistItem.Discipleship:
            return "Discipleship is the process of following Jesus, learning His teachings, and growing in faith to live as His disciple.";
        case GospelChecklistItem.GreatCommission:
            return "Jesus' command to His followers to go into all the world, making disciples of all nations and baptizing them.";
        case GospelChecklistItem.SecondComing:
            return "Jesus will return in power and glory to judge the living and the dead, establishing His eternal kingdom.";
        case GospelChecklistItem.Heaven:
            return "Heaven is the eternal dwelling place of believers, where they will live in the presence of God, free from sin and suffering.";
        case GospelChecklistItem.Judgment:
            return "God will judge all humanity according to their deeds, with eternal consequences for those who reject or accept Christ.";
        case GospelChecklistItem.KingdomOfGod:
            return "The Kingdom of God is God's sovereign rule over creation, inaugurated by Jesus, and fully realized at His return.";
        case GospelChecklistItem.Reconciliation:
            return "Through Christ's sacrifice, humanity is reconciled to God, restoring the broken relationship caused by sin.";
        case GospelChecklistItem.Redemption:
            return "Jesus' death and resurrection redeem humanity from the bondage of sin, offering freedom and eternal life.";
        case GospelChecklistItem.Forgiveness:
            return "Through Jesus, God offers forgiveness of sins, washing away guilt and making reconciliation with Him possible.";
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
    switch(item) {
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

  export function mapStoryChapterTypeToText(type: StoryChapterType) : string {
    switch (type) {
        case StoryChapterType.MyUpbringing:
            return 'My Upbringing';
        case StoryChapterType.LifeBeforeChrist:
            return 'Life Before Christ';
        case StoryChapterType.SalvationMoment:
            return 'Salvation Moment';
        case StoryChapterType.Transformation:
            return 'Transformation';
        case StoryChapterType.Highlight:
            return 'Highlight';
        case StoryChapterType.Lowlight:
            return 'Lowlight';
        case StoryChapterType.Misc:
            return 'Misc';
        case StoryChapterType.GrowingInFaith:
            return 'Growing In Faith';
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

  export function mapStoryChapterTypeToAppIcon(type: StoryChapterType) : AppIcon {
    switch (type) {
        case StoryChapterType.MyUpbringing:
            return AppIcon.Bird;
        case StoryChapterType.LifeBeforeChrist:
            return AppIcon.StageSeeking;
        case StoryChapterType.SalvationMoment:
            return AppIcon.StageCurious;
        case StoryChapterType.Transformation:
            return AppIcon.OpenHands;
        case StoryChapterType.Highlight:
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

  export function mapStoryChapterTagToText(tag: StoryChapterTag) : string {
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
function getDaysDifference(startDate: Date, currentDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const diffInTime = currentDate.getTime() - startDate.getTime();
    return Math.floor(diffInTime / oneDay);
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