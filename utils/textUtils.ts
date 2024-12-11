import { ActionStepType, BeaconTag, BeaconType, GlobalBeaconType, GospelChecklistItem, GospelStepType, OneCategory, OneNoteType, OneStage, Priority, StoryChapterTag, StoryChapterType } from "@/enums/enums";


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

export function mapOneStageToTitle(stage: OneStage) {
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

export function mapOneStageToDetailsText(stage: OneStage) {
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
export function mapOneCategoryToTitle(category: OneCategory): String {
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
            return "Roomie";
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
}
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
export function mapBeaconTypeToTitleText(type: BeaconType,
    shareOwnName: boolean, initUserName: string | null) {
    const userName = (shareOwnName || !initUserName) ? initUserName : 'A User';
    const oneName = 'their One';
    switch (type) {
        case BeaconType.SpiritualConversation:
            return `${userName} would like a spiritual conversation with ${oneName}.`;
        case BeaconType.GospelConversation:
            return `${userName} wants prayer for boldness to share the Gospel with ${oneName}.`;
        case BeaconType.CaringForYourOne:
            return `${userName} wants prayer for the things going on in ${oneName}'s life and for ways to serve them.`;
        case BeaconType.Invitation:
            return `${userName} is planning to or has invited ${oneName} somewhere.`;
        case BeaconType.ConfidenceForMe:
            return `${userName} wants prayer for them to grow in confidence in sharing their testimony.`;
        case BeaconType.GetToKnowThem:
            return `${userName} wants to get to know ${oneName} better.`;
        default:
            return '';
    }
}
export function mapGlobalBeaconTypeToTitleText(type: GlobalBeaconType | null) {
    if (!type) {
        return 'Boldness To Share';
    }

    switch (type) {
        case GlobalBeaconType.NewBelievers:
            return 'New Believers';
        case GlobalBeaconType.BoldnessToShare:
            return 'Boldness To Share';
        case GlobalBeaconType.Missionaries:
            return 'Missionaries';
        case GlobalBeaconType.MissionsTrips:
            return 'Missions Trips';
        case GlobalBeaconType.OurCity:
            return 'Our City';
        case GlobalBeaconType.Neighborhood:
            return 'Neighborhood';
        case GlobalBeaconType.Schools:
            return 'Schools';
        case GlobalBeaconType.PoorHungry:
            return 'Poor and Hungry';
        case GlobalBeaconType.Families:
            return 'Families';
        case GlobalBeaconType.Parents:
            return 'Parents';
        case GlobalBeaconType.Marriages:
            return 'Marriages';
        case GlobalBeaconType.Nation:
            return 'Nation';
        case GlobalBeaconType.Toddlers:
            return 'Toddlers';
        case GlobalBeaconType.ElementarySchoolers:
            return 'Elementary Schoolers';
        case GlobalBeaconType.MiddleSchoolers:
            return 'Middle Schoolers';
        case GlobalBeaconType.HighSchoolers:
            return 'High Schoolers';
        case GlobalBeaconType.Mosaic:
            return 'Mosaic';
        case GlobalBeaconType.YoungAdults:
            return 'Young Adults';
        case GlobalBeaconType.Elderly:
            return 'Elderly';
        case GlobalBeaconType.Workplaces:
            return 'Workplaces';
        case GlobalBeaconType.Leaders:
            return 'Leaders';
        case GlobalBeaconType.Discipleship:
            return 'Discipleship';
        case GlobalBeaconType.ChurchUnity:
            return 'Church Unity';
        case GlobalBeaconType.AddictionRecovery:
            return 'Addiction Recovery';
        case GlobalBeaconType.LeadersInTraining:
            return 'Leaders In Training';
        default:
            return '';
    }
}
export function mapGlobalBeaconTypeToDetailsText(type: GlobalBeaconType | null) {
    if (!type) {
        return 'Pray for our community to receive boldness and courage to share their faith with others.';
    }

    switch (type) {
        case GlobalBeaconType.NewBelievers:
            return 'Pray for new believers to grow in their faith and be planted and find support in our community.';
        case GlobalBeaconType.BoldnessToShare:
            return 'Pray for our community to receive boldness and courage to share their faith with others.';
        case GlobalBeaconType.Missionaries:
            return 'Pray for the missionaries we support to be strengthened in the Lord and given wisdom and provision for their work.';
        case GlobalBeaconType.MissionsTrips:
            return 'Pray for our upcoming missions trips to effectively reach the nations and preach the Gospel in word and deed.';
        case GlobalBeaconType.OurCity:
            return 'Pray for our church to love our city well, that people will come to know Christ.';
        case GlobalBeaconType.Neighborhood:
            return 'Pray for the residents of our neighborhood, that they would experience God’s love and grace.';
        case GlobalBeaconType.Schools:
            return 'Pray for the schools in our community, for students, teachers, and staff to experience God’s peace and wisdom.';
        case GlobalBeaconType.PoorHungry:
            return 'Pray for the poor and hungry, that they may find provision and care through the body of Christ.';
        case GlobalBeaconType.Families:
            return 'Pray for families to be strengthened in love, unity, and faith in Christ.';
        case GlobalBeaconType.Parents:
            return 'Pray for parents to have wisdom and grace as they raise their children in the fear of the Lord.';
        case GlobalBeaconType.Marriages:
            return 'Pray for marriages to be built on Christ-centered love, respect, and mutual support.';
        case GlobalBeaconType.Nation:
            return 'Pray for our nation to turn to God in repentance and humility.';
        case GlobalBeaconType.Toddlers:
            return 'Pray for toddlers to grow in health, joy, and in the knowledge of God’s love for them.';
        case GlobalBeaconType.ElementarySchoolers:
            return 'Pray for elementary schoolers to develop a love for learning, kindness, and the Gospel.';
        case GlobalBeaconType.MiddleSchoolers:
            return 'Pray for middle schoolers to be filled with hope and courage to stand firm in their faith.';
        case GlobalBeaconType.HighSchoolers:
            return 'Pray for high schoolers to navigate challenges and find a firm foundation in Christ.';
        case GlobalBeaconType.Mosaic:
            return 'Pray for our college students to grow deeply in their relationship with God and with community.';
        case GlobalBeaconType.YoungAdults:
            return 'Pray for young adults to discover their purpose in Christ and live out their faith boldly.';
        case GlobalBeaconType.Elderly:
            return 'Pray for the elderly to experience peace, comfort, and purpose.';
        case GlobalBeaconType.Workplaces:
            return 'Pray for our community to enter into our workplaces as kind-hearted and bold witnesses of Christ.';
        case GlobalBeaconType.Leaders:
            return 'Pray for the leaders and volunteers in our church to find rest and joy in the Lord.';
        case GlobalBeaconType.Discipleship:
            return 'Pray for intentional discipleship relationships that lead to spiritual growth and transformation.';
        case GlobalBeaconType.ChurchUnity:
            return 'Pray for unity in the body of Christ, that we may be one in mission and purpose.';
        case GlobalBeaconType.AddictionRecovery:
            return 'Pray for those recovering from addiction to experience freedom and healing in Christ.';
        case GlobalBeaconType.LeadersInTraining:
            return 'Pray for God to raise up leaders in our community who will give their lives to full time ministry.';
        default:
            return '';
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
            return "Send Text to Encourage";
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
export function mapGospelStepTypeToTitle(item: GospelStepType): string {
    switch (item) {
        case GospelStepType.SpiritualConversations:
            return "Spiritual Conversations";
        case GospelStepType.GospelConversations:
            return "Gospel Conversations";
        case GospelStepType.GodsExistence:
            return "God's Existence";
        case GospelStepType.GodsLoveForThem:
            return "God's Love For Them";
        case GospelStepType.SeparationFromGod:
            return "Separation From God";
        case GospelStepType.JesusLifeDeath:
            return "Jesus' Life and Death";
        case GospelStepType.SalvationByGraceThroughFaith:
            return "Salvation By Grace Through Faith";
        case GospelStepType.SalvationMoment:
            return "Salvation Moment";
        case GospelStepType.Bible:
            return "Bible";
        case GospelStepType.Prayer:
            return "Prayer";
        case GospelStepType.Worship:
            return "Worship";
        case GospelStepType.Repentance:
            return "Repentance";
        case GospelStepType.Creation:
            return "Creation";
        case GospelStepType.Heaven:
            return "Heaven";
        case GospelStepType.Trinity:
            return "Trinity";
        case GospelStepType.HolySpirit:
            return "Holy Spirit";
        case GospelStepType.Prophets:
            return "Prophets";
        case GospelStepType.Baptism:
            return "Baptism";
        case GospelStepType.Community:
            return "Community";
        case GospelStepType.Disciple:
            return "Disciple";
        case GospelStepType.DiscipleOthers:
            return "Disciple Others";
    }
}
export function mapGospelStepTypeToDetails(item: GospelStepType): string {
    switch (item) {
        case GospelStepType.SpiritualConversations:
            return "Mark instances when you've had spiritual conversations.";
        case GospelStepType.GospelConversations:
            return "Mark instance when you've had Gospel conversations.";
        case GospelStepType.GodsExistence:
            return "Do they believe in the existence of a God?";
        case GospelStepType.GodsLoveForThem:
            return "Do they know that God loves them?";
        case GospelStepType.SeparationFromGod:
            return "Do they know that sin separates us from God?";
        case GospelStepType.JesusLifeDeath:
            return "Do they know that God sent his Son Jesus to live and die on your behalf?";
        case GospelStepType.SalvationByGraceThroughFaith:
            return "Do they know that accepting Jesus as their Savior is the only way to salvation?";
        case GospelStepType.SalvationMoment:
            return "Have they accepted Jesus as their Savior?";
        case GospelStepType.Bible:
            return "Do they know what the Bible is and how to read it?";
        case GospelStepType.Prayer:
            return "Do they know what the role of prayer is in the Chrisitan life?";
        case GospelStepType.Worship:
            return "Do they know what worship is?";
        case GospelStepType.Repentance:
            return "Do they know about the role that repentance and confession play in the Christian life?";
        case GospelStepType.Creation:
            return "Do they know about the Creation account?";
        case GospelStepType.Heaven:
            return "Do they know about what the Bible says about Heaven?";
        case GospelStepType.Trinity:
            return "Do they know about the concept of the Trinity?";
        case GospelStepType.HolySpirit:
            return "Do they know about the role and function of the Holy Spirit?";
        case GospelStepType.Prophets:
            return "Do they know about how the prophets all pointed in faith towards Jesus?";
        case GospelStepType.Baptism:
            return "Have they been baptized?";
        case GospelStepType.Community:
            return "Have they stepped into Christian community?";
        case GospelStepType.Disciple:
            return "Are they a disciple?";
        case GospelStepType.DiscipleOthers:
            return "Are they equipped to disciple others?";
    }
}
export function mapGospelStepBinaryRatingToText(type: GospelStepType, checked: boolean): string {
    if (type === GospelStepType.GodsExistence) {
        return checked ? "Yes, they believe in a God/a spiritual reality." : "No, they not believe in a God/spiritual reality.";
    } else if (type === GospelStepType.SalvationMoment) {
        return checked ? "Yes, they have confessed Jesus as their Savior." : "No, they have not accepted Jesus as their Savior.";
    } else if (type === GospelStepType.Baptism) {
        return checked ? "Yes, they have been baptized." : "No, they have not been baptized.";
    } else if (type === GospelStepType.Community) {
        return checked ? "Yes, they have joined Christian community." : "No, they haven't joined Christian community.";
    } else if (type === GospelStepType.Disciple) {
        return checked ? "Yes, they are being discipled by another Christian." : "No, they aren't being discipled by another Christian.";
    } else if (type === GospelStepType.DiscipleOthers) {
        return checked ? "Yes, they are discipling others." : "No, they are not yet discipling others.";
    }
    return checked ? "Yes, they have done this." : "No, they not yet done this.";
}
export function mapGospelStepScaleRatingToText(rating: number): string {
    if (rating === 5) {
        return "They could effectively share this concept to others.";
    } else if (rating === 4) {
        return "They understand the concept and what it means for their lives.";
    } else if (rating == 3) {
        return "You have explained this concept in detail and answered their questions about it.";
    } else if (rating === 2) {
        return "You have shared about what this concept means to you.";
    } else if (rating === 1) {
        return "You have briefly mentioned this concept to them.";
    }

    return "You haven't yet shared this concept with them.";
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
}

