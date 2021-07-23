export default (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_CATEGORIES':
            return action.payload;
        case 'TOGGLE_CATEGORY_SELECTION':
            var index = state.findIndex(x => x.id == action.payload);
            return Object.assign([], state, { [index]: { ...state[index], isSelected: !state[index].isSelected } });
        default:
            return state;
    }
}