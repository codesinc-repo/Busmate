import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const TryToolkitFree = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        toast.success("You are a user");
        navigate("");
      } else {
        toast.error("Login to continue...");

        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }
    });
  };
  return (
    <div className="row text-center mt-5">
      <div className="col-md">
        <button
          className="btn btn-success px-5 py-4 rounded-4"
          onClick={handleClick}
        >
          <h5 className="mb-0">Try Transport Toolkit For Free</h5>
        </button>
      </div>
    </div>
  );
};
