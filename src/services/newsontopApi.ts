import axiosClient from "../share/axios-client/axiosClient";

const newsOnTopApi = {
    getAllNewsOnTop(): Promise<any> {
        const url = "/newstop";
        return axiosClient.get(url);
    },
}

export default newsOnTopApi