'use client'

import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Label} from '../label'
import type {Location} from '../../../types/Location';

interface DropdownFormProps <T extends Location> {
    label: string
    options : T[],
    option: T | undefined
    setCurrentOption: React.Dispatch<React.SetStateAction<T | undefined>>
}

export function DropdownSelect<T extends Location> ({label, options, option, setCurrentOption}: DropdownFormProps<T>) {
  return (
    <Select value={option?.name ?? ""} onValueChange={(selected: string) => setCurrentOption(options.find((option) => option.name === selected))} >
      <Label>{`${ label }:`}</Label>
      <SelectTrigger className="w-full dark:text-white dark:data-placeholder:text-muted-foreground hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 focus:border-none focus:ring-2 focus:ring-orange-500/90 dark:focus:ring-orange-400 cursor-pointer">
        <SelectValue  className='' defaultValue={`Select a ${label.toLowerCase()}`} placeholder={ `Select a ${ label.toLowerCase() }` }>
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
