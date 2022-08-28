import axios, { AxiosResponse } from "axios";
import { SignInData, SignUpData } from "../share/models/auth";
import process from 'process';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const authApi = {
    signUp(data: SignUpData): Promise<AxiosResponse> {
        const url = `${API_BASE_URL}/register`;
        return axios.post(url, data);
    },
    signIn(data: SignInData): Promise<AxiosResponse> {
        const url = `${API_BASE_URL}/login`;
        return axios.post(url, data);
    },
};

export default authApi;