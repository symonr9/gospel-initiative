
export enum Action {
    AddUser,
    AddPrayer
};

export class ActionPackage {
    type: Action;
    payload: Object;

    constructor(type: Action, payload: Object) {
        this.type = type;
        this.payload = payload;
    }
}

export const addUser = (item: object) => ({
  type: Action.AddUser,
  payload: item,
});

export const addPrayer = (item: object) => ({
    type: Action.AddUser,
    payload: item,
  });
