import { Action, ActionPackage } from "../actions";
import update from 'immutability-helper';

const initialState = {
    tagFilters: [],
    typeFilters: [],
    stories: [],
    myStoryChapters: [],
    GodsStoryChapters: [],
    editingChapterId: null,
    addingStory: false,
};

export function storiesReducer(state = initialState, action: ActionPackage) {
    switch (action.type) {
        case Action.LoadServerData:
            const { stories, myStoryChapters, GodsStoryChapters } = action.payload;
            return update(state, {
                $set: {
                    stories: stories || state.stories,
                    myStoryChapters: myStoryChapters || state.myStoryChapters,
                    GodsStoryChapters: GodsStoryChapters || state.GodsStoryChapters,
                    tagFilters: state.tagFilters,
                    typeFilters: state.typeFilters,
                    editingChapterId: state.editingChapterId,
                    addingStory: state.addingStory,
                }
            });
        case Action.SetEditingChapterId:
            return update(state, {
                editingChapterId: { $set: action.payload }
            });
        case Action.SetAddingStory:
            return update(state, {
                addingStory: { $set: action.payload }
            });
        case Action.UpdateChaptersFilter:
            const { tagFilters, typeFilters } = action.payload;
            return update(state, {
                tagFilters: {
                    $set: tagFilters || state.tagFilters
                },
                typeFilters: {
                    $set: typeFilters || state.typeFilters
                },
            });
        case Action.ClearAllData:
            return initialState;
        default:
            return state;
    }
};