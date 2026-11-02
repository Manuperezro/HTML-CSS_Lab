import React, { useState, useEffect } from 'react';
import { X, Award, Copy, Check, FileCode, FileText, Package, Sparkles, BookCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FINAL_VALID_HTML, FINAL_VALID_CSS } from '../utils/codeAssembler';
import { exportProjectZip, downloadFile } from '../utils/zipExporter';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({ isOpen, onClose }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'css' | 'summary'>('summary');
  const [copied, setCopied] = useState<string | null>(null);
  const [isExportingZip, setIsExportingZip] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      // Fire confetti celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleExportZip = async () => {
    setIsExportingZip(true);
    try {
      await exportProjectZip();
    } finally {
      setIsExportingZip(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '920px', height: '90vh' }} onClick={e => e.stopPropagation()}>
        {/* Celebration Header */}
        <div style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #3d2314 0%, #2b1810 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#c97a3e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)'
            }}>
              <Award size={32} color="#ffffff" />
            </div>
            <div>
              <span className="badge badge-hint" style={{ marginBottom: '4px', display: 'inline-block' }}>
                🎉 BTEC Level 3 Unit 15 Mastered!
              </span>
              <h2 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 800, letterSpacing: '-0.3px', color: '#ffffff' }}>
                CONGRATULATIONS! YOU REBUILT THE BRISTOL BREW CAFÉ WEBSITE!
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              color: '#d8c8ba',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          padding: '0 24px',
          backgroundColor: 'var(--bg-panel-header)',
          borderBottom: '1px solid var(--border-light)',
          gap: '8px'
        }}>
          <button
            onClick={() => setActiveCodeTab('summary')}
            style={{
              padding: '10px 16px',
              fontSize: '0.85rem',
              fontWeight: activeCodeTab === 'summary' ? 700 : 500,
              color: activeCodeTab === 'summary' ? 'var(--cafe-accent)' : 'var(--text-muted)',
              borderBottom: activeCodeTab === 'summary' ? '3px solid var(--cafe-accent)' : '3px solid transparent'
            }}
          >
            Concept Summary & Architecture
          </button>

          <button
            onClick={() => setActiveCodeTab('html')}
            style={{
              padding: '10px 16px',
              fontSize: '0.85rem',
              fontWeight: activeCodeTab === 'html' ? 700 : 500,
              color: activeCodeTab === 'html' ? 'var(--color-html)' : 'var(--text-muted)',
              borderBottom: activeCodeTab === 'html' ? '3px solid var(--color-html)' : '3px solid transparent'
            }}
          >
            Full index.html Source
          </button>

          <button
            onClick={() => setActiveCodeTab('css')}
            style={{
              padding: '10px 16px',
              fontSize: '0.85rem',
              fontWeight: activeCodeTab === 'css' ? 700 : 500,
              color: activeCodeTab === 'css' ? 'var(--color-css)' : 'var(--text-muted)',
              borderBottom: activeCodeTab === 'css' ? '3px solid var(--color-css)' : '3px solid transparent'
            }}
          >
            Full style.css Source
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ flex: 1, padding: '24px' }}>
          {activeCodeTab === 'summary' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* How HTML and CSS work together explanation */}
              <div style={{
                background: 'var(--cafe-cream)',
                border: '1px solid #ebd9c8',
                borderRadius: 'var(--radius-md)',
                padding: '18px'
              }}>
                <h3 style={{ color: 'var(--cafe-primary)', fontSize: '1.05rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="var(--cafe-accent)" />
                  <span>How HTML Structure and CSS Styling Work Together</span>
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--cafe-primary)', lineHeight: 1.55 }}>
                  Throughout the 10 challenges, you experienced firsthand that <strong>HTML provides meaning and structure</strong>, while <strong>CSS governs presentation and layout</strong>:
                </p>
                <ul style={{ paddingLeft: '22px', fontSize: '0.83rem', color: 'var(--cafe-primary)', lineHeight: 1.5, marginTop: '8px' }}>
                  <li><strong>Semantic Hierarchy:</strong> By using tags like <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, and <code>&lt;article&gt;</code>, browsers and assistive technologies understand the exact purpose of every zone of the page.</li>
                  <li><strong>Separation of Concerns:</strong> Keeping HTML files purely structural and linking an external <code>style.css</code> ensures pages load faster, styles can be reused across hundreds of pages, and code remains clean.</li>
                  <li><strong>Responsive Modern Layouts:</strong> With CSS Flexbox (<code>display: flex</code>, <code>gap</code>, <code>flex-wrap</code>), items gracefully adapt across mobile phones, tablets, and desktop displays without breaking.</li>
                </ul>
              </div>

              {/* Concepts learned grid */}
              <div>
                <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BookCheck size={18} color="var(--color-success)" />
                  <span>Skills Mastered in Unit 15: Website Development:</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                  <div style={{ background: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                    <strong>1. Project Architecture:</strong> Root directories, entry points, and media asset subdirectories.
                  </div>
                  <div style={{ background: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                    <strong>2. HTML5 Standards:</strong> DOCTYPE, language attributes, metadata head, and body canvas.
                  </div>
                  <div style={{ background: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                    <strong>3. Semantic Tagging:</strong> Proper navigation landmarks, hero sections, and card articles.
                  </div>
                  <div style={{ background: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                    <strong>4. Accessibility (a11y):</strong> Descriptive alt text, contrast ratios, and semantic jump links.
                  </div>
                  <div style={{ background: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                    <strong>5. CSS Rule Anatomy:</strong> Selectors, properties, units, hexadecimal color codes, and punctuation.
                  </div>
                  <div style={{ background: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                    <strong>6. Responsive Flexbox:</strong> Dynamic rows, wrap behavior, card expansion, and modern gutters.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCodeTab === 'html' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Production-ready index.html (HTML5 standard)
                </span>
                <button
                  onClick={() => handleCopy(FINAL_VALID_HTML, 'html')}
                  className="btn-secondary"
                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  {copied === 'html' ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
                  <span>{copied === 'html' ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre style={{
                flex: 1,
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-main)',
                overflow: 'auto',
                lineHeight: 1.45
              }}>
                {FINAL_VALID_HTML}
              </pre>
            </div>
          )}

          {activeCodeTab === 'css' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Production-ready style.css (Responsive Flexbox & Warm Theme)
                </span>
                <button
                  onClick={() => handleCopy(FINAL_VALID_CSS, 'css')}
                  className="btn-secondary"
                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  {copied === 'css' ? <Check size={14} color="var(--color-success)" /> : <Copy size={14} />}
                  <span>{copied === 'css' ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre style={{
                flex: 1,
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-main)',
                overflow: 'auto',
                lineHeight: 1.45
              }}>
                {FINAL_VALID_CSS}
              </pre>
            </div>
          )}
        </div>

        {/* Action Footer: Downloads */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => downloadFile('index.html', FINAL_VALID_HTML, 'text/html')}
              className="btn-secondary"
              style={{ fontSize: '0.82rem' }}
            >
              <FileCode size={16} color="var(--color-html)" />
              <span>Download index.html</span>
            </button>

            <button
              onClick={() => downloadFile('style.css', FINAL_VALID_CSS, 'text/css')}
              className="btn-secondary"
              style={{ fontSize: '0.82rem' }}
            >
              <FileText size={16} color="var(--color-css)" />
              <span>Download style.css</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleExportZip}
              disabled={isExportingZip}
              className="btn-primary"
              style={{ fontSize: '0.86rem' }}
            >
              <Package size={17} />
              <span>{isExportingZip ? 'Packaging ZIP...' : 'Download Complete Project (.ZIP)'}</span>
            </button>

            <button className="btn-secondary" onClick={onClose}>
              Close & View Live Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
