import { useState, useCallback } from 'react';
import { validateForm, ValidationSchema, ValidationResult } from '@/lib/business-logic/validation';

interface UseFormValidationOptions {
  schema: ValidationSchema;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export function useFormValidation(options: UseFormValidationOptions) {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    errors: {}
  });
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const validate = useCallback((data: Record<string, any>) => {
    const result = validateForm(data, options.schema);
    setValidationResult(result);
    return result;
  }, [options.schema]);

  const validateField = useCallback((fieldName: string, value: any, formData: Record<string, any>) => {
    if (options.schema[fieldName]) {
      const fieldValidation = validateForm(
        { ...formData, [fieldName]: value },
        { [fieldName]: options.schema[fieldName] }
      );
      
      setValidationResult(prev => ({
        isValid: fieldValidation.isValid && Object.keys({ ...prev.errors, ...fieldValidation.errors }).length === 0,
        errors: {
          ...prev.errors,
          ...fieldValidation.errors
        }
      }));
      
      return fieldValidation;
    }
  }, [options.schema]);

  const markFieldTouched = useCallback((fieldName: string) => {
    setTouchedFields(prev => new Set([...prev, fieldName]));
  }, []);

  const clearErrors = useCallback(() => {
    setValidationResult({ isValid: true, errors: {} });
    setTouchedFields(new Set());
  }, []);

  const getFieldError = useCallback((fieldName: string) => {
    return touchedFields.has(fieldName) ? validationResult.errors[fieldName] : undefined;
  }, [validationResult.errors, touchedFields]);

  return {
    validationResult,
    validate,
    validateField,
    markFieldTouched,
    clearErrors,
    getFieldError,
    touchedFields
  };
}