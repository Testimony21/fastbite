import { useLoading } from "../../Context/LoadingContext/LoadingContext";
import "./GlobalLoader.css";

const GlobalLoader = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="global-loader-overlay">
      <div className="global-spinner"></div>
    </div>
  );
};

export default GlobalLoader;
