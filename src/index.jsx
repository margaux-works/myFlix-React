import { createRoot } from 'react-dom/client';
import MainView from './components/main-view/main-view';
import './index.scss';

// Main component (will eventually use all the others)
const App = () => {
  return <MainView />;
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);
