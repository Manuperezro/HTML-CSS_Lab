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
  onMoveChallenge8Block
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
        </button>

        {currentChallengeId === 10 && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="badge badge-error" style={{ fontSize: '0.7rem' }}>
              <Bug size={12} />
              <span>10 Bugs to Fix</span>
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
          ) : currentChallengeId === 10 ? (
            /* Challenge 10: Interactive Diagnostic Bug Inspector */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
                    <Bug size={18} color="var(--color-error)" />
                    <span>Website Diagnostic Bug Checklist ({Object.values(bugState).filter(Boolean).length}/10 Resolved)</span>
                  </div>
                  <span className="badge badge-hint">
                    Click "Repair Bug" or toggle to fix
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '10px' }}>
                  {/* Bug 1 */}
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: bugState.bug1_mainClose ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                    background: bugState.bug1_mainClose ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        1. Missing closing &lt;/main&gt; tag
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        index.html • Tag pairing error
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleBug('bug1_mainClose')}
                      className={bugState.bug1_mainClose ? 'btn-success' : 'btn-primary'}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {bugState.bug1_mainClose ? 'Fixed ✓' : 'Repair Tag'}
                    </button>
                  </div>

                  {/* Bug 2 */}
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: bugState.bug2_cssLink ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                    background: bugState.bug2_cssLink ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        2. Broken CSS link filename
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        styles.css → style.css
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleBug('bug2_cssLink')}
                      className={bugState.bug2_cssLink ? 'btn-success' : 'btn-primary'}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {bugState.bug2_cssLink ? 'Fixed ✓' : 'Fix Link'}
                    </button>
                  </div>

                  {/* Bug 3 */}
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: bugState.bug3_headerInsideBody ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                    background: bugState.bug3_headerInsideBody ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        3. Header placed outside &lt;body&gt;
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        index.html • HTML structure error
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleBug('bug3_headerInsideBody')}
                      className={bugState.bug3_headerInsideBody ? 'btn-success' : 'btn-primary'}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {bugState.bug3_headerInsideBody ? 'Fixed ✓' : 'Move into Body'}
                    </button>
                  </div>

                  {/* Bug 4 */}
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: bugState.bug4_navInsideHeader ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                    background: bugState.bug4_navInsideHeader ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        4. &lt;nav&gt; outside &lt;header&gt;
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        index.html • Semantic nesting error
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleBug('bug4_navInsideHeader')}
                      className={bugState.bug4_navInsideHeader ? 'btn-success' : 'btn-primary'}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {bugState.bug4_navInsideHeader ? 'Fixed ✓' : 'Nest in Header'}
                    </button>
                  </div>

                  {/* Bug 5 */}
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: bugState.bug5_coffeePath ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                    background: bugState.bug5_coffeePath ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        5. Incorrect coffee image path
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        coffee.jpg → images/coffee.jpg
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleBug('bug5_coffeePath')}
                      className={bugState.bug5_coffeePath ? 'btn-success' : 'btn-primary'}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {bugState.bug5_coffeePath ? 'Fixed ✓' : 'Fix Path'}
                    </button>
                  </div>

                  {/* Bug 6 */}
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: bugState.bug6_cakeAlt ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                    background: bugState.bug6_cakeAlt ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        6. Missing alt attribute on cake
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Accessibility WCAG error
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleBug('bug6_cakeAlt')}
                      className={bugState.bug6_cakeAlt ? 'btn-success' : 'btn-primary'}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {bugState.bug6_cakeAlt ? 'Fixed ✓' : 'Add Alt Text'}
                    </button>
                  </div>

                  {/* Bug 7 */}
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: bugState.bug7_heroSelector ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                    background: bugState.bug7_heroSelector ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        7. Incorrect CSS selector (hero)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        style.css • hero → .hero (missing dot)
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleBug('bug7_heroSelector')}
                      className={bugState.bug7_heroSelector ? 'btn-success' : 'btn-primary'}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {bugState.bug7_heroSelector ? 'Fixed ✓' : 'Add Dot .hero'}
                    </button>
                  </div>

                  {/* Bug 8 */}
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: bugState.bug8_cssSemicolon ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                    background: bugState.bug8_cssSemicolon ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        8. Missing CSS semicolon
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        style.css • color: #2b1810;
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleBug('bug8_cssSemicolon')}
                      className={bugState.bug8_cssSemicolon ? 'btn-success' : 'btn-primary'}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {bugState.bug8_cssSemicolon ? 'Fixed ✓' : 'Add Semicolon'}
                    </button>
                  </div>

                  {/* Bug 9 */}
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: bugState.bug9_flexDisplay ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                    background: bugState.bug9_flexDisplay ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        9. Invalid Flexbox display
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        display: grid-flex → display: flex
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleBug('bug9_flexDisplay')}
                      className={bugState.bug9_flexDisplay ? 'btn-success' : 'btn-primary'}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {bugState.bug9_flexDisplay ? 'Fixed ✓' : 'Fix Flexbox'}
                    </button>
                  </div>

                  {/* Bug 10 */}
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: bugState.bug10_contactLink ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                    background: bugState.bug10_contactLink ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)' }}>
                        10. Broken internal navigation link
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        href="#contactus" → href="#contact"
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleBug('bug10_contactLink')}
                      className={bugState.bug10_contactLink ? 'btn-success' : 'btn-primary'}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {bugState.bug10_contactLink ? 'Fixed ✓' : 'Fix Anchor'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Standard Draggable Code Blocks (Challenges 2, 3, 4, 5, 6, 7, 9) */
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
