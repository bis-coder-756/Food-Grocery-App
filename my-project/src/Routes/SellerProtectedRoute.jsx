import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";


const SellerProtectedRoute = ({ children }) => {
    const { isSeller, sellerLoading } = useAppContext();

    if (sellerLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return isSeller ? children : <Navigate to="/seller-login" />;
};

export default SellerProtectedRoute;
