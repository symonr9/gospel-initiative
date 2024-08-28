import { AppIcon, PromptType } from "@/enums/enums";

interface IPrompt {
    id: string;
    userId: string;
    question: string;
    response: string;
    type: PromptType;
}

export default class Prompt implements IPrompt {
    id: string;
    userId: string;
    question: string;
    response: string;
    type: PromptType;
    
    constructor(id: string, userId: string, question: string,
        response: string, type: PromptType
    ) {
        this.id = id;
        this.userId = userId;
        this.question = question;
        this.response = response;
        this.type = type;
    }

}