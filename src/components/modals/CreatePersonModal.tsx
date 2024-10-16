import { useState } from 'react';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useDispatch } from 'react-redux';
import { addPerson } from '@/store/personSlice';

interface CreatePersonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePersonModal = ({ isOpen, onClose }: CreatePersonModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addPerson({ name, email, address }));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Adicionar Pessoa</h2>
      <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} />
      <Button onClick={handleSubmit}>Salvar</Button>
    </Modal>
  );
};

export default CreatePersonModal;
