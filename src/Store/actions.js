import axios from "axios";
import type from "./types";
import { constants, normalizeData } from "../utils";

export const setCurrentId = (id = null) => ({
  type: type.ADD_CURRENT_STORIE,
  payload: id,
});

export const deleteComments = () => ({ type: type.DELETE_COMENTS });

export const getNewsIds = () => (dispatch) => {
  axios
    .get(`${constants.BASE_URL}newstories.json?print=pretty`)
    .then((response) => response.data.slice(0, constants.MAX_COUNT))
    .then((data) => {
      dispatch({ type: type.ADD_NEWS_IDS, payload: data });
    });
};
export const getNews = (arr) => (dispatch) => {
  dispatch({ type: type.DATA_LOADING });
  const promisedArray = arr.map((item) =>
    axios.get(`${constants.BASE_URL}item/${item}.json?print=pretty`)
  );
  Promise.all(promisedArray).then((response) => {
    const data = normalizeData(response);
    dispatch({ type: type.ADD_NEWS, payload: data });
    dispatch({ type: type.DATA_LOADED });
  });
};

export const refreshComments = (id) => (dispatch) => {
  axios
    .get(`${constants.BASE_URL}item/${id}.json?print=pretty`)
    .then(({ data }) => {
      if (!data.kids) return Promise.reject(new Error("no kids"));
      const { kids } = data;
      const promisedArray = kids.map((item) =>
        axios.get(`${constants.BASE_URL}item/${item}.json?print=pretty`)
      );
      return Promise.all(promisedArray)
        .then((data1) =>
          data1.map((item) => {
            if (item.data.kids) dispatch(refreshComments(item.data.id));
            return item.data;
          })
        )
        .then((data2) => dispatch({ type: type.ADD_COMENTS, payload: data2 }));
    })
    .catch((err) => console.log(err));
};

export const getComments = (arr) => (dispatch) => {
  const promisedArray = arr.map((item) =>
    axios.get(`${constants.BASE_URL}item/${item}.json?print=pretty`)
  );
  Promise.all(promisedArray)
    .then((data) =>
      data.map((item) => {
        if (item.data.kids) dispatch(getComments(item.data.kids));
        return item.data;
      })
    )
    .then((data) => dispatch({ type: type.ADD_COMENTS, payload: data }));
};
