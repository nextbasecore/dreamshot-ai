/**
 * Firebase Authentication Error Handler
 * Converts Firebase error codes into user-friendly error messages
 */

type FirebaseErrorMessages = Record<string, string>;

const FIREBASE_ERROR_MESSAGES: FirebaseErrorMessages = {
  // Authentication errors
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled. Please contact support.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled.',
  'auth/weak-password': 'Password is too weak. Please choose a stronger password.',
  'auth/invalid-credential': 'Invalid login credentials. Please check your email and password.',
  'auth/account-exists-with-different-credential': 'An account already exists with the same email but different sign-in credentials.',
  'auth/auth-domain-config-required': 'Authentication configuration error. Please try again later.',
  'auth/cancelled-popup-request': 'Sign-in was cancelled. Please try again.',
  'auth/popup-blocked': 'Pop-up was blocked by your browser. Please allow pop-ups and try again.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled. Please try again.',
  'auth/unauthorized-domain': 'This domain is not authorized for authentication.',
  'auth/invalid-action-code': 'The action code is invalid or expired.',
  'auth/expired-action-code': 'The action code has expired. Please request a new one.',
  'auth/invalid-continue-uri': 'Invalid continue URL provided.',
  'auth/missing-continue-uri': 'Continue URL is required but missing.',
  'auth/missing-email': 'Email address is required.',
  'auth/missing-password': 'Password is required.',
  'auth/invalid-password': 'Password is invalid. It must be at least 6 characters.',
  'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection and try again.',
  'auth/internal-error': 'An internal error occurred. Please try again.',
  'auth/invalid-api-key': 'Invalid API key. Please contact support.',
  'auth/app-deleted': 'Firebase app was deleted. Please refresh and try again.',
  'auth/app-not-authorized': 'App not authorized. Please contact support.',
  'auth/argument-error': 'Invalid argument provided.',
  'auth/invalid-phone-number': 'Please enter a valid phone number.',
  'auth/missing-phone-number': 'Phone number is required.',
  'auth/quota-exceeded': 'Quota exceeded. Please try again later.',
  'auth/rejected-credential': 'The credential is malformed or has expired.',
  'auth/second-factor-already-in-use': 'Second factor is already enrolled for this account.',
  'auth/maximum-second-factor-count-exceeded': 'Maximum number of second factors exceeded.',
  'auth/tenant-id-mismatch': 'Tenant ID mismatch.',
  'auth/unsupported-first-factor': 'Unsupported first factor.',
  'auth/unsupported-persistence-type': 'Unsupported persistence type.',
  'auth/unsupported-tenant-operation': 'Unsupported tenant operation.',
  'auth/unverified-email': 'Please verify your email address before signing in.',
  'auth/user-mismatch': 'User mismatch error.',
  'auth/user-signed-out': 'User has been signed out. Please sign in again.',
  'auth/web-storage-unsupported': 'Web storage is not supported in this browser.',
  'auth/already-initialized': 'Firebase has already been initialized.',
  'auth/recaptcha-not-enabled': 'reCAPTCHA is not enabled.',
  'auth/missing-recaptcha-token': 'reCAPTCHA token is missing.',
  'auth/invalid-recaptcha-token': 'reCAPTCHA token is invalid.',
  'auth/invalid-recaptcha-action': 'reCAPTCHA action is invalid.',
  'auth/missing-client-type': 'Client type is missing.',
  'auth/missing-recaptcha-version': 'reCAPTCHA version is missing.',
  'auth/invalid-recaptcha-version': 'reCAPTCHA version is invalid.',
  'auth/invalid-req-type': 'Invalid request type.',
};

interface FirebaseErrorLike {
  code?: string;
  message?: string;
}

const GENERIC_ERROR_MESSAGE = 'An unexpected error occurred. Please try again.';
const AUTH_CODE_PREFIX = 'auth/';

/**
 * Normalizes Firebase auth error codes so our lookup table only needs one format.
 * Without this, callers that omit the `auth/` prefix would never match a message.
 */
const normalizeAuthCode = (errorCode: string): string => {
  if (!errorCode) {
    return AUTH_CODE_PREFIX;
  }

  return errorCode.startsWith(AUTH_CODE_PREFIX) ? errorCode : `${AUTH_CODE_PREFIX}${errorCode}`;
};

/**
 * Extracts an auth error code from raw Firebase error messages such as:
 * "Firebase: Error (auth/user-not-found)." This keeps message parsing isolated.
 */
const extractCodeFromMessage = (message: string): string | null => {
  if (!message) {
    return null;
  }

  const codeMatch = message.match(/\(([^)]+)\)/);
  return codeMatch?.[1] ?? null;
};

/**
 * Converts Firebase error codes to user-friendly error messages
 * @param errorCode - The Firebase error code (e.g., 'auth/user-not-found')
 * @returns User-friendly error message
 */
export const getFirebaseErrorMessage = (errorCode?: string | null): string => {
  if (!errorCode) {
    return GENERIC_ERROR_MESSAGE;
  }

  // Always look up normalized codes to avoid duplicating dictionary keys
  const normalizedCode = normalizeAuthCode(errorCode.trim());

  // Return custom message if available, otherwise return a generic message
  return FIREBASE_ERROR_MESSAGES[normalizedCode] || GENERIC_ERROR_MESSAGE;
};

/**
 * Handles Firebase errors and returns appropriate user-friendly messages
 * @param error - The Firebase error object
 * @returns User-friendly error message
 */
export const handleFirebaseError = (error: unknown): string => {
  // Handle different error formats
  if (typeof error === 'string') {
    return getFirebaseErrorMessage(error);
  }

  if (typeof error === 'object' && error !== null) {
    const { code, message } = error as FirebaseErrorLike;

    if (code) {
      return getFirebaseErrorMessage(code);
    }

    if (message) {
      // Try to extract error code from message if available
      const extractedCode = extractCodeFromMessage(message);
      if (extractedCode) {
        return getFirebaseErrorMessage(extractedCode);
      }

      // If no code found, return the message if it seems user-friendly
      if (!message.includes('Firebase') && !message.includes('auth/')) {
        return message;
      }
    }
  }

  // Fallback for unknown error formats
  return GENERIC_ERROR_MESSAGE;
};

/**
 * Specific error handler for authentication operations
 * @param error - The Firebase auth error
 * @returns User-friendly error message with additional context
 */
export const handleAuthError = (error: unknown): string => {
  const baseMessage = handleFirebaseError(error);

  // Add specific context for certain errors
  if (typeof error === 'object' && error !== null) {
    const { code } = error as FirebaseErrorLike;

    if (code === 'auth/too-many-requests') {
      return `${baseMessage} You can reset your password or try again in a few minutes.`;
    }

    if (code === 'auth/network-request-failed') {
      return `${baseMessage} Please ensure you have a stable internet connection.`;
    }
  }

  return baseMessage;
};

const firebaseErrorHandler = {
  getFirebaseErrorMessage,
  handleFirebaseError,
  handleAuthError,
};

export default firebaseErrorHandler;
