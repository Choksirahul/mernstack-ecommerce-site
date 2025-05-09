import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { GlobalState, GlobalStateType } from "./GlobalContext";
import ProductAPI from "./api/ProductAPI";
import UserAPI from "./api/UserAPI";

interface Props {
  children: ReactNode;
}

export const DataProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string>("");

  const refreshToken = async () => {
    const res = await axios.get("/user/refresh_token");
    setToken(res.data.accessToken);
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      refreshToken();
    }
  }, []);

  const state: GlobalStateType = {
    token: [token, setToken],
    productAPI: ProductAPI(),
    userAPI: UserAPI(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
