import Modal from './Modal';

import css from './LoginModal.module.css';
import { use, useEffect } from 'react';

const LoginModal = ({ onClose }) => {

    useEffect(() => {
        console.log('useEffect: on Close');
    }, [onClose]);

    return (
        <Modal title="Login" onClose={onClose}>
            <form>
                <div className={css.login_inputGroup}>
                    <label className={css.login_inputGroup_label} htmlFor="username">Username</label>
                    <input className={css.login_inputGroup_input} name="username" type="text"></input>
                </div>
                <div className={css.login_inputGroup}>
                    <label className={css.login_inputGroup_label} htmlFor="password">Password</label>
                    <input className={css.login_inputGroup_input} name="password" type="password"></input>
                </div>
                <div className={css.login_buttonGroup}>
                    <button className={css.login_buttonGroup_button}>Login</button>
                </div>
            </form>
        </Modal>
    );
}

export default LoginModal;