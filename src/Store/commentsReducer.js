import type from "./types";

const initialState = {
  currentStorieId: null,
  storieComments: [],
};
export default (store = initialState, action) => {
  switch (action.type) {
    case type.ADD_CURRENT_STORIE:
      return {
        ...store,
        currentStorieId: action.payload,
      };
    case type.ADD_COMENTS:
      return {
        ...store,
        storieComments: [...store.storieComments, ...action.payload],
      };
    case type.REFRESH_COMENTS:
      return {
        ...store,
        storieComments: action.payload,
      };
    case type.DELETE_COMENTS:
      return {
        ...store,
        storieComments: [],
      };
    default:
      return store;
  }
};
