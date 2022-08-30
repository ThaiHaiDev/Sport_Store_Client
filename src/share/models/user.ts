export interface AddUserErrorResponse {
    message: string;
    errors: {
        user?: string;
    };
}