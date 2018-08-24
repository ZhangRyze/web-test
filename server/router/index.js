import user_router from "./user"

export default app => {
    app.use(user_router.routes(), user_router.allowedMethods());
}