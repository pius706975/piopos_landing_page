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
    }

    return { isValid: true };
}

function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}