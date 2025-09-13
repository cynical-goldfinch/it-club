import { createRoot } from 'react-dom/client';

import App from './App';

import './styles.css';

const rootView = document.getElementById('root');
const reactRoot = createRoot(rootView);

reactRoot.render(<App></App>);
