import axiosClient from "../share/axios-client/axiosClient";
import { DeleteProductResponse, ProductResponse } from "../share/models/product";

const productApi = {
    getAllProducts(): Promise<ProductResponse[]> {
        const url = "/product";
        return axiosClient.get(url);
    },

    addProduct(dataProduct: any): Promise<any> {
        const url = "/product";
        return axiosClient.post(url, dataProduct);
    },

    deleteProduct(idProduct: string): Promise<DeleteProductResponse> {
        const url = `/product/${idProduct}`;
        return axiosClient.delete(url);
    },

}

export default productApi