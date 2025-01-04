import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { user, isLoading } = useSelector(
    (state) => state.user.value
  );

  if (isLoading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
