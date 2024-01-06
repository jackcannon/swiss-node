import chalk from 'chalk';
import { colr } from '../../colr';

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
    dark: colr.gray1,
    mid: colr.gray3,
    normal: chalk.white,
    tertiary: chalk.yellowBright,
    secondary: chalk.bgWhite.black,
    primary: chalk.bgYellow.black
  },
  sectInactive: {
    dark: colr.gray1,
    mid: colr.gray2,
    normal: colr.gray3,
    tertiary: chalk.yellow,
    secondary: chalk.bgGray.black,
    primary: chalk.bgWhite.black
  }
};
export const getStyles = (active: boolean): SectionStyle => (active ? sectionStyles.sectActive : sectionStyles.sectInactive);
