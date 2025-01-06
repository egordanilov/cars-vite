import classnames from './Modal.module.scss'; // Import some basic styles

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={classnames.modalOverlay} onClick={onClose}>
            <div className={classnames.modalContent} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className={classnames.closeButton}>&times;</button>
                {children}
            </div>
        </div>
    );
};