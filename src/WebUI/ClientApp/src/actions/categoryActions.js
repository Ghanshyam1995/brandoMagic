export const categoryActions = {
    getCategories: () => dispatch => {
        fetch('/api/home/getcategories', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(categories => {
            return dispatch({ type: 'UPDATE_CATEGORIES', payload: categories });
        });
    },

    selectDeselectCategory: (id) => dispatch => dispatch({ type: 'TOGGLE_CATEGORY_SELECTION', payload: id })
}