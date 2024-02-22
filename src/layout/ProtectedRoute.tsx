import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function ProtectedRoute({
    children,
}: {
    children: JSX.Element;
}) {
    const token = Cookies.get("token");
    const authenticated = !!token;

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
