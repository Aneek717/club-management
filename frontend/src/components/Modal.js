import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, title, message, type = 'alert', onConfirm, onCancel, confirmText = 'OK', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content modal-${type}`}>
        <div className="modal-header">
          <h2>{title}</h2>
          <div className={`modal-icon modal-icon-${type}`}>
            {type === 'success' && '✓'}
            {type === 'error' && '✕'}
            {type === 'warning' && '!'}
            {type === 'confirm' && '?'}
            {type === 'alert' && 'ℹ'}
          </div>
        </div>
        
        <div className="modal-body">
          <p>{message}</p>
        </div>

        <div className="modal-footer">
          {type === 'confirm' ? (
            <>
              <button className="modal-btn modal-btn-secondary" onClick={onCancel}>
                {cancelText}
              </button>
              <button className="modal-btn modal-btn-primary" onClick={onConfirm}>
                {confirmText}
              </button>
            </>
          ) : (
            <button className="modal-btn modal-btn-primary" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
