export default (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_BRANDS':
            return action.payload;
        case 'TOGGLE_BRAND_SELECTION':
            var index = state.findIndex(x => x.id == action.payload);
            return Object.assign([], state, { [index]: { ...state[index], isSelected: !state[index].isSelected } });
        default:
            return state;
    }
}