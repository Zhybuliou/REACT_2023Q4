const apiRequest = async (url: string, search: string) => {
  const response = await fetch(`${url}/people/?search=${search}`);
  const data = await response.json();
  return data;
};
export default apiRequest;
