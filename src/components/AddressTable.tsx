import React from 'react';
import type { BookEntry } from '../types';
import TableRow from './TableRow';

interface AddressTableProps {
  contacts: BookEntry[];
  searchTerm: string;
  editingId: string | null;
  onStartEdit: (id: string) => void;
  onSaveEdit: (contact: BookEntry) => void;
  onCancelEdit: () => void;
}

const AddressTable: React.FC<AddressTableProps> = ({ 
  contacts, 
  searchTerm, 
  editingId,
  onStartEdit,
  onSaveEdit,
  onCancelEdit
}) => {
  

  if (contacts.length === 0) {
    if (!searchTerm) {
        return <p className="no-data-message">No data to display.</p>;
    }
    return <p className="no-data-message">No results found for "{searchTerm}".</p>;
  }


  return (
    <div className="address-table-container">
      <h2>Contact List</h2>
      <table className="contact-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <TableRow
              key={contact.id}
              contact={contact}
              isEditing={editingId === contact.id}
              onStartEdit={onStartEdit}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddressTable;
