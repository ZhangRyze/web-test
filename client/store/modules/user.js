import { getUserAuths } from '@/api/system/common'
import { getToken } from '@/util/auth'
import { asyncRouterMap } from '@/router'

const user = {
    state: {
        userName: '',
        userType:'',
        auths: null, 
        token: getToken(),
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USERINFO(state, { auths, info}) {
            state.userType = info.userType;
            state.userName = info.userName;
            state.auths = auths ? auths : info.auths;
        },
        CLEARINFO(state) {
            state.userType = '';
            state.userName = '';
            state.auths = null;
        }
    },
    actions: {
        clearInfo({ commit }) {
            commit('CLEARINFO')
        },
        getUserAuths({ state, commit }) {
            return new Promise((resolve) => {
                getUserAuths().then(res => {
                    let _asyncRouterMap = null
                    if (res.data.userType === 'admin'){
                        _asyncRouterMap = asyncRouterMap
                    }
                    commit('SET_USERINFO', {
                        auths: _asyncRouterMap,
                        info: res.data
                    })
                    resolve(res)
                })
            })
        },
    }
}

export default user