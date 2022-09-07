import axiosClient from "../share/axios-client/axiosClient";
import { AddProductResponse, AddProductResquest, DeleteProductResponse, ProductResponse, UpdateProductResponse } from "../share/models/product";

const productApi = {
    getAllProducts(): Promise<ProductResponse[]> {
        const url = "/product";
        return axiosClient.get(url);
    },

    addProduct(dataProduct: any): Promise<AddProductResponse> {
        const url = "/product";
        return axiosClient.post(url, dataProduct);
    },

    updateProduct(dataProduct: AddProductResquest, idProduct: string): Promise<UpdateProductResponse> {
        const url = `/product/${idProduct}`;
        return axiosClient.put(url, dataProduct);
    },

    deleteProduct(idProduct: string): Promise<DeleteProductResponse> {
        const url = `/product/${idProduct}`;
        return axiosClient.delete(url);
    },

}

export default productApi