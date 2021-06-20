import { Provider as ReduxProvider } from 'react-redux';

import store from 'store/store';
import '../src/design-system/css/index.css';
// todo: make the sass loader work for storybook

export const decorators = [
  Story => (
    <ReduxProvider store={store}>
      <Story />
    </ReduxProvider>
  )
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}