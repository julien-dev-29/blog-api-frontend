import { redirect } from "react-router"
import { getUser } from "../authentication/auth"

export const authMiddleware = () => {
    const user = getUser()
    if (!user) {
        throw redirect("/auth/login")
    }
}