export interface ProductResponse {
    _id: string;
    name: string;
    slug?: string;
    thumbnail: string;
    desc: string;
    videoid?: string
    pictures?: [{ type: String}];
    quantity?: number;
    sold?: number;        // quantity sold
    price: number; 
    category?: string;
    views?: number;        // views of product
    isOutOfStock?: boolean; 
}

export interface AddProductResquest {
    name: string;
    slug?: string;
    thumbnail?: string | ArrayBuffer | null;
    desc: string;
    videoid?: string
    pictures?: [{ type: String}];
    quantity?: number;
    sold?: number;        // quantity sold
    price: number | undefined; 
    category?: string;
    views?: number;        // views of product
    isOutOfStock?: boolean; 
}

export interface AddProductResponse {
    _id: string;
    name: string;
    slug?: string;
    thumbnail: string;
    desc: string;
    videoid?: string
    pictures?: [{ type: String}];
    quantity?: number;
    sold?: number;        // quantity sold
    price: number; 
    category?: string;
    views?: number;        // views of product
    isOutOfStock?: boolean; 
}

export interface DeleteProductResponse {
    message: string;
}

export interface UpdateProductResponse {
    message: string;
}