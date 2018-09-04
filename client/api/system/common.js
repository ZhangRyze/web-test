import HttpRequest from "@/util/axios";
const axios = new HttpRequest()

export const getUserAuths = () => {
    return axios.post({
        url: 'user/auths'
    })
}




