export const personActions = {
    addOrUpdatePerson: (persons, personData, editingPerson) => {
      if (editingPerson) {
        return persons.map((p) => (p.id === editingPerson.id ? personData : p));
      } else {
        return [...persons, { ...personData, id: Date.now() }];
      }
    },
  
    deletePerson: (persons, id) => {
      return persons.filter((p) => p.id !== id);
    }
  };
  