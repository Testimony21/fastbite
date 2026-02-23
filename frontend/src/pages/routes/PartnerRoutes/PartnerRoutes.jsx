import { Navigate } from "react-router-dom";

export default function PartnerRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) return <Navigate to="/login" />;

  if (userInfo.role !== "restaurant") return <Navigate to="/" />;

  return children;
}