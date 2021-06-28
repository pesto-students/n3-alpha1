import { get } from 'lib/fetch';

const getSettings = () => {
  return get('settings');
};

export default getSettings;
