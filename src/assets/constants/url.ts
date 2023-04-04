export const BACKEND_URL = "http://localhost:8000/";

// AUTHENTICATION

export const USER_EXISTS = "user/exist/";
export const USER_LOGIN = "user/login/";
export const USER_REGISTER = "user/register/";
export const USER_LOGOUT = "user/logout/";
export const USER_LOGOUT_ALL = "user/logoutall/";

// PROFILE

export const GET_ALL_USERS = "user/all/";
export const CREATE_USER_PROFILE = "user/createprofile/";
export const GET_MY_PROFILE = "user/myprofile/";  //token required
export const GET_USER_DATA = "user/";
export const GET_USER_DATA_SECONDARY = "userprofile/";
export const GET_MY_USERNAME = "user/info" // token required
// POST

export const GET_MY_POSTS = "post/myposts/";    //token required
export const GET_ALL_POSTS = "post/all/";
export const GET_POST_DATA = "post/userid/";
export const CREATE_POST = "post/newpost/";
export const EDIT_POST = "post/edit/";
export const GET_SELECTED_POST = "post/id/";
export const DELETE_POST = "post/delete/";
export const LIKE_POST = "post/like/";
export const USER_LIKED_POST = "user/getlikedposts/"; //token required
export const POST_LIKED_BOOLEAN = "post/userlike/"; //token required
export const GET_POST_STACK_NAMES = "post/getstacknames";


//COLLABORATE

export const SEND_EMAIL = "email/id";

