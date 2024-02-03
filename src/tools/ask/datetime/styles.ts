import { getAskOptionsForState } from '../basicInput/customise';

export const getSpecialColours = (isActive: boolean, isComplete: boolean, isError: boolean) => {
  const { colours: col } = getAskOptionsForState(isComplete, isError);

  return {
    hover: isActive ? col.specialHover : col.specialInactiveHover,
    selected: isActive ? col.specialSelected : col.specialInactiveSelected,
    highlight: isActive ? col.specialHighlight : col.specialInactiveHighlight,
    normal: isActive ? col.specialNormal : col.specialInactiveNormal,
    faded: isActive ? col.specialFaded : col.specialInactiveFaded,
    hint: isActive ? col.specialHint : col.specialInactiveHint,
    info: col.specialInfo
  };
};
