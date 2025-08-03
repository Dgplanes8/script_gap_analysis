export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationSchema {
  [fieldName: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateField(value: any, rule: ValidationRule, fieldName: string): string | null {
  if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return `${fieldName} is required`;
  }

  if (value && typeof value === 'string') {
    if (rule.minLength && value.length < rule.minLength) {
      return `${fieldName} must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `${fieldName} must be no more than ${rule.maxLength} characters`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return `${fieldName} format is invalid`;
    }
  }

  if (rule.custom) {
    const customResult = rule.custom(value);
    if (typeof customResult === 'string') {
      return customResult;
    }
    if (customResult === false) {
      return `${fieldName} is invalid`;
    }
  }

  return null;
}

export function validateForm(data: Record<string, any>, schema: ValidationSchema): ValidationResult {
  const errors: Record<string, string> = {};

  for (const [fieldName, rule] of Object.entries(schema)) {
    const error = validateField(data[fieldName], rule, fieldName);
    if (error) {
      errors[fieldName] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Common validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,2}[\s\-\.]?[\(]?[\d]{1,3}[\)]?[\s\-\.]?[\d]{3,4}[\s\-\.]?[\d]{3,6}$/,
  url: /^https?:\/\/.+/,
} as const;

// Common validation schemas
export const COMMON_VALIDATIONS = {
  email: {
    required: true,
    pattern: VALIDATION_PATTERNS.email
  },
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  company: {
    required: true,
    minLength: 2,
    maxLength: 100
  }
} as const;