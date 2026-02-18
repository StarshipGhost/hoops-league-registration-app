import {createContext, useContext} from 'react'

export const HeaderContext = createContext<{scrollFunction: (index: number) => void; darkMode: boolean; toggleThemeMode: () => void} | undefined>(undefined)

export const useHeaderContext = () => {
  const headerContext = useContext(HeaderContext)
  if (headerContext === undefined) {
    throw new Error('Error')
  }
  return headerContext
}
