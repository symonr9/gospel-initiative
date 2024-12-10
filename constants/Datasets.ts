import { ActionStepType, GospelStepLayoutType, GospelStepType, OneStage } from "@/enums/enums";
import ActionStep from "@/models/actionStep";
import { getDayInFuture } from "@/utils/appUtils";
import { mapOneStageToIcon } from "@/utils/iconUtils";
import { mapOneStageToDetailsText } from "@/utils/textUtils";
import { mapOneStageToTitle } from "@/utils/textUtils";

export const StageArray = [
    OneStage.Hostile,
    OneStage.Hurt,
    OneStage.Apathetic,
    OneStage.Friendly,
    OneStage.Curious,
    OneStage.Seeking,
    OneStage.NewBeliever,
    OneStage.Disciple,
].map((value: OneStage) => ({
    stage: value,
    icon: mapOneStageToIcon(value),
    label: mapOneStageToTitle(value),
    details: mapOneStageToDetailsText(value)
}));export function generateActionStepsForStage(stage: OneStage): ActionStep[] {
    const actionSteps: ActionStep[] = [];
    switch (stage) {
        case OneStage.Disciple:
            actionSteps.push(
                ActionStep.create(ActionStepType.AskForPrayerRequest, getDayInFuture(8)),
                ActionStep.create(ActionStepType.InviteToGroup, getDayInFuture(15)),
                ActionStep.create(ActionStepType.HostAtHome, getDayInFuture(22)),
                ActionStep.create(ActionStepType.DiscussScripture, getDayInFuture(31))
            );
            break;
        case OneStage.NewBeliever:
            actionSteps.push(
                ActionStep.create(ActionStepType.TakeOutToCoffee, getDayInFuture(8)),
                ActionStep.create(ActionStepType.InviteToGroup, getDayInFuture(15)),
                ActionStep.create(ActionStepType.OfferToHelpWithErrands, getDayInFuture(22)),
                ActionStep.create(ActionStepType.HostAtHome, getDayInFuture(31))
            );
            break;
        case OneStage.Seeking:
            actionSteps.push(
                ActionStep.create(ActionStepType.TakeOutToCoffee, getDayInFuture(8)),
                ActionStep.create(ActionStepType.ShareGospel, getDayInFuture(15)),
                ActionStep.create(ActionStepType.InviteToGroup, getDayInFuture(22)),
                ActionStep.create(ActionStepType.ShareTestimony, getDayInFuture(31))
            );
            break;
        case OneStage.Curious:
            actionSteps.push(
                ActionStep.create(ActionStepType.TakeOutToCoffee, getDayInFuture(8)),
                ActionStep.create(ActionStepType.ListenToTestimony, getDayInFuture(15)),
                ActionStep.create(ActionStepType.ShareTestimony, getDayInFuture(22)),
                ActionStep.create(ActionStepType.ShareGospel, getDayInFuture(31))
            );
            break;
        case OneStage.Friendly:
            actionSteps.push(
                ActionStep.create(ActionStepType.SendEncouragementText, getDayInFuture(8)),
                ActionStep.create(ActionStepType.DropOffGiftWithBlessingNote, getDayInFuture(15)),
                ActionStep.create(ActionStepType.InviteToGroup, getDayInFuture(22)),
                ActionStep.create(ActionStepType.ShareGospel, getDayInFuture(31))
            );
            break;
        case OneStage.Apathetic:
            actionSteps.push(
                ActionStep.create(ActionStepType.SendEncouragementText, getDayInFuture(8)),
                ActionStep.create(ActionStepType.OfferToHelpWithErrands, getDayInFuture(15)),
                ActionStep.create(ActionStepType.InviteToEvent, getDayInFuture(22)),
                ActionStep.create(ActionStepType.AskSpiritualQuestion, getDayInFuture(31))
            );
            break;
        case OneStage.Hurt:
            actionSteps.push(
                ActionStep.create(ActionStepType.SendEncouragementText, getDayInFuture(8)),
                ActionStep.create(ActionStepType.TakeOutToCoffee, getDayInFuture(15)),
                ActionStep.create(ActionStepType.ListenToTestimony, getDayInFuture(22)),
                ActionStep.create(ActionStepType.InviteToEvent, getDayInFuture(31))
            );
            break;
        case OneStage.Hostile:
            actionSteps.push(
                ActionStep.create(ActionStepType.OfferToHelpWithErrands, getDayInFuture(8)),
                ActionStep.create(ActionStepType.SendEncouragementText, getDayInFuture(15)),
                ActionStep.create(ActionStepType.TakeOutToCoffee, getDayInFuture(22)),
                ActionStep.create(ActionStepType.ListenToTestimony, getDayInFuture(31))
            );
            break;
        default:
            break;
    }

    return actionSteps;
}
export function mapGospelStepTypeToLayoutType(item: GospelStepType): GospelStepLayoutType {
    switch (item) {
        case GospelStepType.GodsExistence:
        case GospelStepType.SalvationMoment:
        case GospelStepType.Baptism:
        case GospelStepType.Community:
        case GospelStepType.Disciple:
        case GospelStepType.DiscipleOthers:
            return GospelStepLayoutType.Binary;

        case GospelStepType.GodsLoveForThem:
        case GospelStepType.SeparationFromGod:
        case GospelStepType.JesusLifeDeath:
        case GospelStepType.SalvationByGraceThroughFaith:
        case GospelStepType.Bible:
        case GospelStepType.Prayer:
        case GospelStepType.Worship:
        case GospelStepType.Repentance:
        case GospelStepType.Creation:
        case GospelStepType.Heaven:
        case GospelStepType.Trinity:
        case GospelStepType.HolySpirit:
        case GospelStepType.Prophets:
            return GospelStepLayoutType.Scale;

        case GospelStepType.SpiritualConversations:
        case GospelStepType.GospelConversations:
            return GospelStepLayoutType.PositiveCounter;
    }
}

