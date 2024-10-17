export const personService = {
    getPersons: () => {
      if (typeof window !== 'undefined') {
        const storedPersons = localStorage.getItem('persons');
        return storedPersons ? JSON.parse(storedPersons) : [];
      }
      return [];
    },
  
    savePersons: (persons: any[]) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('persons', JSON.stringify(persons));
      }
    }
  };
  