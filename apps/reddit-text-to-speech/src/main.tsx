import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import { AppContextProvider } from './app/app-context';

ReactDOM.render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </StrictMode>,
  document.getElementById('root')
);
