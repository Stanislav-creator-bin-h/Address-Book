import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react'; 
import type { BookEntry, FormErrors } from '../types';


interface AddressFormProps {
  onAddContact: (contact: Omit<BookEntry, 'id'>) => void;
}

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  phone: '',
};

const ERROR_MESSAGE_PATTERN = (fieldName: string) => 
  `The ${fieldName} is required`;

const AddressForm: React.FC<AddressFormProps> = ({ onAddContact }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});

 
  const validate = (): boolean => {
    const newErrors: FormErrors = {}; 

    if (!formData.firstName.trim()) {
      newErrors.firstName = ERROR_MESSAGE_PATTERN('first name');
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = ERROR_MESSAGE_PATTERN('last name');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = ERROR_MESSAGE_PATTERN('phone');
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validate()) {
      
      onAddContact(formData); 
      
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    }
  };

  
  return (
    <div className="address-form-container">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'input-error' : ''}
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'input-error' : ''}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel" 
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        <button type="submit" className="submit-button">Add Contact</button>
      </form>
    </div>
  );
};

export default AddressForm;
