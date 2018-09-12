import HttpRequest from "@/util/axios";
const axios = new HttpRequest()

export const getPath = () => {
    return axios.post({
        url: 'files/list',
    })
}





