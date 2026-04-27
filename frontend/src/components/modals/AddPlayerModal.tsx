import { useState, type ChangeEvent } from "react";
import CloseButton from "../customs/CloseButton";
import Modal from "./Modal";
import CustomRadioGroup from "../ui/custom/RadioGroup";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { Player } from "@/types/Player";
import { registrationTimeFormat } from "@/utils/timeString";

const AddPlayerModalCard = ({ closeCard, addPlayer }: { closeCard: () => void; addPlayer: (player: Player) => void }) => {
  const [name, setName] = useState<string>("");
  const [currentOption, setCurrentOption] = useState<"Confirmed Player" | "Potential Player">("Confirmed Player");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleOptionChange = (e: string) => {
    const option = (selectedOption: string): "Confirmed Player" | "Potential Player" => {
      return selectedOption === "Confirmed Player" ? "Confirmed Player" : "Potential Player";
    };
    setCurrentOption(option(e));
  };

  const handleAddPlayer = (player: Player) => {
    addPlayer(player);
    setName('');
    closeCard();
  };
  const handleCancel = () => {
    setName('');
    closeCard();
  };

  return (
    <Card className="w-105">
      <CardHeader className="relative">
        <CloseButton closeFunction={handleCancel} />
        <CardTitle className="text-xl mr-5">Include a player</CardTitle>
        <CardDescription>
          Add a new player upon his request in the case where he's indisposed to register himself at this time.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label className="text-sm lg:text-md" htmlFor="name"> First Name: </Label>
          <Input id="name" type="text" onChange={(e) => handleNameChange(e)} value={name} placeholder="Name" required />
        </div>
        <CustomRadioGroup handleChange={(e) => handleOptionChange(e)} />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" variant="orange" onClick={() => handleAddPlayer({ firstName: name, status: currentOption, registrationTime: registrationTimeFormat(new Date()), }) } >
          Add Player
        </Button>
        <Button type="reset" variant="white" onClick={handleCancel}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

const AddPlayerModal = ({
  isActive,
  closeCard,
  addPlayer,
}: {
  isActive: boolean;
  closeCard: () => void;
  addPlayer: (player: Player) => void;
}) => {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    return addPlayer;
  };

  return (
    <Modal isModalActive={isActive} onSubmit={handleSubmit}>
      <AddPlayerModalCard closeCard={closeCard} addPlayer={addPlayer} />
    </Modal>
  );
};

export default AddPlayerModal;
