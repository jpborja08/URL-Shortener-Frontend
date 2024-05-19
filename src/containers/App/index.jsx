import React from 'react';
import ReactModal from 'react-modal';

import Header from '@components/Header';
import { isSignedIn } from '@api/utils';
import Main from '../Main';

import './styles.scss';

ReactModal.setAppElement('#root');

const App = () => {

  return (
    <div className="app-container">
      <div className="main-container">
        <Header className="header" />
        <Main className="main" />
      </div>
    </div>
  );
};

export default App;
