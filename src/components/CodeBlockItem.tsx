import React from 'react';
import { GripVertical, ChevronUp, ChevronDown, HelpCircle } from 'lucide-react';
import type { CodeBlock } from '../types/challenge';

interface CodeBlockItemProps {
  block: CodeBlock;
  index: number;
  totalBlocks: number;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onExplain?: (key: string) => void;
  isDraggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  nestingLevel?: number;
}

export const CodeBlockItem: React.FC<CodeBlockItemProps> = ({
  block,
  index,
  totalBlocks,
  onMoveUp,
  onMoveDown,
  onExplain,
  isDraggable = true,
  onDragStart,
  onDragOver,
  onDrop,
  nestingLevel = 0
}) => {
  // Syntax highlighting renderer
  const renderHighlightedCode = (text: string) => {
    // Check if it's HTML or CSS
    if (block.tagType === 'css' || block.type === 'selector' || block.type === 'declaration' || block.type === 'property' || block.type === 'bracket') {
      // Simple CSS highlighting
      if (block.type === 'selector') {
        return <span style={{ color: 'var(--color-css)', fontWeight: 700 }}>{text}</span>;
      }
      if (block.type === 'bracket') {
        return <span style={{ color: 'var(--text-main)', fontWeight: 800 }}>{text}</span>;
      }
      if (text.includes(':')) {
        const [prop, val] = text.split(':');
        return (
          <span>
            <span style={{ color: '#7c3aed', fontWeight: 600 }}>{prop}:</span>
            <span style={{ color: '#059669', fontWeight: 500 }}>{val}</span>
          </span>
        );
      }
      return <span style={{ color: 'var(--text-main)' }}>{text}</span>;
    }

    // HTML highlighting
    // Matches tags <...>, attributes, and strings
    const parts = text.split(/(<[^>]+>)/g);
    return parts.map((part, i) => {
      if (part.startsWith('<') && part.endsWith('>')) {
        // Tag with potential attributes
        const isClosing = part.startsWith('</');
        const isDoctype = part.startsWith('<!DOCTYPE');

        if (isDoctype) {
          return <span key={i} style={{ color: '#b45309', fontWeight: 700 }}>{part}</span>;
        }

        // Highlight attributes inside tag
        const tagMatch = part.match(/^<\/?([a-zA-Z0-9]+)/);
        const tagName = tagMatch ? tagMatch[1] : '';

        return (
          <span key={i}>
            <span style={{ color: '#94a3b8' }}>&lt;{isClosing ? '/' : ''}</span>
            <span style={{ color: 'var(--color-html)', fontWeight: 700 }}>{tagName}</span>
            {renderAttributes(part.slice((isClosing ? 2 : 1) + tagName.length, -1))}
            <span style={{ color: '#94a3b8' }}>&gt;</span>
          </span>
        );
      }
      return <span key={i} style={{ color: 'var(--text-main)', fontWeight: 500 }}>{part}</span>;
    });
  };

  const renderAttributes = (attrString: string) => {
    if (!attrString.trim()) return null;
    // Regex for attr="val"
    const regex = /([a-zA-Z-]+)(="[^"]*")?/g;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(attrString)) !== null) {
      if (match.index > lastIndex) {
        elements.push(attrString.substring(lastIndex, match.index));
      }
      const attrName = match[1];
      const attrVal = match[2];

      elements.push(
        <span key={match.index} style={{ marginLeft: '4px' }}>
          <span style={{ color: '#d97706', fontWeight: 600 }}>{attrName}</span>
          {attrVal && (
            <span>
              <span style={{ color: '#94a3b8' }}>=</span>
              <span style={{ color: '#059669', fontWeight: 500 }}>{attrVal.slice(1)}</span>
            </span>
          )}
        </span>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < attrString.length) {
      elements.push(attrString.substring(lastIndex));
    }

    return elements;
  };

  // Determine indent offset
  const indentPadding = Math.min(nestingLevel, 4) * 20;

  return (
    <div
      draggable={isDraggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        marginLeft: `${indentPadding}px`,
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-light)',
        borderLeft: nestingLevel > 0 ? '3px solid var(--cafe-accent)' : '1px solid var(--border-light)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: '6px',
        boxShadow: 'var(--shadow-sm)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.88rem',
        cursor: isDraggable ? 'grab' : 'default',
        transition: 'all 0.15s ease-in-out',
        position: 'relative'
      }}
    >
      {/* Drag Grip Handle */}
      {isDraggable && (
        <div style={{ color: 'var(--text-faint)', marginRight: '8px', cursor: 'grab', display: 'flex', alignItems: 'center' }}>
          <GripVertical size={16} />
        </div>
      )}

      {/* Code Text Content */}
      <div style={{ flex: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: 1.4 }}>
        {renderHighlightedCode(block.content)}
      </div>

      {/* Action Buttons: Move Up, Move Down, Explain */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginLeft: '12px' }}>
        {onMoveUp && (
          <button
            onClick={onMoveUp}
            disabled={index === 0}
            title="Move block up"
            style={{
              padding: '3px',
              borderRadius: '4px',
              color: index === 0 ? 'var(--border-medium)' : 'var(--text-muted)',
              cursor: index === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronUp size={16} />
          </button>
        )}

        {onMoveDown && (
          <button
            onClick={onMoveDown}
            disabled={index === totalBlocks - 1}
            title="Move block down"
            style={{
              padding: '3px',
              borderRadius: '4px',
              color: index === totalBlocks - 1 ? 'var(--border-medium)' : 'var(--text-muted)',
              cursor: index === totalBlocks - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronDown size={16} />
          </button>
        )}

        {block.explanationKey && onExplain && (
          <button
            onClick={() => onExplain(block.explanationKey!)}
            title="Explain this code block"
            style={{
              padding: '4px 7px',
              borderRadius: '4px',
              backgroundColor: 'var(--color-hint-bg)',
              color: 'var(--color-hint)',
              border: '1px solid rgba(245, 127, 23, 0.3)',
              fontSize: '0.72rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              marginLeft: '4px'
            }}
          >
            <HelpCircle size={13} />
            <span>Explain</span>
          </button>
        )}
      </div>
    </div>
  );
};
