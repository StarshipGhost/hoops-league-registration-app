import {createContext, useContext} from 'react'

interface ThemeProps {
  darkMode: boolean
  toggleThemeMode: () => void
}

interface AuthModalProps {
  authModalActive: boolean
  toggleAuthModal: () => void
}

export const HeaderContext = createContext<{scrollFunction: (index: number) => void; theme: ThemeProps; authModal: AuthModalProps} | undefined>(undefined)

export const useHeaderContext = () => {
  const headerContext = useContext(HeaderContext)
  if (headerContext === undefined) {
    throw new Error('Error')
  }
  return headerContext
}
