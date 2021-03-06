import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  ORDER,
  UNORDER,
  DELETE_POST,
  POST_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  SET_POST,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  POST_TEXT,
  EDIT_QUANTITY,
  SUBMIT_ORDER,
  SALE,
} from "../types";
import axios from "axios";

//Get all posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};
export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${postId}`)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a new post
export const postPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/post", newPost)
    .then((res) => {
      dispatch({
        type: POST_POST,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .then(() => {
      dispatch(getPosts());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//Like a post
export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

//Unlike a post
export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

//Order
export const order = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/order`)
    .then((res) => {
      dispatch({
        type: ORDER,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

//Unorder
export const unorder = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unorder`)
    .then((res) => {
      dispatch({
        type: UNORDER,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

// Edit Quantity
export const quantity = (postId, quantityData) => (dispatch) => {
  axios
    .post(`/post/${postId}/editQuantity`, quantityData)
    .then((res) => {
      dispatch({
        type: EDIT_QUANTITY,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
// Submit a caption
export const postText = (postId, postTextData) => (dispatch) => {
  axios
    .post(`/post/${postId}/addPostText`, postTextData)
    .then((res) => {
      dispatch({
        type: POST_TEXT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
// Submit a comment
export const submitComment = (postId, commentData) => (dispatch) => {
  axios
    .post(`/post/${postId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data.posts,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS,
        payload: null,
      });
    });
};

// Submit order
export const submitOrder = (postId, newOrder) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/post/${postId}/submitorder`, newOrder)
    .then((res) => {
      dispatch({
        type: SUBMIT_ORDER,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Get user orders
export const getOrderData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/order/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SUBMIT_ORDER,
        payload: res.data.orders,
      });
    })
    .catch(() => {
      dispatch({
        type: SUBMIT_ORDER,
        payload: null,
      });
    });
};

//Get user sales
export const getSaleData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/sale/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SALE,
        payload: res.data.sales,
      });
    })
    .catch(() => {
      dispatch({
        type: SALE,
        payload: null,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
