import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { BookEntry } from '../types'; 

interface TableRowProps {
  contact: BookEntry;
  isEditing: boolean;
  onStartEdit: (id: string) => void;
  onSaveEdit: (contact: BookEntry) => void;
  onCancelEdit: () => void;
}

const ERROR_MESSAGE_PATTERN = (fieldName: string) => 
  `The ${fieldName} is required`;

const TableRow: React.FC<TableRowProps> = ({ 
  contact, 
  isEditing, 
  onStartEdit, 
  onSaveEdit, 
  onCancelEdit 
}) => {
  const [editedData, setEditedData] = useState(contact);
  const [errors, setErrors] = useState<{[key: string]: string}>({});


  const validate = (): boolean => {
    const newErrors: {[key: string]: string} = {}; 

    if (!editedData.firstName.trim()) {
      newErrors.firstName = ERROR_MESSAGE_PATTERN('first name');
    }
    if (!editedData.lastName.trim()) {
      newErrors.lastName = ERROR_MESSAGE_PATTERN('last name');
    }
    if (!editedData.phone.trim()) {
      newErrors.phone = ERROR_MESSAGE_PATTERN('phone');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSave = () => {
    if (validate()) {
      onSaveEdit(editedData); 
      setErrors({});
    }
  };

  const handleCancel = () => {
    setEditedData(contact); 
    setErrors({}); 
    onCancelEdit(); 
  };

  
  if (isEditing) {
    return (
      <tr className="editing-row">
        <td>{contact.id}</td>
        
        <td>
          <input 
            name="firstName" 
            value={editedData.firstName} 
            onChange={handleEditChange} 
            className={errors.firstName ? 'input-error' : ''}
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </td>
        
        <td>
          <input 
            name="lastName" 
            value={editedData.lastName} 
            onChange={handleEditChange} 
            className={errors.lastName ? 'input-error' : ''}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </td>
        
        <td>
          <input 
            name="phone" 
            value={editedData.phone} 
            onChange={handleEditChange} 
            className={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </td>
        
        <td className="actions">
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="display-row">
      <td>{contact.id}</td>
      <td>{contact.firstName}</td>
      <td>{contact.lastName}</td>
      <td>{contact.phone}</td>
      <td className="actions">
        <button onClick={() => onStartEdit(contact.id)} className="edit-button">Edit</button>
      </td>
    </tr>
  );
};

export default TableRow;
