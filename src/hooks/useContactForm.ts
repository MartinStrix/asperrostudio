import { useState, FormEvent } from 'react';
import type { ContactFormData, ContactFormState, ApiResponse } from '../types/contact';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const initialFormState: ContactFormState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
};

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [formState, setFormState] = useState<ContactFormState>(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error state when user starts typing
    if (formState.isError) {
      setFormState((prev) => ({ ...prev, isError: false, errorMessage: null }));
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFormState(initialFormState);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Vyplňte prosím všechna povinná pole.',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Zadejte prosím platnou emailovou adresu.',
      });
      return;
    }

    setFormState({
      isLoading: true,
      isSuccess: false,
      isError: false,
      errorMessage: null,
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Nepodařilo se odeslat zprávu.');
      }

      setFormState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        errorMessage: null,
      });
      setFormData(initialFormData);

      // Reset success state after 5 seconds
      setTimeout(() => {
        setFormState((prev) => ({ ...prev, isSuccess: false }));
      }, 5000);
    } catch (error) {
      setFormState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage:
          error instanceof Error ? error.message : 'Došlo k neočekávané chybě.',
      });
    }
  };

  return {
    formData,
    formState,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
