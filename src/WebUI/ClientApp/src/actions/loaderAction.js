import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const loaderActions = {
    showLoader: () => dispatch => dispatch(showLoading()),

    hideLoader: () => dispatch => dispatch(hideLoading())
}