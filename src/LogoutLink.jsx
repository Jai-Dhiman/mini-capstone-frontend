import { useUser } from "./UserContext";
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
      <p>{user.name} is logged in</p>
      <a href="#" onClick={handleClick}>
        Logout
      </a>
    </div>
  );
}
