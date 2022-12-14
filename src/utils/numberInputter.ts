import { ms, seconds } from 'swiss-ak';

export const getNumberInputter = (timeout: ms = seconds(1.5)) => {
  let lastKeyTimecode: ms = 0;
  let logged: number[] = [];

  const get = () => Number(logged.join(''));

  return {
    input: (num: number) => {
      const now = Date.now();
      if (now - lastKeyTimecode > timeout) logged = [];
      lastKeyTimecode = now;

      logged.push(num);
      return get();
    },
    reset: () => {
      const now = Date.now();
      lastKeyTimecode = now;
      logged = [];
      return get();
    },
    backspace: () => {
      const now = Date.now();
      lastKeyTimecode = now;
      logged = logged.slice(0, -1);
      return get();
    },
    get
  };
};
