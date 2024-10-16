// personSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Person {
  id: string;
  name: string;
  email: string;
  address: string;
}

interface PersonState {
  persons: Person[];
}

const initialState: PersonState = {
  persons: [], // Inicializa como um array vazio
};

const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.persons.push(action.payload);
    },
    updatePerson: (state, action: PayloadAction<Person>) => {
      const index = state.persons.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.persons[index] = action.payload;
      }
    },
    deletePerson: (state, action: PayloadAction<string>) => {
      // Remove a pessoa com o ID correspondente
      state.persons = state.persons.filter((person) => person.id !== action.payload);
    },
  },
});

export const { addPerson, updatePerson, deletePerson } = personSlice.actions;
export default personSlice.reducer;
