const apiRequestCharacter = async (url: string, id: string) => {
  const response = await fetch(`${url}/people/${id}`);
  const data = await response.json();
  return data;
};
export default apiRequestCharacter;
