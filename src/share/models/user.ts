export interface UserResponse {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: string;
    phone: string;
    address?: string;
    googleId?: string;
    facebookId?: string;
    status?: string;
}

export interface AddUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: string;
    password: string;
    phone?: string;
    address?: string;
    googleId?: string;
    facebookId?: string;
    status?: string;
}

export interface AddUserResponse {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: string;
    password: string;
    phone?: string;
    address?: string;
    googleId?: string;
    facebookId?: string;
    status?: string;
}

export interface UpdateUserResponse {
    message: string;
}

export interface DeleteUserResponse {
    message: string;
}

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