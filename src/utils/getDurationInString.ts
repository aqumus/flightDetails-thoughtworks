import moment, { Duration } from 'moment';

export function getDurationInString(duration: Duration) {
  return moment.utc(duration.asMilliseconds()).format('HH[h] mm[m]');
  // const days = duration.days();
  // const hours = duration.hours();
  // const minutes = duration.minutes();
  // return `${days ? days + 'd' : ''}${hours ? hours + 'h' : ''}${
  //   minutes ? minutes + 'm' : ''
  // }`;
}
