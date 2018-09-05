import { Cookie } from './storage'
import conf from '../../server.config'

export function getToken() {
    return Cookie.get(conf.auth.tokenKey)
}

export function setToken(token) {
    return Cookie.set(conf.auth.tokenKey, token)
}

export function removeToken() {
    return Cookie.remove(conf.auth.tokenKey)
}
