import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    stories: [],
    storyChapters: [],
};

export function storiesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { stories, storyChapters } = action.payload;
            return update(state, {
                $set: {
                    stories: stories || [],
                    storyChapters: storyChapters || []
                }
            });
        case Action.AddStory:
            return update(state, {
                stories: { $push: [action.payload] }
            });
        case Action.AddStoryChapter:
            return update(state, {
                storyChapters: { $push: [action.payload] }
            });
        default:
            return state;
    }
};