import koaRouter from 'koa-router'
const router = koaRouter()
// =========================[-user-接口模块-start]==================================================
import user_controller from "../controller/system/user"
for (const func in user_controller) {
    router.post(`/user/${func}`, user_controller[func])
}
// =========================[-dict-接口模块-start]==================================================
import dict_controller from "../controller/system/dict"
for (const func in dict_controller) {
    router.post(`/dict/${func}`, dict_controller[func])
}
// =========================[-auth-接口模块-start]==================================================
import auth_controller from "../controller/system/auth"
for (const func in auth_controller) {
    router.post(`/auth/${func}`, auth_controller[func])
}
// =========================[-auth-接口模块-start]==================================================
import role_controller from "../controller/system/role"
for (const func in role_controller) {
    router.post(`/role/${func}`, role_controller[func])
}
// =========================[-common-接口模块-start]==================================================
import common_controller from "../controller/system/common"
for (const func in common_controller) {
    router.post(`/common/${func}`, common_controller[func])
}


export default app => {
    app.use(router.routes(), router.allowedMethods());
}