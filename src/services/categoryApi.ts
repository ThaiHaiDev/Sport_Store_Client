import axiosClient from "../share/axios-client/axiosClient";
import { AddCategoryResponse, AddCategoryResquest, CategoryResponse, DeleteCategoryResponse } from "../share/models/category";

const categoryApi = {
    getAllCategories(): Promise<CategoryResponse[]> {
        const url = "/category";
        return axiosClient.get(url);
    },

    addCategory(dataCategory: AddCategoryResquest): Promise<AddCategoryResponse> {
        const url = "/category";
        return axiosClient.post(url, dataCategory);
    },

    deleteCategory(idCater: string): Promise<DeleteCategoryResponse> {
        const url = `/category/${idCater}`;
        return axiosClient.delete(url);
    },

}

export default categoryApi