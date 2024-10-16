// PersonCrud.tsx
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { deletePerson } from '@/store/personSlice';
import CreatePersonModal from '@/components/modals/CreatePersonModal';
import UpdatePersonModal from '@/components/modals/UpdatePersonModal';
import { useState } from 'react';

const PersonCrud = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [personToUpdate, setPersonToUpdate] = useState(null);

  // Pega o estado de `persons` do Redux
  const persons = useSelector((state: RootState) => state.persons?.persons || []);
  const dispatch = useDispatch();

  const handleOpenUpdateModal = (person) => {
    setPersonToUpdate(person);
    setUpdateModalOpen(true);
  };

  const handleDelete = (id) => {
    // Remove a pessoa com o ID correspondente
    dispatch(deletePerson(id));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">CRUD de Pessoas</h1>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Adicionar Pessoa
        </button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nome</th>
            <th className="py-2">Email</th>
            <th className="py-2">Endereço</th>
            <th className="py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {persons.length > 0 ? (
            persons.map((person) => (
              <tr key={person.id}>
                <td className="border px-4 py-2">{person.name}</td>
                <td className="border px-4 py-2">{person.email}</td>
                <td className="border px-4 py-2">{person.address}</td>
                <td className="border px-4 py-2 flex justify-around">
                  <button
                    onClick={() => handleOpenUpdateModal(person)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(person.id)} // Agora o ID correto é passado
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Nenhuma pessoa encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modais de criação e atualização */}
      <CreatePersonModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      {personToUpdate && (
        <UpdatePersonModal
          isOpen={isUpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          person={personToUpdate}
        />
      )}
    </div>
  );
};

export default PersonCrud;
