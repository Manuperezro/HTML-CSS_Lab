import React from 'react';
import { FileCode, FileText, Bug } from 'lucide-react';
import type { ChallengeId, CodeBlock } from '../types/challenge';
import { CodeBlockItem } from './CodeBlockItem';
import type { BugFixState } from '../utils/codeAssembler';

interface CodeEditorProps {
  currentChallengeId: ChallengeId;
  activeTab: 'index.html' | 'style.css' | 'files';
  onSelectTab: (tab: 'index.html' | 'style.css' | 'files') => void;
  blocks: CodeBlock[];
  onReorderBlocks: (newBlocks: CodeBlock[]) => void;
  onExplainBlock: (key: string) => void;
  bugState: BugFixState;
  onToggleBug: (bugKey: keyof BugFixState) => void;
  onMoveChallenge8Block?: (blockId: string, targetCategory: string) => void;
  onMoveChallenge9Block?: (blockId: string, targetCategory: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  currentChallengeId,
  activeTab,
  onSelectTab,
  blocks,
  onReorderBlocks,
  onExplainBlock,
  bugState,
  onToggleBug,
  onMoveChallenge8Block,
  onMoveChallenge9Block
}) => {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  // Drag-and-drop handlers for generic list
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(targetIndex, 0, movedBlock);

    onReorderBlocks(newBlocks);
    setDraggedIndex(null);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index - 1];
    newBlocks[index - 1] = temp;
    onReorderBlocks(newBlocks);
  };

  const handleMoveDown = (index: number) => {
    if (index >= blocks.length - 1) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index + 1];
    newBlocks[index + 1] = temp;
    onReorderBlocks(newBlocks);
  };

  // Compute nesting level for HTML blocks
  const getNestingLevel = (block: CodeBlock): number => {
    if (block.tagType !== 'html') return 0;
    if (block.content.startsWith('<!DOCTYPE') || block.content.startsWith('<html') || block.content.startsWith('</html>')) {
      return 0;
    }
    if (block.content.startsWith('<head') || block.content.startsWith('</head>') || block.content.startsWith('<body') || block.content.startsWith('</body>')) {
      return 1;
    }
    if (block.content.includes('<meta') || block.content.includes('<title') || block.content.includes('<link') || block.content.includes('<header') || block.content.includes('</header>') || block.content.includes('<main') || block.content.includes('</main>') || block.content.includes('<footer') || block.content.includes('</footer>')) {
      return 2;
    }
    if (block.content.includes('<nav') || block.content.includes('</nav>') || block.content.includes('<section') || block.content.includes('</section>') || block.content.includes('<h1') || block.content.includes('<h1>')) {
      return 3;
    }
    return 4;
  };

  return (
    <section style={{
      flex: 1,
      backgroundColor: 'var(--bg-surface-subtle)',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid var(--border-light)',
      height: '100%',
      minWidth: '400px',
      overflow: 'hidden'
    }}>
      {/* VS Code Editor Tabs */}
      <div style={{
        height: '38px',
        backgroundColor: 'var(--bg-panel-header)',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        gap: '4px'
      }}>
        <button
          onClick={() => onSelectTab('index.html')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            fontSize: '0.82rem',
            fontWeight: activeTab === 'index.html' ? 700 : 500,
            backgroundColor: activeTab === 'index.html' ? 'var(--bg-surface)' : 'transparent',
            color: activeTab === 'index.html' ? 'var(--color-html)' : 'var(--text-muted)',
            borderTop: activeTab === 'index.html' ? '2px solid var(--color-html)' : '2px solid transparent',
            borderRight: '1px solid var(--border-light)',
            borderLeft: '1px solid var(--border-light)',
            borderBottom: activeTab === 'index.html' ? '1px solid var(--bg-surface)' : 'none',
            borderRadius: '4px 4px 0 0',
            height: '100%'
          }}
        >
          <FileCode size={15} color="var(--color-html)" />
          <span style={{ fontFamily: 'var(--font-mono)' }}>index.html</span>
          {currentChallengeId === 10 && (() => {
            const htmlRemaining = [
              bugState.bug1_mainClose,
              bugState.bug2_cssLink,
              bugState.bug3_headerInsideBody,
              bugState.bug4_navInsideHeader,
              bugState.bug5_coffeePath,
              bugState.bug6_cakeAlt,
              bugState.bug10_contactLink
            ].filter(b => !b).length;
            return (
              <span style={{
                fontSize: '0.68rem',
                padding: '1px 6px',
                borderRadius: '10px',
                fontWeight: 700,
                backgroundColor: htmlRemaining === 0 ? '#dcfce7' : '#fee2e2',
                color: htmlRemaining === 0 ? '#15803d' : '#b91c1c'
              }}>
                {htmlRemaining === 0 ? '✓' : `${htmlRemaining} bugs`}
              </span>
            );
          })()}
        </button>

        <button
          onClick={() => onSelectTab('style.css')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            fontSize: '0.82rem',
            fontWeight: activeTab === 'style.css' ? 700 : 500,
            backgroundColor: activeTab === 'style.css' ? 'var(--bg-surface)' : 'transparent',
            color: activeTab === 'style.css' ? 'var(--color-css)' : 'var(--text-muted)',
            borderTop: activeTab === 'style.css' ? '2px solid var(--color-css)' : '2px solid transparent',
            borderRight: '1px solid var(--border-light)',
            borderLeft: '1px solid var(--border-light)',
            borderBottom: activeTab === 'style.css' ? '1px solid var(--bg-surface)' : 'none',
            borderRadius: '4px 4px 0 0',
            height: '100%'
          }}
        >
          <FileText size={15} color="var(--color-css)" />
          <span style={{ fontFamily: 'var(--font-mono)' }}>style.css</span>
          {currentChallengeId === 10 && (() => {
            const cssRemaining = [
              bugState.bug7_heroSelector,
              bugState.bug8_cssSemicolon,
              bugState.bug9_flexDisplay
            ].filter(b => !b).length;
            return (
              <span style={{
                fontSize: '0.68rem',
                padding: '1px 6px',
                borderRadius: '10px',
                fontWeight: 700,
                backgroundColor: cssRemaining === 0 ? '#dcfce7' : '#fee2e2',
                color: cssRemaining === 0 ? '#15803d' : '#b91c1c'
              }}>
                {cssRemaining === 0 ? '✓' : `${cssRemaining} bugs`}
              </span>
            );
          })()}
        </button>

        {currentChallengeId === 10 && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="badge badge-error" style={{ fontSize: '0.7rem' }}>
              <Bug size={12} />
              <span>{10 - Object.values(bugState).filter(Boolean).length} Bugs Left</span>
            </span>
          </div>
        )}
      </div>

      {/* Editor Main Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', backgroundColor: 'var(--bg-surface)' }}>
        {/* Line Numbers Gutter */}
        <div style={{
          width: '44px',
          padding: '16px 8px',
          textAlign: 'right',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          color: 'var(--text-faint)',
          userSelect: 'none',
          borderRight: '1px solid var(--border-light)',
          backgroundColor: 'var(--bg-surface-subtle)'
        }}>
          {Array.from({ length: Math.max(blocks.length, 12) }).map((_, i) => (
            <div key={i} style={{ height: '36px', lineHeight: '36px' }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Canvas */}
        <div style={{ flex: 1, padding: '16px 20px', overflowX: 'auto' }}>
          {currentChallengeId === 1 ? (
            /* Challenge 1 Info in Editor */
            <div style={{ padding: '20px', maxWidth: '600px' }}>
              <h3 style={{ color: 'var(--cafe-primary)', marginBottom: '10px' }}>
                📁 Project Explorer Challenge
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                Organise the café project structure in the <strong>Left File Explorer panel</strong>.
              </p>
              <div style={{
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '16px'
              }}>
                <div style={{ fontWeight: 700, marginBottom: '8px' }}>Target Architecture:</div>
                <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-main)' }}>
{`bristol-cafe/
├── index.html        (Root homepage)
├── style.css         (Root stylesheet)
└── images/           (Assets subfolder)
    ├── coffee.jpg
    ├── cafe-interior.jpg
    └── cake.jpg`}
                </pre>
              </div>
            </div>
          ) : currentChallengeId === 8 ? (
            /* Challenge 8: Selector Category Buckets */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Drag declarations into their matching selector blocks:
              </div>

              {(['header', 'nav a', '.hero', '.button'] as const).map(selector => {
                const selectorBlocks = blocks.filter(b => b.category === selector);
                return (
                  <div
                    key={selector}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const blockId = e.dataTransfer.getData('text/plain');
                      if (blockId && onMoveChallenge8Block) {
                        onMoveChallenge8Block(blockId, selector);
                      }
                    }}
                    style={{
                      background: 'var(--bg-surface-subtle)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-css)', marginBottom: '8px' }}>
                      {selector} &#123;
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '16px' }}>
                      {selectorBlocks.length === 0 ? (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)', fontStyle: 'italic', padding: '6px' }}>
                          Drop matching declarations here...
                        </div>
                      ) : (
                        selectorBlocks.map((block) => (
                          <div
                            key={block.id}
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData('text/plain', block.id)}
                            style={{
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--border-light)',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.85rem',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'grab'
                            }}
                          >
                            <span>
                              <span style={{ color: '#7c3aed', fontWeight: 600 }}>{block.content.split(':')[0]}:</span>
                              <span style={{ color: '#059669' }}>{block.content.split(':')[1]}</span>
                            </span>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {(['header', 'nav a', '.hero', '.button'] as const).filter(s => s !== selector).map(target => (
                                <button
                                  key={target}
                                  onClick={() => onMoveChallenge8Block && onMoveChallenge8Block(block.id, target)}
                                  title={`Move to ${target}`}
                                  style={{
                                    fontSize: '0.68rem',
                                    padding: '2px 6px',
                                    background: 'var(--bg-panel-header)',
                                    borderRadius: '3px',
                                    color: 'var(--text-muted)'
                                  }}
                                >
                                  → {target}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-css)', marginTop: '8px' }}>
                      &#125;
                    </div>
                  </div>
                );
              })}
            </div>
          ) : currentChallengeId === 9 ? (
            /* Challenge 9: CSS Box Model (Margin, Padding & Border) Interactive Editor */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Visual Box Model Diagram Banner */}
              <div style={{
                background: '#fffaf3',
                border: '1px solid #f0dcc4',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--cafe-primary)' }}>
                    📦 CSS Box Model Reference
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    <strong>padding</strong> = space <em>inside</em> the border • <strong>border</strong> = the box edge • <strong>margin</strong> = space <em>outside</em> between boxes
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem'
                }}>
                  <span style={{ background: '#fde68a', color: '#92400e', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    Margin (Outside)
                  </span>
                  <span>→</span>
                  <span style={{ background: '#fed7aa', color: '#9a3412', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, border: '1px solid #c97a3e' }}>
                    Border
                  </span>
                  <span>→</span>
                  <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    Padding (Inside)
                  </span>
                </div>
              </div>

              {/* Unassigned Box Model Declarations Tray */}
              {(() => {
                const trayBlocks = blocks.filter(b => !b.category || b.category === 'tray');
                return (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const blockId = e.dataTransfer.getData('text/plain');
                      if (blockId && onMoveChallenge9Block) {
                        onMoveChallenge9Block(blockId, 'tray');
                      }
                    }}
                    style={{
                      background: 'var(--bg-surface-subtle)',
                      border: '2px dashed var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        🧰 Box Model Declarations Tray ({trayBlocks.length} remaining to place)
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        Click a target selector button or drag into the CSS rules below
                      </span>
                    </div>

                    {trayBlocks.length === 0 ? (
                      <div style={{
                        padding: '10px',
                        textAlign: 'center',
                        background: 'var(--color-success-bg)',
                        color: 'var(--color-success)',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}>
                        ✓ All Margin, Padding & Border declarations placed into style.css! Click "Check Answer" below.
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {trayBlocks.map(block => (
                          <div
                            key={block.id}
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData('text/plain', block.id)}
                            style={{
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--border-medium)',
                              borderLeft: '4px solid var(--color-css)',
                              padding: '7px 10px',
                              borderRadius: '6px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: '8px',
                              cursor: 'grab'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem' }}>
                                <span style={{ color: '#7c3aed', fontWeight: 700 }}>{block.content.split(':')[0]}:</span>
                                <span style={{ color: '#059669', fontWeight: 600 }}>{block.content.split(':')[1]}</span>
                              </span>
                              {block.label && (
                                <span style={{
                                  fontSize: '0.7rem',
                                  background: '#f1f5f9',
                                  color: '#475569',
                                  padding: '2px 7px',
                                  borderRadius: '10px',
                                  fontWeight: 600
                                }}>
                                  {block.label}
                                </span>
                              )}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {(['.about-box', '.menu-card', '.contact-box'] as const).map(target => (
                                <button
                                  key={target}
                                  onClick={() => onMoveChallenge9Block && onMoveChallenge9Block(block.id, target)}
                                  style={{
                                    fontSize: '0.7rem',
                                    padding: '3px 8px',
                                    background: '#eff6ff',
                                    border: '1px solid #bfdbfe',
                                    borderRadius: '4px',
                                    color: '#1d4ed8',
                                    fontWeight: 700,
                                    fontFamily: 'var(--font-mono)'
                                  }}
                                >
                                  + {target}
                                </button>
                              ))}
                              {block.explanationKey && (
                                <button
                                  onClick={() => onExplainBlock(block.explanationKey!)}
                                  title="Explain this CSS property"
                                  style={{
                                    fontSize: '0.7rem',
                                    padding: '3px 7px',
                                    background: 'var(--bg-panel-header)',
                                    borderRadius: '4px',
                                    color: 'var(--text-muted)',
                                    fontWeight: 700
                                  }}
                                >
                                  ?
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Target CSS Selector Rules in style.css */}
              {([
                {
                  selector: '.about-box',
                  comment: '/* 1. About Box: Needs 30px inner padding and 25px outer bottom margin */'
                },
                {
                  selector: '.menu-card',
                  comment: '/* 2. Menu Card: Needs 20px inner padding, 16px outer bottom margin, and 4px solid left border */'
                },
                {
                  selector: '.contact-box',
                  comment: '/* 3. Contact Box: Needs 24px inner padding, 20px outer top margin, and 2px dashed border */'
                }
              ] as const).map(({ selector, comment }) => {
                const selectorBlocks = blocks.filter(b => b.category === selector);
                return (
                  <div
                    key={selector}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const blockId = e.dataTransfer.getData('text/plain');
                      if (blockId && onMoveChallenge9Block) {
                        onMoveChallenge9Block(blockId, selector);
                      }
                    }}
                    style={{
                      background: 'var(--bg-surface-subtle)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#64748b', marginBottom: '4px' }}>
                      {comment}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-css)', marginBottom: '8px' }}>
                      {selector} &#123;
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', paddingLeft: '18px' }}>
                      {selectorBlocks.length === 0 ? (
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          color: '#b91c1c',
                          background: '#fef2f2',
                          border: '1px dashed #fca5a5',
                          borderRadius: '4px',
                          padding: '6px 10px'
                        }}>
                          padding: 0px; margin: 0px; <span style={{ color: '#64748b', fontStyle: 'italic' }}>/* ⚠️ Currently squashed! Add declarations here */</span>
                        </div>
                      ) : (
                        selectorBlocks.map(block => (
                          <div
                            key={block.id}
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData('text/plain', block.id)}
                            style={{
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--border-light)',
                              borderLeft: '3px solid #10b981',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.85rem',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'grab'
                            }}
                          >
                            <span>
                              <span style={{ color: '#7c3aed', fontWeight: 600 }}>{block.content.split(':')[0]}:</span>
                              <span style={{ color: '#059669', fontWeight: 600 }}>{block.content.split(':')[1]}</span>
                            </span>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {(['.about-box', '.menu-card', '.contact-box'] as const)
                                .filter(s => s !== selector)
                                .map(target => (
                                  <button
                                    key={target}
                                    onClick={() => onMoveChallenge9Block && onMoveChallenge9Block(block.id, target)}
                                    style={{
                                      fontSize: '0.68rem',
                                      padding: '2px 6px',
                                      background: 'var(--bg-panel-header)',
                                      borderRadius: '3px',
                                      color: 'var(--text-muted)'
                                    }}
                                  >
                                    → {target}
                                  </button>
                                ))}
                              <button
                                onClick={() => onMoveChallenge9Block && onMoveChallenge9Block(block.id, 'tray')}
                                title="Return to Tray"
                                style={{
                                  fontSize: '0.68rem',
                                  padding: '2px 6px',
                                  background: '#fee2e2',
                                  borderRadius: '3px',
                                  color: '#b91c1c',
                                  fontWeight: 700
                                }}
                              >
                                × Remove
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-css)', marginTop: '8px' }}>
                      &#125;
                    </div>
                  </div>
                );
              })}
            </div>
          ) : currentChallengeId === 10 ? (
            /* Challenge 10: Interactive Source Code Editor with Inline Error Inspection & Live Fixes */
            (() => {
              const viewingCss = activeTab === 'style.css';
              const fixedCount = Object.values(bugState).filter(Boolean).length;

              const bugJumpList: Array<{
                num: number;
                key: keyof BugFixState;
                file: 'index.html' | 'style.css';
                shortLabel: string;
              }> = [
                { num: 1, key: 'bug1_mainClose', file: 'index.html', shortLabel: '#1 </main>' },
                { num: 2, key: 'bug2_cssLink', file: 'index.html', shortLabel: '#2 style.css' },
                { num: 3, key: 'bug3_headerInsideBody', file: 'index.html', shortLabel: '#3 <header>' },
                { num: 4, key: 'bug4_navInsideHeader', file: 'index.html', shortLabel: '#4 <nav>' },
                { num: 5, key: 'bug5_coffeePath', file: 'index.html', shortLabel: '#5 coffee.jpg' },
                { num: 6, key: 'bug6_cakeAlt', file: 'index.html', shortLabel: '#6 alt text' },
                { num: 7, key: 'bug7_heroSelector', file: 'style.css', shortLabel: '#7 .hero' },
                { num: 8, key: 'bug8_cssSemicolon', file: 'style.css', shortLabel: '#8 semicolon ;' },
                { num: 9, key: 'bug9_flexDisplay', file: 'style.css', shortLabel: '#9 padding/margin' },
                { num: 10, key: 'bug10_contactLink', file: 'index.html', shortLabel: '#10 #contact' }
              ];

              type CodeLineDescriptor =
                | { kind: 'normal'; code: string; indent?: number }
                | {
                    kind: 'bug';
                    bugNumber: number;
                    bugKey: keyof BugFixState;
                    isFixed: boolean;
                    brokenCode: string;
                    fixedCode: string;
                    errorExplanation: string;
                    fixButtonLabel: string;
                  };

              const htmlCodeLines: CodeLineDescriptor[] = [
                { kind: 'normal', code: '<!DOCTYPE html>' },
                { kind: 'normal', code: '<html lang="en">' },
                { kind: 'normal', code: '<head>' },
                { kind: 'normal', code: '  <meta charset="UTF-8">' },
                { kind: 'normal', code: '  <title>Bristol Brew Café</title>' },
                {
                  kind: 'bug',
                  bugNumber: 2,
                  bugKey: 'bug2_cssLink',
                  isFixed: bugState.bug2_cssLink,
                  brokenCode: '  <link rel="stylesheet" href="styles.css">',
                  fixedCode: '  <link rel="stylesheet" href="style.css">',
                  errorExplanation: 'Bug #2: Typo in stylesheet filename ("styles.css" does not exist; file is "style.css")',
                  fixButtonLabel: 'Fix → href="style.css"'
                },
                { kind: 'normal', code: '</head>' },
                // Bug 3 when BROKEN appears outside <body>
                ...(!bugState.bug3_headerInsideBody
                  ? ([
                      {
                        kind: 'bug',
                        bugNumber: 3,
                        bugKey: 'bug3_headerInsideBody',
                        isFixed: false,
                        brokenCode: '<header>\n  <h1>Bristol Brew Café</h1>\n</header>',
                        fixedCode: '<!-- Moved <header> inside <body> -->',
                        errorExplanation: 'Bug #3: <header> is placed outside before <body>! All visible content must sit inside <body>.',
                        fixButtonLabel: 'Move <header> Inside <body>'
                      }
                    ] as CodeLineDescriptor[])
                  : []),
                { kind: 'normal', code: '<body>' },
                // Bug 3 when FIXED appears inside <body>
                ...(bugState.bug3_headerInsideBody
                  ? ([
                      {
                        kind: 'bug',
                        bugNumber: 3,
                        bugKey: 'bug3_headerInsideBody',
                        isFixed: true,
                        brokenCode: '<header> (was outside <body>)',
                        fixedCode: '  <header>\n    <h1>Bristol Brew Café</h1>',
                        errorExplanation: 'Bug #3 Fixed: <header> is now properly inside <body>.',
                        fixButtonLabel: 'Fixed ✓'
                      }
                    ] as CodeLineDescriptor[])
                  : []),
                // Bug 4: <nav> inside vs outside <header>
                ...(bugState.bug4_navInsideHeader
                  ? ([
                      {
                        kind: 'bug',
                        bugNumber: 4,
                        bugKey: 'bug4_navInsideHeader',
                        isFixed: true,
                        brokenCode: '<nav> (was outside <header>)',
                        fixedCode: '    <nav>\n      <a href="#home">Home</a>\n      <a href="#about">About</a>\n      <a href="#menu">Menu</a>',
                        errorExplanation: 'Bug #4 Fixed: <nav> is now nested inside <header>.',
                        fixButtonLabel: 'Fixed ✓'
                      },
                      {
                        kind: 'bug',
                        bugNumber: 10,
                        bugKey: 'bug10_contactLink',
                        isFixed: bugState.bug10_contactLink,
                        brokenCode: '      <a href="#contactus">Contact</a>',
                        fixedCode: '      <a href="#contact">Contact</a>',
                        errorExplanation: 'Bug #10: Anchor href="#contactus" does not match <section id="contact">!',
                        fixButtonLabel: 'Fix → href="#contact"'
                      },
                      { kind: 'normal', code: '    </nav>' },
                      ...(bugState.bug3_headerInsideBody ? [{ kind: 'normal', code: '  </header>' } as CodeLineDescriptor] : [])
                    ] as CodeLineDescriptor[])
                  : ([
                      ...(bugState.bug3_headerInsideBody ? [{ kind: 'normal', code: '  </header>' } as CodeLineDescriptor] : []),
                      {
                        kind: 'bug',
                        bugNumber: 4,
                        bugKey: 'bug4_navInsideHeader',
                        isFixed: false,
                        brokenCode: '  <nav> <!-- ❌ Outside <header>! -->\n    <a href="#home">Home</a> | <a href="#about">About</a> | <a href="#menu">Menu</a>',
                        fixedCode: '    <nav> (Nested inside <header>)',
                        errorExplanation: 'Bug #4: <nav> is sitting outside after </header> instead of inside <header>.',
                        fixButtonLabel: 'Move <nav> Inside <header>'
                      },
                      {
                        kind: 'bug',
                        bugNumber: 10,
                        bugKey: 'bug10_contactLink',
                        isFixed: bugState.bug10_contactLink,
                        brokenCode: '    <a href="#contactus">Contact</a>',
                        fixedCode: '    <a href="#contact">Contact</a>',
                        errorExplanation: 'Bug #10: Anchor href="#contactus" does not match <section id="contact">!',
                        fixButtonLabel: 'Fix → href="#contact"'
                      },
                      { kind: 'normal', code: '  </nav>' }
                    ] as CodeLineDescriptor[])),
                { kind: 'normal', code: '  <main>' },
                { kind: 'normal', code: '    <section id="home" class="hero">' },
                { kind: 'normal', code: '      <h2>Fresh Coffee in the Heart of Bristol</h2>' },
                { kind: 'normal', code: '      <p>Enjoy freshly brewed coffee and homemade cakes.</p>' },
                {
                  kind: 'bug',
                  bugNumber: 5,
                  bugKey: 'bug5_coffeePath',
                  isFixed: bugState.bug5_coffeePath,
                  brokenCode: '      <img src="coffee.jpg" alt="Freshly prepared coffee">',
                  fixedCode: '      <img src="images/coffee.jpg" alt="Freshly prepared coffee">',
                  errorExplanation: 'Bug #5: Broken image path! "coffee.jpg" is inside the "images/" folder.',
                  fixButtonLabel: 'Fix → src="images/coffee.jpg"'
                },
                { kind: 'normal', code: '      <a href="#menu" class="button">Explore Our Menu</a>' },
                { kind: 'normal', code: '    </section>' },
                { kind: 'normal', code: '    <section id="about">' },
                { kind: 'normal', code: '      <h2>About Our Café</h2>' },
                { kind: 'normal', code: '      <img src="images/cafe-interior.jpg" alt="Bristol Brew Café interior">' },
                { kind: 'normal', code: '      <p>An independent coffee haven nestled in the heart of Bristol.</p>' },
                { kind: 'normal', code: '    </section>' },
                { kind: 'normal', code: '    <section id="menu">' },
                { kind: 'normal', code: '      <h2>Our Menu</h2>' },
                { kind: 'normal', code: '      <div class="menu-grid">' },
                { kind: 'normal', code: '        <article class="menu-card">' },
                { kind: 'normal', code: '          <h3>Flat White</h3><p class="price">£3.50</p>' },
                { kind: 'normal', code: '        </article>' },
                { kind: 'normal', code: '        <article class="menu-card">' },
                { kind: 'normal', code: '          <h3>Cappuccino</h3><p class="price">£3.60</p>' },
                { kind: 'normal', code: '        </article>' },
                { kind: 'normal', code: '        <article class="menu-card">' },
                { kind: 'normal', code: '          <h3>Homemade Cake</h3>' },
                {
                  kind: 'bug',
                  bugNumber: 6,
                  bugKey: 'bug6_cakeAlt',
                  isFixed: bugState.bug6_cakeAlt,
                  brokenCode: '          <img src="images/cake.jpg">',
                  fixedCode: '          <img src="images/cake.jpg" alt="Homemade artisan cake">',
                  errorExplanation: 'Bug #6: Missing alt="..." attribute on <img> (violates accessibility standards).',
                  fixButtonLabel: 'Fix → Add alt="Homemade artisan cake"'
                },
                { kind: 'normal', code: '          <p class="price">£4.00</p>' },
                { kind: 'normal', code: '        </article>' },
                { kind: 'normal', code: '      </div>' },
                { kind: 'normal', code: '    </section>' },
                { kind: 'normal', code: '    <section id="contact">' },
                { kind: 'normal', code: '      <h2>Visit Us</h2>' },
                { kind: 'normal', code: '      <p>14 Harbourside Walk, Bristol BS1 5TY</p>' },
                { kind: 'normal', code: '    </section>' },
                {
                  kind: 'bug',
                  bugNumber: 1,
                  bugKey: 'bug1_mainClose',
                  isFixed: bugState.bug1_mainClose,
                  brokenCode: '  <!-- ❌ Missing </main> closing tag here! <footer> is trapped inside <main> -->',
                  fixedCode: '  </main>',
                  errorExplanation: 'Bug #1: Missing closing </main> tag before <footer>!',
                  fixButtonLabel: 'Fix → Add </main>'
                },
                { kind: 'normal', code: '  <footer>' },
                { kind: 'normal', code: '    <p>&copy; 2026 Bristol Brew Café. All rights reserved.</p>' },
                { kind: 'normal', code: '  </footer>' },
                { kind: 'normal', code: '</body>' },
                { kind: 'normal', code: '</html>' }
              ];

              const cssCodeLines: CodeLineDescriptor[] = [
                { kind: 'normal', code: '/* Bristol Brew Café - Stylesheet (style.css) */' },
                { kind: 'normal', code: 'body {' },
                { kind: 'normal', code: '  background-color: #f7f3ed;' },
                { kind: 'normal', code: "  font-family: 'Plus Jakarta Sans', Arial, sans-serif;" },
                { kind: 'normal', code: '  color: #2b1810;' },
                { kind: 'normal', code: '  margin: 0;' },
                { kind: 'normal', code: '  padding: 0;' },
                { kind: 'normal', code: '}' },
                { kind: 'normal', code: '' },
                { kind: 'normal', code: 'header {' },
                {
                  kind: 'bug',
                  bugNumber: 8,
                  bugKey: 'bug8_cssSemicolon',
                  isFixed: bugState.bug8_cssSemicolon,
                  brokenCode: '  padding: 20px 40px',
                  fixedCode: '  padding: 20px 40px;',
                  errorExplanation: 'Bug #8: Missing semicolon (;) at end of line! This breaks background-color: #3d2314 below it.',
                  fixButtonLabel: 'Fix → Add Semicolon ;'
                },
                { kind: 'normal', code: '  background-color: #3d2314;' },
                { kind: 'normal', code: '  color: #ffffff;' },
                { kind: 'normal', code: '  display: flex;' },
                { kind: 'normal', code: '  justify-content: space-between;' },
                { kind: 'normal', code: '  align-items: center;' },
                { kind: 'normal', code: '}' },
                { kind: 'normal', code: '' },
                { kind: 'normal', code: 'nav a {' },
                { kind: 'normal', code: '  color: #f5e9d8;' },
                { kind: 'normal', code: '  text-decoration: none;' },
                { kind: 'normal', code: '  margin-left: 20px;' },
                { kind: 'normal', code: '}' },
                { kind: 'normal', code: '' },
                {
                  kind: 'bug',
                  bugNumber: 7,
                  bugKey: 'bug7_heroSelector',
                  isFixed: bugState.bug7_heroSelector,
                  brokenCode: 'hero {',
                  fixedCode: '.hero {',
                  errorExplanation: 'Bug #7: Missing dot (.) on class selector! Without the dot, CSS looks for <hero> instead of class="hero".',
                  fixButtonLabel: 'Fix → .hero {'
                },
                { kind: 'normal', code: '  background-color: #ffffff;' },
                { kind: 'normal', code: '  padding: 40px;' },
                { kind: 'normal', code: '  text-align: center;' },
                { kind: 'normal', code: '  border-radius: 12px;' },
                { kind: 'normal', code: '  margin: 20px 40px;' },
                { kind: 'normal', code: '}' },
                { kind: 'normal', code: '' },
                { kind: 'normal', code: '.menu-card {' },
                { kind: 'normal', code: '  background: #fbf9f6;' },
                {
                  kind: 'bug',
                  bugNumber: 9,
                  bugKey: 'bug9_flexDisplay',
                  isFixed: bugState.bug9_flexDisplay,
                  brokenCode: '  padding: 0px; margin-bottom: 0px;',
                  fixedCode: '  padding: 24px; margin-bottom: 16px;',
                  errorExplanation: 'Bug #9: 0px padding and 0px margin-bottom causes the menu cards to squash together with zero breathing room!',
                  fixButtonLabel: 'Fix → padding: 24px; margin-bottom: 16px;'
                },
                { kind: 'normal', code: '  border-radius: 8px;' },
                { kind: 'normal', code: '  border-left: 4px solid #c97a3e;' },
                { kind: 'normal', code: '}' },
                { kind: 'normal', code: '' },
                { kind: 'normal', code: 'footer {' },
                { kind: 'normal', code: '  text-align: center;' },
                { kind: 'normal', code: '  padding: 30px;' },
                { kind: 'normal', code: '  background-color: #2b1810;' },
                { kind: 'normal', code: '  color: #d8c8ba;' },
                { kind: 'normal', code: '}' }
              ];

              const activeLines = viewingCss ? cssCodeLines : htmlCodeLines;

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Top Diagnostic Bar */}
                  <div style={{
                    background: 'var(--bg-surface-subtle)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 14px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                        <Bug size={17} color={fixedCount === 10 ? 'var(--color-success)' : 'var(--color-error)'} />
                        <span>Source Code Bug Inspector ({fixedCount}/10 Repaired)</span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => onSelectTab('index.html')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.76rem',
                            fontWeight: 700,
                            border: !viewingCss ? '2px solid var(--color-html)' : '1px solid var(--border-medium)',
                            background: !viewingCss ? '#fff7ed' : 'var(--bg-surface)',
                            color: !viewingCss ? 'var(--color-html)' : 'var(--text-muted)'
                          }}
                        >
                          📄 Inspect index.html (Bugs #1–#6, #10)
                        </button>
                        <button
                          onClick={() => onSelectTab('style.css')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.76rem',
                            fontWeight: 700,
                            border: viewingCss ? '2px solid var(--color-css)' : '1px solid var(--border-medium)',
                            background: viewingCss ? '#eff6ff' : 'var(--bg-surface)',
                            color: viewingCss ? 'var(--color-css)' : 'var(--text-muted)'
                          }}
                        >
                          🎨 Inspect style.css (Bugs #7–#9)
                        </button>
                      </div>
                    </div>

                    {/* Quick Jump / Toggle Pills for all 10 bugs */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {bugJumpList.map(b => {
                        const isResolved = bugState[b.key];
                        return (
                          <button
                            key={b.key}
                            onClick={() => onSelectTab(b.file)}
                            title={`Jump to ${b.file} for Bug #${b.num}`}
                            style={{
                              fontSize: '0.7rem',
                              padding: '3px 8px',
                              borderRadius: '12px',
                              fontWeight: 700,
                              fontFamily: 'var(--font-mono)',
                              border: isResolved ? '1px solid #86efac' : '1px solid #fca5a5',
                              background: isResolved ? '#dcfce7' : '#fee2e2',
                              color: isResolved ? '#166534' : '#991b1b',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span>{isResolved ? '✓' : '❌'}</span>
                            <span>{b.shortLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Source Code View with Inline Broken/Fixed Code Lines */}
                  <div style={{
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff'
                  }}>
                    <div style={{
                      padding: '8px 14px',
                      backgroundColor: 'var(--bg-panel-header)',
                      borderBottom: '1px solid var(--border-light)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--text-main)'
                    }}>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>
                        {viewingCss ? '🎨 style.css — CSS Source Code' : '📄 index.html — HTML Source Code'}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                         Find the red error lines in the code below and click "Fix" to repair &amp; watch the preview update!
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0' }}>
                      {activeLines.map((line, idx) => {
                        if (line.kind === 'normal') {
                          return (
                            <div
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '2px 14px',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.82rem',
                                lineHeight: '1.6',
                                color: '#334155',
                                whiteSpace: 'pre'
                              }}
                            >
                              {line.code}
                            </div>
                          );
                        }

                        // Buggy or Fixed interactive code line
                        return (
                          <div
                            key={line.bugKey + '-' + idx}
                            style={{
                              margin: '4px 8px',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              borderLeft: line.isFixed ? '4px solid #16a34a' : '4px solid #ef4444',
                              borderTop: line.isFixed ? '1px solid #bbf7d0' : '1px solid #fecaca',
                              borderRight: line.isFixed ? '1px solid #bbf7d0' : '1px solid #fecaca',
                              borderBottom: line.isFixed ? '1px solid #bbf7d0' : '1px solid #fecaca',
                              backgroundColor: line.isFixed ? '#f0fdf4' : '#fef2f2',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '6px'
                            }}
                          >
                            {/* Actual Code Line */}
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: '10px'
                            }}>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', whiteSpace: 'pre-wrap' }}>
                                {line.isFixed ? (
                                  <div>
                                    <div style={{
                                      color: '#15803d',
                                      fontWeight: 700,
                                      background: '#dcfce7',
                                      padding: '2px 6px',
                                      borderRadius: '4px',
                                      display: 'inline-block'
                                    }}>
                                      {line.fixedCode}
                                    </div>
                                    <div style={{
                                      fontSize: '0.73rem',
                                      color: '#64748b',
                                      marginTop: '3px'
                                    }}>
                                      <span style={{ textDecoration: 'line-through', color: '#dc2626', marginRight: '8px' }}>
                                        {line.brokenCode.replace(/\n/g, ' ')}
                                      </span>
                                      <span style={{ color: '#15803d', fontWeight: 700 }}>✓ Repaired in code</span>
                                    </div>
                                  </div>
                                ) : (
                                  <span style={{
                                    color: '#b91c1c',
                                    fontWeight: 700,
                                    textDecoration: 'underline wavy #ef4444',
                                    background: '#fee2e2',
                                    padding: '2px 6px',
                                    borderRadius: '4px'
                                  }}>
                                    {line.brokenCode}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => onToggleBug(line.bugKey)}
                                className={line.isFixed ? 'btn-success' : 'btn-primary'}
                                style={{
                                  padding: '5px 12px',
                                  fontSize: '0.76rem',
                                  fontWeight: 700,
                                  fontFamily: 'var(--font-mono)',
                                  whiteSpace: 'nowrap',
                                  cursor: 'pointer'
                                }}
                              >
                                {line.isFixed ? '✓ Fixed (Click to Undo)' : `🔧 ${line.fixButtonLabel}`}
                              </button>
                            </div>

                            {/* Diagnostic explanation */}
                            <div style={{
                              fontSize: '0.75rem',
                              color: line.isFixed ? '#166534' : '#991b1b',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}>
                              <span>{line.isFixed ? '✅' : '⚠️'}</span>
                              <span>{line.errorExplanation}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            /* Standard Draggable Code Blocks (Challenges 2, 3, 4, 5, 6, 7) */
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {blocks.map((block, index) => (
                <CodeBlockItem
                  key={block.id}
                  block={block}
                  index={index}
                  totalBlocks={blocks.length}
                  nestingLevel={getNestingLevel(block)}
                  onMoveUp={() => handleMoveUp(index)}
                  onMoveDown={() => handleMoveDown(index)}
                  onExplain={onExplainBlock}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
