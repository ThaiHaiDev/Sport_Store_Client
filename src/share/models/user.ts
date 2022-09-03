export interface AddUserErrorResponse {
    message: string;
    errors: {
        user?: string;
    };
}

export interface UpdateUserErrorResponse {
    message: string;
    errors: {
        user?: string;
    };
}