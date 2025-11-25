/**
 * Form validation utilities
 * Provides reusable validation functions for forms
 */

export function validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email || email.trim() === "") {
        return {
            isValid: false,
            error: "Email is required",
        };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            error: "Please enter a valid email address",
        };
    }

    return { isValid: true };
}

export function validatePassword(
    password: string,
    minLength: number = 8
): { isValid: boolean; error?: string } {
    if (!password || password.trim() === "") {
        return {
            isValid: false,
            error: "Password is required",
        };
    }

    if (password.length < minLength) {
        return {
            isValid: false,
            error: `Password must be at least ${minLength} characters`,
        };
    }

    return { isValid: true };
}

export function validatePasswordMatch(
    password: string,
    confirmPassword: string
): { isValid: boolean; error?: string } {
    if (password !== confirmPassword) {
        return {
            isValid: false,
            error: "Passwords do not match",
        };
    }

    return { isValid: true };
}

export function validateRequired(
    value: string | number | null | undefined,
    fieldName: string = "Field"
): { isValid: boolean; error?: string } {
    if (value === null || value === undefined || (typeof value === "string" && value.trim() === "")) {
        return {
            isValid: false,
            error: `${fieldName} is required`,
        };
    }

    return { isValid: true };
}

export function validateField(
    type: "email" | "password" | "required",
    value: string,
    options?: {
        minLength?: number;
        fieldName?: string;
        confirmPassword?: string;
    }
): { isValid: boolean; error?: string } {
    switch (type) {
        case "email":
            return validateEmail(value);
        case "password":
            return validatePassword(value, options?.minLength);
        case "required":
            return validateRequired(value, options?.fieldName);
        default:
            return { isValid: true };
    }
}

export function validateMultiple(
    validations: Array<{ isValid: boolean; error?: string }>
): { isValid: boolean; errors: string[] } {
    const errors = validations
        .filter((v) => !v.isValid)
        .map((v) => v.error)
        .filter((error): error is string => !!error);

    return {
        isValid: errors.length === 0,
        errors,
    };
}

