import css from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function Modal({ onClose, largeImage }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={largeImage} alt="BigImg" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
};
