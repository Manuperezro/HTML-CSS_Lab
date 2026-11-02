import React from 'react';
import { X, HelpCircle, AlertCircle, Code, Lightbulb } from 'lucide-react';
import { CODE_EXPLANATIONS } from '../data/codeExplanations';

interface ExplainCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeKey: string | null;
  onSelectKey: (key: string) => void;
}

export const ExplainCodeModal: React.FC<ExplainCodeModalProps> = ({
  isOpen,
  onClose,
  activeKey,
  onSelectKey
}) => {
  if (!isOpen) return null;

  const currentExplanation = (activeKey && CODE_EXPLANATIONS[activeKey]) ? CODE_EXPLANATIONS[activeKey] : CODE_EXPLANATIONS['doctype'];
  const allKeys = Object.keys(CODE_EXPLANATIONS);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '800px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>
            <HelpCircle size={22} color="var(--color-css)" />
            <span>Explain This Code: {currentExplanation.title}</span>
          </h2>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        {/* Quick Element Switcher Bar */}
        <div style={{
          padding: '10px 20px',
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: 'var(--bg-surface-subtle)',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {allKeys.map(k => {
            const exp = CODE_EXPLANATIONS[k];
            const isSelected = k === activeKey || (!activeKey && k === 'doctype');
            return (
              <button
                key={k}
                onClick={() => onSelectKey(k)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? 'var(--cafe-accent)' : 'var(--bg-surface)',
                  color: isSelected ? '#ffffff' : 'var(--text-muted)',
                  border: '1px solid var(--border-medium)',
                  flexShrink: 0
                }}
              >
                {exp.elementOrProperty}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Element Type Badge & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-html">{currentExplanation.type}</span>
            <code style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
              {currentExplanation.title}
            </code>
          </div>

          {/* 1. What it does */}
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Code size={16} color="var(--color-css)" />
              <span>What It Does:</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              {currentExplanation.whatItDoes}
            </p>
          </div>

          {/* 2. Why it is used */}
          <div style={{ background: 'var(--cafe-cream)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid #ebd9c8' }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--cafe-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lightbulb size={16} color="var(--cafe-accent)" />
              <span>Why We Use It:</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--cafe-primary)', lineHeight: 1.5 }}>
              {currentExplanation.whyUsed}
            </p>
          </div>

          {/* 3. Simple syntax example */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '4px' }}>
              Code Example:
            </div>
            <pre style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'var(--text-main)',
              overflowX: 'auto'
            }}>
              {currentExplanation.syntaxExample}
            </pre>
          </div>

          {/* 4. One common mistake */}
          <div style={{ background: 'var(--color-error-bg)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(198,40,40,0.2)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-error)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={16} />
              <span>Common Student Mistake:</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
              {currentExplanation.commonMistake}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Back to Code
          </button>
        </div>
      </div>
    </div>
  );
};
