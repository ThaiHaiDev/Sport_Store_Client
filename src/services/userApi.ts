import axiosClient from "../share/axios-client/axiosClient";

const userApi = {
    getAllUsers(): Promise<any> {
        const url = "/user";
        return axiosClient.get(url);
    },

    addUser(dataUser: any): Promise<any> {
        const url = "/user";
        return axiosClient.post(url, dataUser);
    },

    updateUser(dataUser: any, idUser: string): Promise<any> {
        const url = `/user/${idUser}`;
        return axiosClient.put(url, dataUser);
    },

    deleteUser(idUser: any): Promise<any> {
        const url = `/user/${idUser}`;
        return axiosClient.delete(url);
    },
}

export default userApi