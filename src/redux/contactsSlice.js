import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const contactsSlice = createSlice({
  name: "contacts",
  initialState: defaultContacts,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
                id: nanoid(),
                name,
              number,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

// const SetTransform = createTransform(
//   // transform state on its way to being serialized and persisted.
//   (inboundState, key) => {
//     // convert mySet to an Array.
//     return { ...inboundState, mySet: [...inboundState.mySet] };
//   },
//   // transform state being rehydrated
//   (outboundState, key) => {
//     // convert mySet back to a Set.
//     return { ...outboundState, mySet: new Set(outboundState.mySet) };
//   },
//   // define which reducers this transform gets called for.
//   { whitelist: ['contactsReducer'] }
// );

const persistConfig = {
  key: 'root',
    storage,
}

export const contactsReducer = persistReducer(persistConfig, contactsSlice.reducer);

export const { addContact, deleteContact } = contactsSlice.actions;

 