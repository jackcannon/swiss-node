import chalk from 'chalk';
import { chlk } from '../../chlk';

interface SectionStyle {
  dark: Function;
  mid: Function;
  normal: Function;
  tertiary: Function;
  secondary: Function;
  primary: Function;
}
export const sectionStyles: { sectActive: SectionStyle; sectInactive: SectionStyle } = {
  sectActive: {
    dark: chlk.gray1,
    mid: chlk.gray3,
    normal: chalk.white,
    tertiary: chalk.yellowBright,
    secondary: chalk.bgWhite.black,
    primary: chalk.bgYellow.black
  },
  sectInactive: {
    dark: chlk.gray1,
    mid: chlk.gray2,
    normal: chlk.gray3,
    tertiary: chalk.yellow,
    secondary: chalk.bgGray.black,
    primary: chalk.bgWhite.black
  }
};
export const getStyles = (active: boolean): SectionStyle => (active ? sectionStyles.sectActive : sectionStyles.sectInactive);
