import { useDispatch } from "react-redux";
import {getAuth} from '../storToolkit/auth/authReducer'

export default function useAuth() {
  const dispatch = useDispatch();
  const login = localStorage.getItem("access_token");
  if (login) {
    dispatch(getAuth(true));
    
  }
  return login;
}
