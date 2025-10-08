import React, { useState, useMemo, useCallback } from 'react';
import type { BookEntry } from './types'; 
import AddressForm from './components/AddressForm';
import SearchBar from './components/SearchBar';
import AddressTable from './components/AddressTable';
import './App.css'; 

const initialContacts: BookEntry[] = [];

const App: React.FC = () => {
  const [contacts, setContacts] = useState<BookEntry[]>(initialContacts);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);



  const handleAddContact = useCallback((newContactData: Omit<BookEntry, 'id'>) => {
    const newContact: BookEntry = {
      ...newContactData,
      id: Date.now().toString(), 
    };
    setContacts(prev => [newContact, ...prev]);
  }, []);

  const handleStartEdit = useCallback((id: string) => {
    setEditingId(id);
  }, []);

  
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
  }, []);

  
  const handleSaveEdit = useCallback((updatedContact: BookEntry) => {
    setContacts(prev => 
      prev.map(contact => 
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setEditingId(null);
  }, []);



  const filteredContacts = useMemo(() => {
    if (!searchTerm) {
      return contacts;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();

    return contacts.filter(contact =>
      contact.firstName.toLowerCase().includes(lowerCaseSearch) ||
      contact.lastName.toLowerCase().includes(lowerCaseSearch) ||
      contact.phone.includes(searchTerm) 
    );
  }, [contacts, searchTerm]);


  return (
    <div className="address-book-app p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        Address Book Application
      </h1>

      <div className="mb-8 p-4 border border-gray-200 rounded-lg">
        <AddressForm onAddContact={handleAddContact} />
      </div>

      <div className="mb-8">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      </div>

      <AddressTable
        contacts={filteredContacts}
        searchTerm={searchTerm}
        editingId={editingId}
        onStartEdit={handleStartEdit}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
};

export default App;
