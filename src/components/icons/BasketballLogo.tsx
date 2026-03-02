import {useHeaderContext} from '../customs/HeaderContext'

export const BasketballLogo = () => {
  const {scrollFunction} = useHeaderContext()
  return (
    <div onClick={() => { if (scrollFunction) scrollFunction(0) }} className="dark:text-white flex items-center gap-2 cursor-pointer">
      <div className="bg-orange-500/90 relative flex min-w-8.5 h-8.5 rounded-lg">
        <div className="text-xl absolute top-[2px] right-[3px]">🏀</div>
      </div>
      <div className="text-lg leading-tight  sm:text-xl font-bold">
        <a>Hoops League</a>
      </div>
    </div>
  )
}

export default BasketballLogo