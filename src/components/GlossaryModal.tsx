import React, { useState } from 'react';
import { X, Search, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { GLOSSARY_ITEMS } from '../data/glossaryData';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'HTML' | 'CSS'>('All');

  if (!isOpen) return null;

  const filteredItems = GLOSSARY_ITEMS.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '850px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>
            <BookOpen size={22} color="var(--color-css)" />
            <span>Interactive Web Development Glossary</span>
          </h2>
          <button className="modal-close-btn" onClick={onClose} title="Close Glossary">
            <X size={20} />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div style={{
          padding: '12px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface)'
        }}>
          {/* Search Box */}
          <div style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={16} color="var(--text-faint)" style={{ position: 'absolute', left: '10px' }} />
            <input
              type="text"
              placeholder="Search HTML & CSS terms (e.g. tag, flex, padding, alt)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                fontFamily: 'inherit',
                fontSize: '0.88rem'
              }}
            />
          </div>

          {/* Category Chips */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['All', 'HTML', 'CSS'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  backgroundColor: selectedCategory === cat ? 'var(--cafe-accent)' : 'var(--bg-surface-subtle)',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--text-muted)',
                  border: '1px solid var(--border-medium)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Body Items List */}
        <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '14px' }}>
          {filteredItems.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No terms found matching "{searchQuery}".
            </div>
          ) : (
            filteredItems.map(item => (
              <div
                key={item.term}
                style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
                    {item.term}
                  </span>
                  <span className={item.category === 'HTML' ? 'badge badge-html' : 'badge badge-css'}>
                    {item.category}
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.4 }}>
                  {item.definition}
                </p>

                {/* Real-world Analogy */}
                <div style={{
                  padding: '6px 10px',
                  backgroundColor: 'var(--cafe-cream)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  color: 'var(--cafe-primary)',
                  display: 'flex',
                  gap: '6px'
                }}>
                  <Sparkles size={14} color="var(--cafe-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Analogy:</strong> {item.realWorldAnalogy}</span>
                </div>

                {/* Code Snippet */}
                <pre style={{
                  backgroundColor: '#ffffff',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#1e293b',
                  margin: 0,
                  overflowX: 'auto'
                }}>
                  {item.codeSnippet}
                </pre>

                {/* Common Mistake */}
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-error)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '5px'
                }}>
                  <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span><strong>Mistake:</strong> {item.commonMistake}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close Glossary
          </button>
        </div>
      </div>
    </div>
  );
};
