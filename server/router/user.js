import user_controller from "../controller/user"
import koaRouter from 'koa-router'
const router = koaRouter()

for (const func in user_controller) {
    router.post(`/user/${func}`, user_controller[func])
}

export default router