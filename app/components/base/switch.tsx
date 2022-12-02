import styled from "styled-components";

interface SwitchProps {
  toggle: boolean;
}

interface IProps extends SwitchProps {
  setToggle?: (v: boolean) => void;
}

const Switch = styled.div<SwitchProps>`
  &::before {
    content: "";
    position: absolute;
    left: ${(props) => (props.toggle ? "0.25rem" : "75%")};
    right: 0.25rem;
    top: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: ${(props) => (props.toggle ? "#FED801" : "#fff")};
    border-radius: 100%;
    transition: left 0.2s ease-in;
    z-index: 2;
  }
`;

function BaseSwitch({ toggle, setToggle }: IProps) {
  return (
    <Switch
      toggle={toggle}
      className={`rounded-full py-1 ${
        toggle ? "pl-8 pr-3 bg-white" : "pl-3 pr-8 bg-black text-white"
      } relative cursor-pointer transition-all w-28 h-8`}
      onClick={() => setToggle!(!toggle)}
    >
      <div
        className={`${
          toggle ? "left-8" : "left-full"
        } overflow-hidden transition-all absolute inset-y-1 right-3 select-none`}
      >
        隱藏車道
      </div>
      <div
        className={`${
          !toggle ? "right-0" : "right-full"
        } overflow-hidden transition-all absolute inset-y-1 left-3  select-none`}
      >
        顯示車道
      </div>
    </Switch>
  );
}

export default BaseSwitch;
