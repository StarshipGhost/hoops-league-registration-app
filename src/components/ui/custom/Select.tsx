'use client'

import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Label} from '../label'
import type {Location} from '../../../types/Location';

export function DropdownSelect({label, options, location, setCurrentValue}: {label : string, options: Location[], location: Location | undefined, setCurrentValue: React.Dispatch<React.SetStateAction<Location | undefined>>}) {
  return (
    <Select value={location?.name ?? ""} onValueChange={(selected: string) => setCurrentValue(options.find((option) => option.name === selected))} >
      <Label>{label}</Label>
      <SelectTrigger className="w-full mt-2 hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 focus:border-none focus:ring-2 focus:ring-orange-500/90 dark:focus:ring-orange-400 cursor-pointer">
        <SelectValue  className='dark:text-white' defaultValue={"Select a location"} placeholder="Select a location">
        </SelectValue> 
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-black z-9999" position='popper'>
        <SelectGroup >
          <SelectLabel>{label.replace(':', 's')}</SelectLabel>
              {options.map(({name}) => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}


export default DropdownSelect;
