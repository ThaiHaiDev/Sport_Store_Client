import axiosClient from "../share/axios-client/axiosClient";
import { AddCategoryResponse, AddCategoryResquest, CategoryResponse, DeleteCategoryResponse, UpdateCategoryResponse } from "../share/models/category";

const categoryApi = {
    getAllCategories(): Promise<CategoryResponse[]> {
        const url = "/category";
        return axiosClient.get(url);
    },

    addCategory(dataCategory: AddCategoryResquest): Promise<AddCategoryResponse> {
        const url = "/category";
        return axiosClient.post(url, dataCategory);
    },

    updateCategory(dataCate: AddCategoryResquest, idCate: string): Promise<UpdateCategoryResponse> {
        const url = `/category/${idCate}`;
        return axiosClient.put(url, dataCate);
    },

    deleteCategory(idCate: string): Promise<DeleteCategoryResponse> {
        const url = `/category/${idCate}`;
        return axiosClient.delete(url);
    },

}

export default categoryApi