import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Kullanıcı giriş yapmışsa → home'a yönlendir
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  // Giriş yapmamışsa → sayfayı göster
  return children;
}