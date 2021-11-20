import IconCustomLogo from '~icons/custom/logo'
import { Link } from 'react-router-dom'

import IconRoundArrowBack from '~icons/ic/round-arrow-back-ios'
import { ReactChild } from 'react'

interface Props {
  children: ReactChild
}

const Navbar = ({ children }: Props) => {
  return (
    <div className="py-3 h-18 bg-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-0">
        <Link to="/" className="px-1.5">
          <IconCustomLogo className="hidden lg:block" />
          <IconRoundArrowBack className="block lg:hidden" />
        </Link>
        {children}
      </div>
    </div>
  )
}


export default  Navbar