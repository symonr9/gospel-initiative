import { ActionStepType, AppIcon, BeaconType, GlobalBeaconType, GospelStepType, OneCategory, OneNoteType, OneStage, StoryChapterType } from "@/enums/enums";

export const getShowHideIcon = (show: boolean) => show ? AppIcon.Show : AppIcon.Hide;

export function mapOneStageToIcon(stage: OneStage) {
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
        default:
            return AppIcon.StageHostile;
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
}
export function mapOneNoteTypeToIcon(type: OneNoteType): AppIcon {
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
export function mapBeaconTypeToIcon(type: BeaconType) {
    switch (type) {
        case BeaconType.SpiritualConversation:
            return AppIcon.Conversation;
        case BeaconType.GospelConversation:
            return AppIcon.FastResponse;
        case BeaconType.CaringForYourOne:
            return AppIcon.Care;
        case BeaconType.Invitation:
            return AppIcon.Invitation;
        case BeaconType.ConfidenceForMe:
            return AppIcon.PlantGrow;
        case BeaconType.GetToKnowThem:
        case BeaconType.Archived:
        default:
            return AppIcon.Coffee;
    }
}
export function mapGlobalBeaconTypeToIcon(type: GlobalBeaconType | null): AppIcon {
    if (!type) {
        return AppIcon.Conversation;
    }

    switch (type) {
        case GlobalBeaconType.Leaders:
            return AppIcon.NetworkPeople;
        case GlobalBeaconType.NewBelievers:
            return AppIcon.PlantGrow;
        case GlobalBeaconType.Missionaries:
        case GlobalBeaconType.MissionsTrips:
            return AppIcon.Globe;
        case GlobalBeaconType.OurCity:
        case GlobalBeaconType.Neighborhood:
            return AppIcon.NightPark;
        case GlobalBeaconType.Schools:
        case GlobalBeaconType.ElementarySchoolers:
        case GlobalBeaconType.MiddleSchoolers:
        case GlobalBeaconType.HighSchoolers:
            return AppIcon.Backpack;
        case GlobalBeaconType.PoorHungry:
        case GlobalBeaconType.Families:
        case GlobalBeaconType.Parents:
            return AppIcon.UserGroup;
        case GlobalBeaconType.Marriages:
            return AppIcon.Heart;
        case GlobalBeaconType.Nation:
            return AppIcon.Mountain;
        case GlobalBeaconType.Toddlers:
            return AppIcon.Bird;
        case GlobalBeaconType.Mosaic:
            return AppIcon.MosaicOrange;
        case GlobalBeaconType.YoungAdults:
        case GlobalBeaconType.Elderly:
            return AppIcon.UserGroup;
        case GlobalBeaconType.Workplaces:
            return AppIcon.Employee;
        case GlobalBeaconType.Discipleship:
        case GlobalBeaconType.LeadersInTraining:
            return AppIcon.LightBulb;
        case GlobalBeaconType.ChurchUnity:
            return AppIcon.Church;
        case GlobalBeaconType.AddictionRecovery:
            return AppIcon.Health;
        case GlobalBeaconType.BoldnessToShare:
        default:
            return AppIcon.Conversation;
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
export function mapGospelStepTypeToIcon(item: GospelStepType): AppIcon {
    switch (item) {
        case GospelStepType.SpiritualConversations:
        case GospelStepType.GospelConversations:
            return AppIcon.Conversation;
        case GospelStepType.GodsExistence:
            return AppIcon.Church;
        case GospelStepType.GodsLoveForThem:
            return AppIcon.Heart;
        case GospelStepType.SeparationFromGod:
            return AppIcon.Skull;
        case GospelStepType.JesusLifeDeath:
            return AppIcon.Christ;
        case GospelStepType.SalvationByGraceThroughFaith:
            return AppIcon.PlantGrow;
        case GospelStepType.SalvationMoment:
            return AppIcon.OpenHands;
        case GospelStepType.Bible:
            return AppIcon.Book;
        case GospelStepType.Prayer:
            return AppIcon.Prayer;
        case GospelStepType.Worship:
            return AppIcon.Music;
        case GospelStepType.Repentance:
            return AppIcon.LightBulb;
        case GospelStepType.Creation:
            return AppIcon.Globe;
        case GospelStepType.Heaven:
            return AppIcon.Heaven;
        case GospelStepType.Trinity:
            return AppIcon.GroupOfThree;
        case GospelStepType.HolySpirit:
            return AppIcon.Dove;
        case GospelStepType.Prophets:
            return AppIcon.Exodus;
        case GospelStepType.Baptism:
            return AppIcon.Water;
        case GospelStepType.Community:
            return AppIcon.UserGroup;
        case GospelStepType.Disciple:
            return AppIcon.PlantGrow;
        case GospelStepType.DiscipleOthers:
            return AppIcon.Christ;
    }
}
export function mapStoryChapterTypeToIcon(type: StoryChapterType): AppIcon {
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

