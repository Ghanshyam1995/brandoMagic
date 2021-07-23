export const brandActions = {
    getBrands: () => dispatch => {
        fetch('/api/home/getbrands', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(d => {
            return dispatch({ type: 'UPDATE_BRANDS', payload: d })
        })
    },

    selectDeselectBrand: (id) => dispatch => dispatch({ type: 'TOGGLE_BRAND_SELECTION', payload: id })
}