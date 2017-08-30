//https://gist.github.com/LeverOne/1308368

export function uuidv4(a,b){for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b}

export const valFromLangObj = (langObj, code = 'en') => {
  if(!langObj) {
    return '';
  }
  return Object.keys(langObj).reduce((val, key) => {
    if(key === code) {
      return langObj[key];
    }
    if(!val) {
      return langObj[key];
    }
    return val;
  }, '');
}