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
    }

    return { isValid: true };
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
