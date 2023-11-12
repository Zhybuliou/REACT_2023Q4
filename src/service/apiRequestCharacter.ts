const apiRequestCharacter = async (url: string, id: string) => {
  const response = await fetch(`${url}/people/${id}`);
  const data = await response.json().catch();
  return data;
};
export default apiRequestCharacter;
