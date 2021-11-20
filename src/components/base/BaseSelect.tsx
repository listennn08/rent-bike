import styled from 'styled-components'
import {  } from 'styled-components'
import IconTriangleDown from '~icons/octicon/triangle-down-16'

// type TOption<T> = {
//   [key: string]: T
// } | string

interface IProps <T>{
  placeholder: string
  options: T[]
  value: T
  text: string
  change: (value: T) => void
}

const Dropdown = styled.ul<{ isOpen: boolean}>`
  display: ${(props) => props.isOpen ? 'block' : 'none'};
  padding: 0;
  list-style: none;
  position: absolute;
  top: 2.5rem;
  left: 0;
  right: 0;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  --tw-shadow-color: 0, 0, 0;
  --tw-shadow: 0 1px 3px 0 rgba(var(--tw-shadow-color), 0.1), 0 1px 2px 0 rgba(var(--tw-shadow-color), 0.06);
  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  background-color: #000;
  max-height: 20rem;
  overflow-y: scroll;
  z-index: 999;
  min-height: 2rem;

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    width: 0;
  }
  
  @media (min-width: 768px) and (max-width: 1023.9px) {
    top: 2.4rem;
  }
  @media (min-width: 1024px) and (max-width: 1279.9px) {
    top: 1.4rem;
  }
}
`

const DropdownItem = styled.li`
  margin-bottom: 0.25rem;
  padding-top: 0.325rem
  padding-bottom: 0.325rem;
  padding-right: 1rem;
  padding-left: 1rem;
  trasition: color .15s ease-in;
  cursor: pointer;
  background-color: #000;
  color: #fff;

  &:hover {
    background-color: #FED801;
    color: #000
  }
`

function BaseSelect<T>({
  options,
  placeholder,
  value,
  text,
  change,
}: IProps<T>) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleDropdownClick = (v: T) => {
    change(v)
    setMenuOpen(false)
  }

  const setText = (option: T) => {
    if (typeof option === 'object') {
      const o = option as { [key: string]: any }
      if (text) return o[text]
    }
    return option
  }

  return (
    <div className="relative">
      <div
        className={`
          shadow-md
          w-full
          pl-4 pr-4.5 py-1
          bg-black text-white
          relative
          min-h-10 h-full
          flex items-center
          ${menuOpen ? 'rounded-t-xl' : 'rounded-full'} 
        `}
      >
        <button
          className="flex items-center w-full h-full focus:outline-none pr-8"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>{setText(value) ? setText(value) : placeholder }</span>
          <IconTriangleDown className="absolute right-2 inset-y-1/2 transform -translate-y-1/2"/>
        </button>
      </div>
      <Dropdown isOpen={menuOpen}>
        {options.map((option, index) => (
          <DropdownItem
            key={`${setText(option)}${index}`}
            data-value="options"
            onClick={() => handleDropdownClick(option)}
          >
            {setText(option)}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  )
}

export default BaseSelect