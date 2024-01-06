import { WrapFn, colr } from '../../colr';

interface SectionStyle {
  dark: WrapFn;
  mid: WrapFn;
  normal: WrapFn;
  tertiary: WrapFn;
  secondary: WrapFn;
  primary: WrapFn;
}
export const sectionStyles: { sectActive: SectionStyle; sectInactive: SectionStyle } = {
  sectActive: {
    dark: colr.grey1,
    mid: colr.grey3,
    normal: colr.dark.white,
    tertiary: colr.yellow,
    secondary: colr.darkBg.whiteBg.black,
    primary: colr.darkBg.yellowBg.black
  },
  sectInactive: {
    dark: colr.grey1,
    mid: colr.grey2,
    normal: colr.grey3,
    tertiary: colr.dark.yellow,
    secondary: colr.greyBg.black,
    primary: colr.darkBg.whiteBg.black
  }
};
export const getStyles = (active: boolean): SectionStyle => (active ? sectionStyles.sectActive : sectionStyles.sectInactive);
