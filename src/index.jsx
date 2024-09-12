import { createRoot } from 'react-dom/client';
import MainView from './components/main-view/main-view';
import './index.scss';
import Container from 'react-bootstrap/Container';

// Main component (will eventually use all the others)
const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);
