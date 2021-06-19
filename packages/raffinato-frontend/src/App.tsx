import React from 'react';
import './design-system/scss/index.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit
          <code>src/App.tsx</code>
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      base url: {process.env.REACT_APP_API_BASE_URL}
    </div>
  );
}

export default App;
