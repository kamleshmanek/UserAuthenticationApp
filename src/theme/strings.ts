interface IStrings {
  common: {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    submit: string;
    cancel: string;
    back: string;
    next: string;
    save: string;
    loading: string;
    tasks: string;
    projects: string;
    messages: string;
    user: string;
    logout: string;
  };
  login: {
    welcomeBack: string;
    signInToContinue: string;
    signIn: string;
    dontHaveAccount: string;
    signUp: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
  };
  signup: {
    createAccount: string;
    signupToContinue: string;
    alreadyHaveAccount: string;
    signIn: string;
    fullNamePlaceholder: string;
    confirmPasswordPlaceholder: string;
  };
  validation: {
    required: (field: string) => string;
    emailInvalid: string;
    passwordLength: string;
    passwordMismatch: string;
  };
  errors: {
    somethingWentWrong: string;
    networkError: string;
    invalidCredentials: string;
    emailInUse: string;
  };
  success: {
    accountCreated: string;
    passwordReset: string;
    profileUpdated: string;
  };
  home: {
    welcome: string;
    subtitle: string;
  };
}

export const strings: IStrings = {
  // Common
  common: {
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    submit: 'Submit',
    cancel: 'Cancel',
    back: 'Back',
    next: 'Next',
    save: 'Save',
    loading: 'Loading...',
    tasks: 'Tasks',
    projects: 'Projects',
    messages: 'Messages',
    user: 'User',
    logout: 'Logout',
  },
  
  // Login Screen
  login: {
    welcomeBack: 'Welcome Back',
    signInToContinue: 'Sign in to continue to your account',
    signIn: 'Sign In',
    dontHaveAccount: "Don't have an account? ",
    signUp: 'Sign Up',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
  },
  
  // Signup Screen
  signup: {
    createAccount: 'Create Account',
    signupToContinue: 'Sign up to get started',
    alreadyHaveAccount: 'Already have an account? ',
    signIn: 'Sign In',
    fullNamePlaceholder: 'Enter your full name',
    confirmPasswordPlaceholder: 'Confirm your password',
  },
  
  // Validation Messages
  validation: {
    required: (field: string) => `${field} is required`,
    emailInvalid: 'Please enter a valid email',
    passwordLength: 'Password must be at least 6 characters',
    passwordMismatch: 'Passwords do not match',
  },
  
  // Errors
  errors: {
    somethingWentWrong: 'Something went wrong',
    networkError: 'Network error. Please check your connection.',
    invalidCredentials: 'Invalid email or password',
    emailInUse: 'This email is already in use',
  },
  
  // Success Messages
  success: {
    accountCreated: 'Account created successfully!',
    passwordReset: 'Password reset email sent!',
    profileUpdated: 'Profile updated successfully!',
  },
  
  // Home Screen
  home: {
    welcome: 'Welcome back',
    subtitle: 'Great to see you again!',
  },
};
