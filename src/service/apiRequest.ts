const apiRequest = async (url: string, search: string, page: string = '1') => {
  const response = await fetch(`${url}/people/?search=${search}&page=${page}`);
  const data = await response.json();
  return data;
};
export default apiRequest;
