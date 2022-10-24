import type from "./types";
import { find } from "../utils";

const initialStore = {
  loadingStatus: "",
  currentStorie: null,
  newsIds: [],
  news: [],
};

export default (store = initialStore, action) => {
  switch (action.type) {
    case type.ADD_NEWS_IDS:
      return { ...store, newsIds: action.payload };
    case type.ADD_NEWS:
      return { ...store, news: [...action.payload] };
    case type.DATA_LOADING:
      return { ...store, loadingStatus: type.DATA_LOADING };
    case type.DATA_LOADED:
      return { ...store, loadingStatus: type.DATA_LOADED };
    case type.ADD_CURRENT_STORIE:
      return { ...store, currentStorie: find(store.news, action.payload) };
    default:
      return store;
  }
};
