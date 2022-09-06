import axiosClient from "../share/axios-client/axiosClient";
import { AddUserRequest, AddUserResponse, DeleteUserResponse, UpdateUserResponse, UserResponse } from "../share/models/user";

const userApi = {
    getAllUsers(): Promise<UserResponse[]> {
        const url = "/user";
        return axiosClient.get(url);
    },

    addUser(dataUser: AddUserRequest): Promise<UserResponse> {
        const url = "/user";
        return axiosClient.post(url, dataUser);
    },

    updateUser(dataUser: AddUserResponse, idUser: string): Promise<UpdateUserResponse> {
        const url = `/user/${idUser}`;
        return axiosClient.put(url, dataUser);
    },

    deleteUser(idUser: string): Promise<DeleteUserResponse> {
        const url = `/user/${idUser}`;
        return axiosClient.delete(url);
    },
}

export default userApi