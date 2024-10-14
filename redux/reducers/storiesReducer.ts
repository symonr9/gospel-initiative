import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    tagFilters: [],
    typeFilters: [],
    stories: [],
    myStoryChapters: [],
    GodsStoryChapters: [],
    editingChapterId: null
};

export function storiesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { stories, myStoryChapters, GodsStoryChapters } = action.payload;
            return update(state, {
                $set: {
                    stories: stories || [],
                    myStoryChapters: myStoryChapters || [],
                    GodsStoryChapters: GodsStoryChapters || [],
                    tagFilters: state.tagFilters,
                    typeFilters: state.typeFilters,
                    editingChapterId: null
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
        case Action.SetEditingChapterId:
            return update(state, {
                editingChapterId: { $set: action.payload }
            });
        case Action.UpdateChaptersFilter:
            const { tagFilters, typeFilters } = action.payload;
            return update(state, {
                tagFilters: {
                    $set: tagFilters || []
                },
                typeFilters: {
                    $set: typeFilters || []
                },
            });
        default:
            return state;
    }
};