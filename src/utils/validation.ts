import * as yup from 'yup';

// Custom error messages
const errorMessages = {
  email: {
    required: 'Email address is required',
    invalid: 'Please enter a valid email address',
    format: 'Email must be in a valid format (e.g., user@example.com)',
  },
  password: {
    required: 'Password is required',
    min: 'Password must be at least 6 characters long',
    format: 'Password must contain at least one letter and one number',
    uppercase: 'Password must contain at least one uppercase letter',
    lowercase: 'Password must contain at least one lowercase letter',
    number: 'Password must contain at least one number',
    special: 'Password must contain at least one special character',
  },
};

// Regular expressions for validation
const validationRegex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: {
    base: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
    uppercase: /(?=.*[A-Z])/,
    lowercase: /(?=.*[a-z])/,
    number: /(?=.*\d)/,
    special: /(?=.*[@$!%*#?&])/,
  },
};

// Yup schema for login form
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required(errorMessages.email.required)
    .email(errorMessages.email.invalid)
    .matches(validationRegex.email, errorMessages.email.format)
    .trim(),
  password: yup
    .string()
    .required(errorMessages.password.required)
    .min(6, errorMessages.password.min)
    .matches(validationRegex.password.base, errorMessages.password.format)
    .matches(validationRegex.password.uppercase, errorMessages.password.uppercase)
    .matches(validationRegex.password.lowercase, errorMessages.password.lowercase)
    .matches(validationRegex.password.number, errorMessages.password.number)
    .matches(validationRegex.password.special, errorMessages.password.special),
});

// Helper function to validate a single field
export const validateField = async (
  schema: yup.ObjectSchema<any>,
  field: string,
  value: any
): Promise<string | null> => {
  try {
    await schema.validateAt(field, { [field]: value });
    return null;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.message;
    }
    return 'Validation error occurred';
  }
};

// Helper function to validate entire form
export const validateForm = async <T extends Record<string, any>>(
  schema: yup.ObjectSchema<any>,
  values: T
): Promise<{ isValid: boolean; errors: Partial<Record<keyof T, string>> }> => {
  try {
    await schema.validate(values, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.reduce((acc, curr) => {
        if (curr.path) {
          acc[curr.path as keyof T] = curr.message;
        }
        return acc;
      }, {} as Partial<Record<keyof T, string>>);
      
      return { isValid: true, errors };
    }
    return { isValid: false, errors: { form: 'Validation error occurred' } as Partial<Record<keyof T, string>> };
  }
};

// Password strength checker
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string;
} => {
  let score = 0;
  const feedback: string[] = [];

  if (validationRegex.password.lowercase.test(password)) score++;
  if (validationRegex.password.uppercase.test(password)) score++;
  if (validationRegex.password.number.test(password)) score++;
  if (validationRegex.password.special.test(password)) score++;
  if (password.length >= 8) score++;

  if (score < 2) {
    feedback.push('Weak password');
  } else if (score < 4) {
    feedback.push('Moderate password');
  } else {
    feedback.push('Strong password');
  }

  return {
    score,
    feedback: feedback.join(', '),
  };
};
