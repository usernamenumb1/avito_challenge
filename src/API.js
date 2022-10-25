import axios from "axios";
import { constants } from "./utils";

export const fetchNewsIds = () =>
  axios.get(`${constants.BASE_URL}newstories.json?print=pretty`);

export const fetchItem = (itemId) =>
  axios.get(`${constants.BASE_URL}item/${itemId}.json?print=pretty`);

export const arrayOfFetchItemPromises = (arr) => arr.map(fetchItem);

export const fetchComments = (dispatch, getComments) => ({ data }) => {
  if (!data.kids) return Promise.reject(new Error("no kids"));
  const { kids } = data;
  return Promise.all(arrayOfFetchItemPromises(kids)).then((data1) =>
    data1.map((item) => {
      if (item.data.kids) dispatch(getComments(item.data.id));
      return item.data;
    })
  );
};
