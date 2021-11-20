import { RootState } from '@/store'
import { toggleMode } from '@/store/feature/share'
import { MouseEvent, ReactChild } from 'react'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
  children: ReactChild[]
}

function BaseNav({ children }: Props) {
  const mode = useSelector<RootState, boolean>((state) => state.share.mode)

  const dispatch = useDispatch()
  const handlerClick = (e: MouseEvent, value: boolean) => {
    e.preventDefault()
    dispatch(toggleMode(value))
  }
  return (
    <nav className="
      rounded-full
      relative
      w-2/12
      h-full
      bg-white 
      hidden lg:flex
      items-center
    ">
      <a
        href="#"
        className={`
          flex-1 flex items-center justify-center
          rounded-full
          px-5 py-3
          tracking-10px
          ${mode ? 'bg-black text-primary' : ''}
        `}
        onClick={($e) => handlerClick($e, true)}
      >
        {children[0]}
      </a>
      <a
        href="#"
        className={`
          flex-1 flex items-center justify-center
          rounded-full 
          px-5 py-3
          tracking-10px
          ${mode ? '' : 'bg-black text-primary'}
        `}
        onClick={($e) => handlerClick($e, false)}
      >
        {children[1]}
      </a>
    </nav>
  )
}

export default BaseNav