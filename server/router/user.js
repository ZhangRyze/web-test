import user_controller from "../controller/user"
import koaRouter from 'koa-router'
const router = koaRouter()

router.post('/user/add', user_controller.add)
router.post('/user/list', user_controller.list)
router.post('/user/info', user_controller.info)

export default router