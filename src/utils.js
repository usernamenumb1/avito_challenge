import formatDistanceToNow from "date-fns/formatDistanceToNow";

export const routes = {
  mainPage: () => "/",
  newsItemPage: (id) => `/news/${id}`,
};

export const constants = {
  BASE_URL: "https://hacker-news.firebaseio.com/v0/",
  MAX_COUNT: 100,
};

export const normalizeData = (data) =>
  data.map((item) => {
    if (!item.data) {
      return {
        id: "some id",
        by: "unknown",
        title: "Some title",
        time: "some time",
        score: "idk",
      };
    }
    const timeAgo = formatDistanceToNow(new Date(item.data.time * 1000), {
      includeSeconds: true,
    });
    item.data.time = timeAgo;
    return item.data;
  });

export const find = (arr, id) => arr.find((item) => item.id === id);

export const isDifferent = (arr1, arr2) =>
  arr1.filter((item) => !arr2.includes(item)).length > 0;
