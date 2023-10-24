import './App.css';
import { PureComponent } from 'react';
import HomePage from './pages/Home-page';
import Header from './components/Header';

export default class App extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <HomePage />
      </>
    );
  }
}
