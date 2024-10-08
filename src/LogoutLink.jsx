import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";

export function LogoutLink() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    logout();
    navigate("/");
    console.log("Logged Out");
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <a href="#" onClick={handleClick}>
        Logout
      </a>
    </div>
  );
}
