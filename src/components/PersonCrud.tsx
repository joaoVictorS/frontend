import { useState, useMemo, useEffect } from 'react';
import { personService } from '@/services/personService';
import { personActions } from '@/services/personActions';
import PersonModal from '@/components/modals/PersonModal';
import EmptyState from '@/components/EmptyState';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useReactTable, getCoreRowModel, getPaginationRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonCrud = () => {
  const [persons, setPersons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para travar botões

  // Carregar dados do Local Storage ao inicializar o componente
  useEffect(() => {
    const storedPersons = personService.getPersons();
    setPersons(storedPersons);
  }, []);

  const handleOpenModal = (person = null) => {
    setEditingPerson(person);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPerson(null);
  };

  const handleAddOrUpdatePerson = (personData) => {
    const updatedPersons = personActions.addOrUpdatePerson(persons, personData, editingPerson);
    setPersons(updatedPersons);
    personService.savePersons(updatedPersons);
    toast.success(editingPerson ? 'Pessoa atualizada com sucesso!' : 'Pessoa criada com sucesso!');
    handleCloseModal();
  };

  const handleDeletePerson = (id) => {
    const updatedPersons = personActions.deletePerson(persons, id);
    setPersons(updatedPersons);
    personService.savePersons(updatedPersons);
    toast.success('Pessoa excluída com sucesso!');
  };

  // Definição das colunas da tabela
  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      header: '',
      accessorKey: 'edit',
      cell: ({ row }) => (
        <button
          className={`text-blue-500 mr-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !loading && handleOpenModal(row.original)}
          disabled={loading}
        >
          <FaPen />
        </button>
      ),
      size: 30,
    },
    {
      header: 'Nome',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'CEP',
      accessorKey: 'cep',
    },
    {
      header: 'Rua',
      accessorKey: 'rua',
    },
    {
      header: 'Número',
      accessorKey: 'numero',
    },
    {
      header: 'Bairro',
      accessorKey: 'bairro',
    },
    {
      header: 'Cidade',
      accessorKey: 'cidade',
    },
    {
      header: 'Estado',
      accessorKey: 'estado',
    },
    {
      header: '',
      accessorKey: 'delete',
      cell: ({ row }) => (
        <button
          className={`text-red-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !loading && handleDeletePerson(row.original.id)}
          disabled={loading}
        >
          <FaTrash />
        </button>
      ),
      size: 30,
    },
  ], [persons, loading]);

  const data = useMemo(() => persons, [persons]);

  // Instância da tabela usando useReactTable
  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  const { getHeaderGroups, getRowModel, nextPage, previousPage, setPageSize, getState, getCanNextPage, getCanPreviousPage } = tableInstance;
  const { pagination } = getState();

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Pessoas</h1>
      <button
        className={`bg-blue-500 text-white py-2 px-4 rounded mb-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !loading && handleOpenModal()}
        disabled={loading}
      >
        Adicionar Pessoa
      </button>

      {/* Verificando se há pessoas cadastradas */}
      {persons.length === 0 ? (
        <EmptyState /> // Mostra o componente de estado vazio
      ) : (
        <>
          {/* Renderizando a tabela */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                {getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th className="border px-4 py-2" key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td className="border px-4 py-2" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="flex justify-between items-center py-3">
            <button
              className={`bg-gray-300 py-1 px-3 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !loading && previousPage()}
              disabled={!getCanPreviousPage() || loading}
            >
              Anterior
            </button>
            <span>
              Página <strong>{pagination.pageIndex + 1}</strong> de{' '}
              {Math.ceil(persons.length / pagination.pageSize)}
            </span>
            <button
              className={`bg-gray-300 py-1 px-3 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !loading && nextPage()}
              disabled={!getCanNextPage() || loading}
            >
              Próxima
            </button>
            <select
              value={pagination.pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="ml-4 border py-1 px-2 rounded"
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  Mostrar {size}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

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
