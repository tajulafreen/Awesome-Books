import { DateTime } from '../node_modules/luxon/src/luxon.js';

export const currenttimeanddate = () => {
  const currentTime = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
  const date = document.getElementById('now');
  date.textContent = currentTime;
};

