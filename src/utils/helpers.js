import moment from 'moment';

export function formatTime(timestamp) {
  return moment(timestamp*1000).format('YYYY-MM-DD h:mm:ss a');
}