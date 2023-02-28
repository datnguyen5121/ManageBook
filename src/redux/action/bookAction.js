export const SEARCH = "SEARCH";

export const doSearch = (data) => {
  return {
    type: SEARCH,
    payload: data,
  };
};
