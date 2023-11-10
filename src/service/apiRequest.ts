const apiRequest = async (url: string, search: string, page: string = '1') => {
  const response = await fetch(`${url}/people/?search=${search}&page=${page}`);
  const data = await response.json().catch();
  return data;
};
export default apiRequest;
