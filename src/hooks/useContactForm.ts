import { useState, useCallback, useRef, useEffect, FormEvent } from 'react';
import type { ContactFormData, ContactFormState, ApiResponse } from '../types/contact';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
  _honeypot: '',
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
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error state when user starts typing
      setFormState((prev) => {
        if (prev.isError) {
          return { ...prev, isError: false, errorMessage: null };
        }
        return prev;
      });
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setFormState(initialFormState);
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
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

      // Clear any existing timeout
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }

      // Reset success state after 5 seconds
      successTimeoutRef.current = setTimeout(() => {
        setFormState((prev) => ({ ...prev, isSuccess: false }));
        successTimeoutRef.current = null;
      }, 5000);
    } catch (error) {
      let errorMessage = 'Došlo k neočekávané chybě.';

      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage = 'Zkontrolujte své připojení k internetu.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setFormState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage,
      });
    }
  }, [formData]);

  return {
    formData,
    formState,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
