export interface CategoryResponse {
    _id: string;
    name: string;
    slug: string;
    desc: string;
    image?: string;
    countProduct?: number;
    products?: [];
}

export interface AddCategoryResponse {
    _id: string;
    name: string;
    slug: string;
    desc: string;
    image?: string;
    countProduct?: number;
    products?: [];
}

export interface AddCategoryResquest {
    name: string;
    slug?: string;
    desc: string;
    image?: string | ArrayBuffer | null;
    countProduct?: number;
}

export interface DeleteCategoryResponse {
    message: string;
}

export interface UpdateCategoryResponse {
    message: string;
}

export interface AddCategoryErrorResponse {
    message: string;
    errors: {
        user?: string;
    };
}

export interface UpdateCategoryErrorResponse {
    message: string;
    errors: {
        user?: string;
    };
}
