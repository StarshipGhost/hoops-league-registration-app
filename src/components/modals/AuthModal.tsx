import {useHeaderContext} from '../customs/HeaderContext'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '../ui/card'
import {Input} from '../ui/input'
import {Label} from '../ui/label'
import {Button} from '../ui/button'

const Modal = () => {
  const {
    authModal: {authModalActive, toggleAuthModal},
  } = useHeaderContext()
  return (
    <div className={`${authModalActive ? `flex` : `hidden`} flex justify-center items-center fixed top-0 w-full h-full z-1000 overflow-auto bg-[rgba(0,0,0,0.5)]`} >
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle className="text-xl">Login to your admin account</CardTitle>
          <CardDescription>Enter your credentials to manage registrations and game events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input className="border border-solid border-neutral-400 dark:border-neutral-800" id="email" type="email" placeholder="admin@email.com" required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input className="border border-solid border-neutral-400 dark:border-neutral-800" id="password" type="password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className="w-full text-white bg-orange-500/90 dark:bg-orange-400 hover:bg-orange-500/90 dark:hover:bg-orange-400 hover:brightness-90 cursor-pointer">
            Login
          </Button>
          <Button
            className="w-full text-black dark:text-white bg-white dark:bg-black cursor-pointer hover:brightness-95 hover:bg-white dark:hover:bg-black dark:hover:brightness-200 border border-solid border-neutral-200 dark:border-neutral-800 shadow"
            onClick={toggleAuthModal}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Modal
