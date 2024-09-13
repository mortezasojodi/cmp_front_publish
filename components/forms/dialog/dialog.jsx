import React from 'react';
import styles from './dialog.module.css'; // Подключаем стили для диалога

function Dialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        {children}
        {/* <button className={styles.closeButton} onClick={onClose}>
          Close
        </button> */}
      </div>
    </div>
  );
}

export default Dialog;