import login from "../../../src/assets/login_24dp_00C951_FILL0_wght400_GRAD0_opsz24.svg";
import logout from "../../../src/assets/logout_24dp_2B7FFF_FILL0_wght400_GRAD0_opsz24.svg";
import { useHeaderContext } from "./HeaderContext";

const SignMessage = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <div className="flex justify-center">
      <LoginMessage isLogin={isLogin} />
      <LogoutMessage isLogin={isLogin} />
    </div>
  );
};

const LoginMessage = ({ isLogin }: { isLogin: boolean }) => {
  const {
    admin: { isAdmin },
  } = useHeaderContext();
  return (
    <div className={`sign-popover text-sm sm:text-base bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-500 -translate-y-full opacity-0 ${isLogin && isAdmin && `translate-y-0 opacity-100`} `} >
      <img src={login}></img>
      {`Logged in successfully!`}
    </div>
  );
};

const LogoutMessage = ({ isLogin }: { isLogin: boolean }) => {
  const {
    admin: { isAdmin },
  } = useHeaderContext();
  return (
    <div className={`sign-popover text-sm sm:text-base bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-500 -translate-y-full opacity-0 ${isLogin && !isAdmin && `translate-y-0 opacity-100`}`} >
      <img src={logout}></img>
      {`Logged out successfully!`}
    </div>
  );
};

export default SignMessage;
