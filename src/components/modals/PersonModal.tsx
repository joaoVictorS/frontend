import { useState, useEffect } from 'react';

const PersonModal = ({ person, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Reseta os campos quando o modal é aberto para criação
  useEffect(() => {
    if (person) {
      setName(person.name);
      setEmail(person.email);
    } else {
      // Garante que os campos ficam vazios ao adicionar nova pessoa
      setName('');
      setEmail('');
    }
  }, [person]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: person?.id || Date.now(), name, email });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">{person ? 'Editar Pessoa' : 'Adicionar Pessoa'}</h2>
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
