import { useCallback, useState } from 'react';
import LoginModal from './components/LoginModal';

const App = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [changingValue, setChangingValue] = useState(false);

    const onLoginButtonClick = () => {
        setIsLoginOpen(true);
    }

    const onChangeButtonClick = () => {
        setChangingValue(!changingValue);
        console.log('Changing value:', !changingValue);
    }

    const onLoginClose = useCallback(() => {
        setIsLoginOpen(false);
    }, []);

    return <div className="app">
        <h1>Some header</h1>
        <button onClick={onChangeButtonClick}>Change</button>
        <button onClick={onLoginButtonClick}>Login</button>
        {isLoginOpen && <LoginModal onClose={onLoginClose} />}
    </div>
}

export default App;
