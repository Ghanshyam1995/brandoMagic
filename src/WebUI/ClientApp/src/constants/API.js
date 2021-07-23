export const API_URL = {
    LOGIN_API: {
        URL: '/api/account/authenticate',
        IsAuthorizedURL: false,
        Type : 'GET'
    },

    SIGNUP_API: {
        URL: '/api/account/create',
        IsAuthorizedURL: false,
        Type: 'GET'
    },

    POST_API: {
        URL: '/api/brand/GetBrandPosts',
        IsAuthorizedURL: true,
        Type: 'GET'
    },

    POST_LIKE_DISLIKE: {
        URL: '/api/post/PostLikeDislike',
        IsAuthorizedURL: true,
        Type: 'POST',
        ShowResponseMsg: false
    },

    POST_COMMENT: {
        URL: '/api/post/Postcomment',
        IsAuthorizedURL: true,
        Type: 'POST',
        ShowResponseMsg: false
    },

    BRAND_CONTACT: {
        URL: '/api/brand/getcontacts',
        IsAuthorizedURL: true,
        Type: 'GET',
        ShowResponseMsg: false
    },

    POST_TICKET: {
        URL: '/api/brand/RaiseIssue',
        IsAuthorizedURL: true,
        Type: 'POST',
        ShowResponseMsg: true
    },

    GET_CONTEST: {
        URL: '/api/brand/GetContest',
        IsAuthorizedURL: true,
        Type: 'GET'
    },

    GET_DISCUSSION: {
        URL: '/api/brand/GetDiscussion?pageIndex=1&pageSize=10',
        IsAuthorizedURL: true,
        Type: 'GET'
    }
}