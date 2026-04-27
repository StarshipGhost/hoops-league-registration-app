import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet } from "../field";

const CustomRadioGroup = ({ handleChange }: { handleChange: (e: string) => void }) => {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">Player Status: </FieldLegend>
      <FieldDescription>Choose the status player will be registered as.</FieldDescription>
      <RadioGroup defaultValue="Confirmed Player" onValueChange={handleChange}>
        <Field orientation="horizontal">
          <RadioGroupItem value="Confirmed Player" id="confirmed" />
          <FieldLabel htmlFor="confirmed" className="font-normal">
            Confirmed Player
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="Potential Player" id="potential" />
          <FieldLabel htmlFor="potential" className="font-normal">
            Potential Player
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  );
};

export default CustomRadioGroup;
