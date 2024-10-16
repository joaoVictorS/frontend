// store.ts
import { configureStore } from '@reduxjs/toolkit';
import personReducer from './personSlice'; // Certifique-se de que está importando o reducer corretamente

export const store = configureStore({
  reducer: {
    persons: personReducer, // Certifique-se de usar o nome `persons` aqui
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
