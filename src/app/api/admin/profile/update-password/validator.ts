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

        if (key === 'newPassword' && !isValidPassword(value)) {
            return {
                isValid: false,
                message: 'Password must be at least 8 characters long, include at least one special character, and one number',
            };
        }
    }

    return { isValid: true };
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
