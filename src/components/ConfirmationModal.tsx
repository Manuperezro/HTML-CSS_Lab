import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'danger' | 'primary' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'primary',
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <AlertTriangle size={20} color={confirmVariant === 'danger' ? 'var(--color-error)' : 'var(--color-hint)'} />
            <span>{title}</span>
          </h2>
          <button className="modal-close-btn" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
            {message}
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={confirmVariant === 'danger' ? 'btn-primary' : 'btn-primary'}
            style={{
              backgroundColor: confirmVariant === 'danger' ? 'var(--color-error)' : undefined
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
