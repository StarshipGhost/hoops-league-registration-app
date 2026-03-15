import { useHeaderContext } from "../customs/HeaderContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import CloseButton from "../customs/CloseButton";
import { Button } from "../ui/button";
import Modal from "./Modal";

const AuthModalInput = ({ id, placeholder }: { id: string; placeholder?: string }) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{id}</Label>
      <Input
        className="dark:data-placeholder:text-muted-foreground hover:bg-accent dark:bg-input/30 border border-solid border-neutral-300 dark:border-input"
        id={id}
        type={id}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

const AuthModalCard = () => {
  const {
    authModal: { toggleAuthModal },
  } = useHeaderContext();
  return (
    <Card className="w-105">
      <CardHeader className="relative">
        <CloseButton closeFunction={toggleAuthModal} />
        <CardTitle className="text-xl">Login to your admin account</CardTitle>
        <CardDescription>Enter your credentials to manage registrations and game events</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <AuthModalInput id="Email:" placeholder="admin@email.com" />
        <AuthModalInput id="Password:" />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="reset" variant="orange"> Login </Button>
        <Button type="submit" variant="white" onClick={() => { toggleAuthModal(); }} > Cancel </Button>
      </CardFooter>
    </Card>
  );
};
const AuthModal = () => {
  const {
    authModal: { authModalActive },
  } = useHeaderContext();
  return (
    <Modal isModalActive={authModalActive}>
      <AuthModalCard />
    </Modal>
  );
};

export default AuthModal;
