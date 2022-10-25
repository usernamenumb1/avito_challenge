import type from "./types";
import { constants, normalizeData } from "../utils";
import { fetchNewsIds, fetchItem, arrayOfFetchItemPromises, fetchComments } from "../API";

export const setCurrentId = (id = null) => ({
  type: type.ADD_CURRENT_STORIE,
  payload: id,
});

export const deleteComments = () => ({ type: type.DELETE_COMENTS });

export const getNewsIds = () => (dispatch) => {
  fetchNewsIds()
    .then((response) => response.data.slice(0, constants.MAX_COUNT))
    .then((data) => {
      dispatch({ type: type.ADD_NEWS_IDS, payload: data });
    })
    .catch((err) => console.log(err));
};
export const getNews = (arr) => (dispatch) => {
  dispatch({ type: type.DATA_LOADING });
  Promise
    .all(arrayOfFetchItemPromises(arr))
    .then((response) => {
      const data = normalizeData(response);
      dispatch({ type: type.ADD_NEWS, payload: data });
      dispatch({ type: type.DATA_LOADED });
    })
    .catch((err) => console.log(err));
};

export const getComments = (id) => (dispatch) => {
  fetchItem(id)
    .then(fetchComments(dispatch, getComments))
    .then((data2) => dispatch({ type: type.ADD_COMENTS, payload: data2 }))
    .catch((err) => console.log(err));
};
