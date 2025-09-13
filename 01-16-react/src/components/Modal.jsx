import css from './Modal.module.css';

const Modal = ({ children, title, onClose }) => {
    return (
        <div className={css.modal}>
            <div className={css.modal_header}>
                <h2 className={css.modal_header_title}>{title}</h2>
                <button className={css.modal_header_closeButton} aria-label="Close" onClick={onClose}></button>
            </div>
            <div className={css.modal_content}>
                {children}
            </div>
        </div>
    );
}

export default Modal;