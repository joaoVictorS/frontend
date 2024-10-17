import { useState, useEffect } from 'react';
import { fetchAddressByCep } from '@/services/cepService'; // Importe o serviço de CEP
import { toast } from 'react-toastify';

const PersonModal = ({ person, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);

  // Preenche os campos ao editar uma pessoa
  useEffect(() => {
    if (person) {
      setName(person.name);
      setEmail(person.email);
      setCep(person.cep || '');
      setRua(person.rua || '');
      setBairro(person.bairro || '');
      setNumero(person.numero || '');
      setCidade(person.cidade || '');
      setEstado(person.estado || '');
    } else {
      // Limpa os campos ao adicionar nova pessoa
      setName('');
      setEmail('');
      setCep('');
      setRua('');
      setBairro('');
      setNumero('');
      setCidade('');
      setEstado('');
    }
  }, [person]);

  // Função para buscar o endereço pelo CEP
  const handleCepChange = async (e) => {
    const cepValue = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    setCep(cepValue);

    if (cepValue.length === 8) {
      try {
        setLoadingCep(true);
        const address = await fetchAddressByCep(cepValue);

        if (address.erro) {
          toast.error('CEP inválido!', {
            position: 'top-right',
            autoClose: 3000,
            theme: 'colored',
          });
          return;
        }

        // Atualiza os campos de endereço com os dados retornados
        setRua(address.logradouro || '');
        setBairro(address.bairro || '');
        setCidade(address.localidade || '');
        setEstado(address.uf || '');
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        toast.error('Erro ao buscar o CEP!', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: person?.id || Date.now(),
      name,
      email,
      cep,
      rua,
      bairro,
      numero,
      cidade,
      estado,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">
          {person ? 'Editar Pessoa' : 'Adicionar Pessoa'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {/* Campo CEP */}
          <div className="mb-4">
            <label className="block text-gray-700">CEP</label>
            <input
              type="text"
              value={cep}
              onChange={handleCepChange}
              className="w-full border px-3 py-2 rounded"
              maxLength={8}
              required
            />
            {loadingCep && <p className="text-sm text-blue-500">Buscando CEP...</p>}
          </div>

          {/* Campos de endereço preenchidos automaticamente */}
          <div className="mb-4">
            <label className="block text-gray-700">Rua</label>
            <input
              type="text"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bairro</label>
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Número</label>
              <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Cidade</label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Estado</label>
              <input
                type="text"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {person ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonModal;
