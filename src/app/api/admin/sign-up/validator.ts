export interface ValidationResult {
    isValid: boolean;
    message?: string;
}

export function validateFields(fields: Record<string, string | undefined>): ValidationResult {
    for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            return {
                isValid: false,
                message: `${capitalizeFirstLetter(key)} is required`,
            };
        }

        if (key === 'email' && !isValidEmail(value)) {
            return {
                isValid: false,
                message: 'Invalid email format',
            };
        }

        if (key === 'password' && !isValidPassword(value)) {
            return {
                isValid: false,
                message: 'Password must be at least 8 characters long, include at least one special character, and one number',
            };
        }
    }

    return { isValid: true };
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
    const lengthRequirement = password.length >= 8;
    const specialCharacterRequirement = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const numberRequirement = /\d/.test(password);

    return lengthRequirement && specialCharacterRequirement && numberRequirement;
}

function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
