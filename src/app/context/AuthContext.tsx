import CreateDataContext from "./CreateDataContext";
import { AuthState, AuthUser } from "@/app/types/api/auth";

const initialState: AuthState = {
  session: false,
  user: null,
};

type Action =
  | { type: "LOGIN";  payload: AuthUser }
  | { type: "LOGOUT" };

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { session: true, user: action.payload };
    case "LOGOUT":
      return { session: false, user: null };
    default:
      return state;
  }
};

const login =
  (dispatch: React.Dispatch<Action>) => (user: AuthUser) => {
    dispatch({ type: "LOGIN", payload: user });
  };

const logout =
  (dispatch: React.Dispatch<Action>) => () => {
    dispatch({ type: "LOGOUT" });
  };

export const { Context: AuthContext, Provider: AuthProvider } =
  CreateDataContext(reducer, { login, logout }, initialState);
