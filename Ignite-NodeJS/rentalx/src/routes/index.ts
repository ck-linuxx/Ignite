import { Router } from "express"
import { categoriesRoutes } from "./categories.routes"
import { specificationsRoutes } from "./specifications.routes"
import { usersRouter } from "./users.routes"

const routes = Router() 

routes.use("/categories" ,categoriesRoutes)
routes.use("/specifications" ,specificationsRoutes)
routes.use("/users", usersRouter)

export { routes }