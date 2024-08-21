import { AppIcon } from "@/enums/enums";

interface IError {
    title: string;
    details: string | undefined;
}

export default class Error implements IError {
    title: string;
    details: string | undefined;

    constructor(title: string, details: string | undefined
    ) {
        this.title = title;
        this.details = details;
    }

}