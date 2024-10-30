import { AppIcon } from "@/enums/enums";

interface IAppError {
    title: string;
    details: string | undefined;
}

export default class AppError implements IAppError {
    title: string;
    details: string | undefined;

    constructor(title: string, details?: string | undefined
    ) {
        this.title = title;
        this.details = details;
    }

}