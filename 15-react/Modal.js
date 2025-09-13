import { useState } from 'react';
import { Button } from './button';

const Modal = () => {
    const [inputText, setInputText] = useState('');
    const [isOkActive, setIsOkActive] = useState(false);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputText(newValue);
        // setIsOkActive(!!newValue);
    };

    // Called once when the component is mounted.
    useEffect(() => {
        // Called when the component is unmounted.
        return () => { };
    }, []);

    // Called on each render pass.
    useEffect(() => { });

    // Called when inputText is set.
    useEffect(
        () => {
            setIsOkActive(!!inputText);
        },
        [inputText]);

    return <div>
        <h1>Modal</h1>
        <label for="modalInput">Enter text:</label>
        <input label="modalInput" type="text" value={inputText} onChange={handleInputChange} />
        <Button caption="Close" onClick={() => console.log('Modal closed')} />
        <Button caption="OK" onClick={() => console.log('OK pressed')} isActive={isOkActive} />
        {!!inputText && <p>Text: {inputText}</p>}
    </div>;
};

export default Modal;
