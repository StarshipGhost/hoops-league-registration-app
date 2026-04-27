import { useHeaderContext } from "../customs/HeaderContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import CloseButton from "../customs/CloseButton";
import { Button } from "../ui/button";
import Modal from "./Modal";
import { useState, type ChangeEvent } from "react";
import adminService from '../../services/admin'

const ErrorMessage = ({message} : {message: string}) => {
  return !!message.length && <div className="text-red-500 text-center mt-2">{ message }</div>
}

const AuthModalInput = ({ id, onChange, value, placeholder }: { id: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, value: string, placeholder?: string }) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{id}</Label>
      <Input
        className="dark:data-placeholder:text-muted-foreground hover:bg-accent dark:bg-input/30 border border-solid border-neutral-300 dark:border-input"
        id={id}
        type={id.toLowerCase().substring(0, id.length - 1)}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

const AuthModalCard = ({handleLogin} : {handleLogin : () => void} ) => {
  const {
    authModal: { toggleAuthModal },
  } = useHeaderContext();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');


  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) : void => {
    setPassword(e.currentTarget.value);
  }

  const submitLogin = async (username: string, password: string) => {
    try {
      await adminService.login(username, password) 
      toggleAuthModal();
      setUsername('');
      setPassword('');
      handleLogin()
    } catch (err) {
      setErrorMessage('Invalid credentials!')
      setTimeout(() => {
        setErrorMessage('');
      }, 3000)
      console.log(err)
    }
  }

  return (
    <Card className="w-105">
      <CardHeader className="relative">
        <CloseButton closeFunction={toggleAuthModal} />
        <CardTitle className="text-xl mr-5">Admin Login</CardTitle>
        <CardDescription>Only the admin can login and manage the registrations and game events.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <AuthModalInput id="Email:" onChange={(e) => handleUsernameChange(e)} value={username} placeholder="admin@email.com" />
        <AuthModalInput id="Password:" onChange={(e) => handlePasswordChange(e)} value={password}/>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" variant="orange" onClick={() => submitLogin(username, password)}> Login </Button>
        <Button type="reset" variant="white" onClick={() =>  toggleAuthModal() } > Cancel </Button>
        <ErrorMessage message={errorMessage}/>
      </CardFooter>
    </Card>
  );
};
const AuthModal = ({handleLogin} : {handleLogin: () => void}) => {
  const {
    authModal: { authModalActive },
  } = useHeaderContext();
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleLogin();
  }
  return (
    <Modal isModalActive={authModalActive} onSubmit={handleSubmit}>
      <AuthModalCard handleLogin={handleLogin}/>
    </Modal>
  );
};

export default AuthModal;
