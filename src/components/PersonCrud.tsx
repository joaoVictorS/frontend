import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addPerson, updatePerson, deletePerson } from '@/store/personSlice';
import PersonModal from '@/components/modals/PersonModal'; // Reutilizando o mesmo modal
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonCrud = () => {
  const persons = useSelector((state: RootState) => state.persons.persons);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null); // Para armazenar a pessoa que está sendo editada

  const handleOpenModal = (person = null) => {
    setEditingPerson(person);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPerson(null);
  };

  const handleAddOrUpdatePerson = (personData) => {
    if (editingPerson) {
      dispatch(updatePerson(personData));
      toast.success('Pessoa atualizada com sucesso!');
    } else {
      dispatch(addPerson(personData));
      toast.success('Pessoa criada com sucesso!');
    }
    handleCloseModal();
  };

  const handleDeletePerson = (id) => {
    dispatch(deletePerson(id));
    toast.success('Pessoa excluída com sucesso!');
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Pessoas</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={() => handleOpenModal()}
      >
        Adicionar Pessoa
      </button>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td className="border px-4 py-2">{person.name}</td>
              <td className="border px-4 py-2">{person.email}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                  onClick={() => handleOpenModal(person)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded"
                  onClick={() => handleDeletePerson(person.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <PersonModal
          person={editingPerson}
          onClose={handleCloseModal}
          onSave={handleAddOrUpdatePerson}
        />
      )}
    </div>
  );
};

export default PersonCrud;
