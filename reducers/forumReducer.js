import { ToastAndroid } from 'react-native';
import forumService from '../services/forumService';

const initialState = {
  answered: [],
  pending: [],
  tagFilter: '',
  flagged: [],
  articles: [],
  loading: false,
  heartedByUser: [],
  activePost: undefined
};
const forumReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_QUESTION':
    return state;
  case 'INIT_FORUM_PENDING':
    return { ...state, pending: action.data };
  case 'INIT_FORUM_ANSWERED':
    return { ...state, answered: action.data };
  case 'GET_ARTICLES':
      return {...state, articles: action.data}
  case 'LOADING': {
    return {...state, loading: true}
  }
  case 'CANCEL_LOADING': {
    return {...state, loading: false}
  }
  case 'ACTIVE_POST': {
    return {...state, activePost: action.data}
  }
  case 'HEART': {
    const id = action.data.postId;
    const questionToChange = state.activePost
    const changedQuestion = { ...questionToChange, likes: questionToChange.likes + 1 };
    return { ...state, answered: state.answered.map((q) => (q._id === id ? changedQuestion : q)), heartedByUser: action.data.userHeartArray, activePost: {...changedQuestion} };
  }
  case 'UP_VIEW': {
    const id = action.data._id;
    const articleToChange = state.articles.find((q) => q._id === id);
    const changedArticle = { ...articleToChange, views: articleToChange.views + 1 };
    return { ...state, articles: state.articles.map((q) => (q._id === id ? changedArticle : q))};
  }
  case 'POST_ANSWER': {
    const answerId = action.data._id;
    const objectToModify = state.pending.find((s) => s._id === answerId);
    const changedToAnswered = { ...objectToModify, isAnswered: true, answer: action.data.answer };
    return { ...state, pending: state.pending.map((s) => (s._id === answerId ? changedToAnswered : s)) };
  }

  case 'EDIT_ANSWER': {
    const editedId = action.data._id;
    const modifiedAnswer = state.answered.find((p) => p.answer._id === editedId);
    const withNewAnswer = { ...modifiedAnswer, answer: action.data };
    return { ...state, answered: state.answered.map((a) => (a.answer._id !== editedId ? a : withNewAnswer)) };
  }

  case 'ADD_COMMENT': {
    const commentedOnId = action.data._id;
    const postToChange = state.activePost;
    const newPost = { ...postToChange, comments: [...postToChange.comments, action.data.comments[action.data.comments.length - 1]] };
    return { ...state, answered: state.answered.map((s) => (s._id === commentedOnId ? newPost : s)), activePost: {...newPost} };
  }

  case 'ADD_REPLY': {
    const postWithCommentToEdit = state.activePost
    const modifiedPost = {...postWithCommentToEdit, comments: postWithCommentToEdit.comments.filter(x => x._id !== action.data.commentObj._id).concat(action.data.commentObj).sort((a, b) => new Date(b.date) - new Date(a.date))}
    return { ...state, answered: state.answered.map((s) => (s._id === action.data.postId ? modifiedPost : s)), activePost: {...modifiedPost} };
  }
  case 'DELETE_QUESTION':
    return { ...state, pending: state.pending.filter((q) => q._id !== action.data) };
  case 'DELETE_COMMENT':
    return { ...state, flagged: state.flagged.filter((c) => c._id !== action.data) };
  case 'UNFLAG_COMMENT':
    return { ...state, flagged: state.flagged.filter((c) => c._id !== action.data) };
  case 'SET_TAG_FILTER':
    return { ...state, tagFilter: action.data };
  case 'FLAG_COMMENT':
    return state;
  case 'GET_FLAGGED':
    return { ...state, flagged: action.data };
  default: return state;
  }
};
export const loading = () => ({
  type: 'LOADING'
});
export const cancelLoading = () => ({
  type: 'CANCEL_LOADING'
})
export const activePost = (post) => ({
  type: 'ACTIVE_POST',
  data: post
})
export const heart = (postId) => async (dispatch) => {
  const userHeartArray = await forumService.heartUp(postId);
  dispatch({
    type: 'HEART',
    data: {postId, userHeartArray}
  });
};
export const upView = (articleId) => async (dispatch) => {
  const newArticle = await forumService.incView(articleId);
  dispatch({
    type: 'UP_VIEW',
    data: newArticle
  });
};
export const answerQuestion = (answer) => async (dispatch) => {
  try {
    await forumService.update(answer);
    dispatch({
      type: 'POST_ANSWER',
      data: answer,
    });
    ToastAndroid.show('Question answered', ToastAndroid.SHORT);
  } catch (error) {
    ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  }
};
export const editAnswer = (answer) => async (dispatch) => {
  try {
    await forumService.updateEditedAnswer(answer);
    dispatch({
      type: 'EDIT_ANSWER',
      data: answer,
    });
  } catch (error) {
    console.log(error);
  }
};
export const addComment = (comment, postToModify) => async (dispatch) => {
  try {
    dispatch(loading())
    await forumService.addComment(comment, postToModify).then((res) => {
      dispatch({
        type: 'ADD_COMMENT',
        data: res,
      });
    });
    dispatch(cancelLoading())
  } catch (error) {
    console.log(error);
    ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.SHORT);
  }
};
export const addReply = (reply, commentObject, postId) => async (dispatch) => {
  const id = postId
  try {
    dispatch(loading())
    await forumService.addReply(reply, commentObject).then((res) => {
      dispatch({
        type: 'ADD_REPLY',
        data: {commentObj: res, postId: id}
      });
    });
    dispatch(cancelLoading())
  } catch (error) {
    console.log(error);
    ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.SHORT);
  }
};
export const addQuestion = (data) => async (dispatch) => {
  try {
    const newQuestion = await forumService.create(data);
    dispatch({
      type: 'NEW_QUESTION',
      data: newQuestion,
    });
    ToastAndroid.show('ส่งคำถามแล้ว', ToastAndroid.LONG);
  } catch (error) {
    ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.LONG);
  }
};
export const deleteQuestion = (_id) => async (dispatch) => {
  await forumService.remove(_id);
  dispatch({
    type: 'DELETE_QUESTION',
    data: _id,
  });
  ToastAndroid.show('Question deleted', ToastAndroid.SHORT);
};
export const deleteComment = (_id) => async (dispatch) => {
  await forumService.removeComment(_id);
  dispatch({
    type: 'DELETE_COMMENT',
    data: _id,
  });
};
export const removeCommentFlag = (_id) => async (dispatch) => {
  await forumService.unflag(_id);
  dispatch({
    type: 'UNFLAG_COMMENT',
    data: _id,
  });
};
export const initializeForumPending = () => async (dispatch) => {
  const questions = await forumService.getPending();
  dispatch({
    type: 'INIT_FORUM_PENDING',
    data: questions,
  });
};
export const getFlaggedComments = () => async (dispatch) => {
  const flagged = await forumService.getFlagged();
  dispatch({
    type: 'GET_FLAGGED',
    data: flagged,
  });
};
export const initializeForumAnswered = () => async (dispatch) => {
  const answered = await forumService.getAnswered();
  dispatch({
    type: 'INIT_FORUM_ANSWERED',
    data: answered,
  });
};
export const getAllArticles = () => {
  return async dispatch => {
    const articles = await forumService.getArticles()
    dispatch({
      type: 'GET_ARTICLES',
      data: articles
    })
  }
}
export const setTagFilter = (tag) => ({
  type: 'SET_TAG_FILTER',
  data: tag,
});
export const setFlaggedComment = (comment) => async (dispatch) => {
  const flaggedPost = await forumService.flagComment(comment);
  dispatch({
    type: 'FLAG_COMMENT',
    data: flaggedPost,
  });
  ToastAndroid.show('ขอบคุณที่ช่วยรายงานปัญหาให้แอดมินทราบค่ะ', ToastAndroid.SHORT);
};

export default forumReducer;
