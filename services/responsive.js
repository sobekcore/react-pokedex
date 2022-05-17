import { Responsive } from "services/enums";

const checkIfMobile = () => {
  const media = window.matchMedia(`(max-width: ${Responsive.MOBILE_BREAKPOINT}px)`);
  return media.matches ? media.matches : false;
};

export { checkIfMobile };
