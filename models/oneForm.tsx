interface IOneForm {
    name: string;
}

export default class OneForm implements IOneForm {
    name: string;

    constructor(name: string
    ) {
        this.name = name;
    }

}