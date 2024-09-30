import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    stories: [],
    myStoryChapters: [],
    GodsStoryChapters: []
};

export function storiesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { stories, myStoryChapters, GodsStoryChapters } = action.payload;
            return update(state, {
                $set: {
                    stories: stories || [],
                    myStoryChapters: myStoryChapters || [],
                    GodsStoryChapters: GodsStoryChapters || []
                }
            });
        case Action.AddStory:
            return update(state, {
                stories: { $push: [action.payload] }
            });
        case Action.AddMyStoryChapter:
            return update(state, {
                myStoryChapters: { $push: [action.payload] }
            });
        default:
            return state;
    }
};