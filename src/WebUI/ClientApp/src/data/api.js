import ps from '../store';
import * as noti from "../utils/notification";
//import { loaderActions } from "../actions/loaderAction";
let bmState = null;

let storeSubscription = ps.store.subscribe(function () {
    bmState = ps.store.getState();
});

export const loadData = async (urlInfo, urlParams, data) => {
    
    var opt = {
        method: urlInfo.Type,
        headers: {
            "content-type": 'application/json'
        }
    };

    if (urlInfo.IsAuthorizedURL) opt.headers.Authorization = `Bearer ${bmState.user.token}`;
    if (urlInfo.Type == 'POST' && data) opt.body = JSON.stringify(data);
    //loaderActions.showLoader();
    const response = await fetch(urlInfo.URL + `${urlParams ? '?' + urlParams : ''}`, opt).catch((err) => { noti.error('Something went wrong. Please try again!') });
    //loaderActions.hideLoader();
    if (response.status == 200) {
        return response.json();
    }
    if (response.status == 401) noti.error('You do not have permission');
}