import Cookies from "js-cookie"

export function handleLogout() {
    Cookies.remove("jwt")
}