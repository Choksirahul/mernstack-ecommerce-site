import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useContext } from "react";
import { GlobalState } from "../../GlobalContext";
import axios from "axios";

export default function Header() {
  const state = useContext(GlobalState);

  if (!state) {
    throw new Error("GlobalState must be used within a DataProvider");
  }

  const [isLoggedIn, setIsLoggedIn] = state.userAPI.isLoggedIn;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.clear();
    setIsAdmin(false);
    setIsLoggedIn(false);
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link className="nav-link" to="/create-product">
            Create Product
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/category">
            Categories
          </Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link className="nav-link" to="/history">
            History
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <>
      <header>
        <div className="header-content">
          <div className="menu">
            <MdOutlineMenu size={30} />
          </div>

          <div className="logo">
            <h1>
              <Link className="nav-logo" to="/">
                {isAdmin ? "Admin" : "Ecom Shop"}
              </Link>
            </h1>
          </div>

          <ul>
            <li>
              <Link className="nav-link" to="/">
                {isAdmin ? "Products" : "Shop"}
              </Link>
            </li>

            {isAdmin && adminRouter()}
            {isLoggedIn ? (
              loggedRouter()
            ) : (
              <li>
                <Link className="nav-link" to="/login">
                  Login or Register
                </Link>
              </li>
            )}

            <li>
              <MdClose size={30} className="menu-close" />
            </li>
          </ul>

          {isAdmin ? (
            ""
          ) : (
            <div className="cart-icon">
              <span>{cart.length}</span>
              <Link className="nav-link-cart" to="/cart">
                <MdOutlineAddShoppingCart size={30} />
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
