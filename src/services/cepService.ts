export const fetchAddressByCep = async (cep: string) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro na requisição (fetch):", error);
    throw error;
  }
};
