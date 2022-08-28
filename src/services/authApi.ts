import axios, { AxiosResponse } from "axios";

const authApi = {
    signUp(data: any): Promise<AxiosResponse> {
        const url = `http://localhost:3001/api/v1/register`;
        return axios.post(url, data);
    },
    signIn(data: any): Promise<AxiosResponse<any, any>> {
        const url = `http://localhost:3001/api/v1/login`;
        return axios.post(url, data);
    },
};

export default authApi;