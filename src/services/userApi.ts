import axiosClient from "../share/axios-client/axiosClient";

const userApi = {
    getAllUsers(): Promise<any> {
        const url = "/user";
        return axiosClient.get(url);
    },
}

export default userApi