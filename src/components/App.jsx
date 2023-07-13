import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { isLoading, getError } from '../redux/selectors';

import { setFilter } from '../redux/filtersSlice';
import { getContacts, addContact, deleteContact } from '../redux/operations';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const error = useSelector(getError);
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const handleFormSubmit = (name, number) => {
    let existContact = contacts.find(
      contact => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (existContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    dispatch(addContact(newContact));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(filter?.toLowerCase() || '')
  );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={handleFormSubmit} />
      <Filter handleFilterChange={handleFilterChange} />{' '}
      {loading && !error && <b>Request in progress...</b>}
      <h2>Contacts</h2>
      <ContactsList contacts={filteredContacts} onDelete={handleDelete} />
    </>
  );
};

export default App;
