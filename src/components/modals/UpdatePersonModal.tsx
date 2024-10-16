import { useState } from 'react';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useDispatch } from 'react-redux';
import { updatePerson } from '@/store/personSlice';

interface UpdatePersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: { id: string; name: string; email: string; address: string };
}

const UpdatePersonModal = ({ isOpen, onClose, person }: UpdatePersonModalProps) => {
  const [name, setName] = useState(person.name);
  const [email, setEmail] = useState(person.email);
  const [address, setAddress] = useState(person.address);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updatePerson({ id: person.id, name, email, address }));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Atualizar Pessoa</h2>
      <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} />
      <Button onClick={handleUpdate}>Atualizar</Button>
    </Modal>
  );
};

export default UpdatePersonModal;
