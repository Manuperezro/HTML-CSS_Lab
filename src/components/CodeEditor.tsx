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
  onSetBugFixed?: (bugKey: keyof BugFixState, isFixed: boolean) => void;
  onSelectChallenge6Option?: (blockId: string) => void;
  onMoveChallenge8Block?: (blockId: string, targetCategory: string) => void;
  onMoveChallenge9Block?: (blockId: string, targetCategory: string) => void;
}

const INITIAL_BROKEN_CODE: Record<keyof BugFixState, string> = {
  bug1_mainClose: '<main>',
  bug2_cssLink: '<link rel="stylesheet" href="styles.css">',
  bug3_headerInsideBody: '<hedaer>',
  bug4_navInsideHeader: '<navv>',
  bug5_coffeePath: '<img src="coffee.jpg" alt="Freshly prepared coffee">',
  bug6_cakeAlt: '<img src="images/cake.jpg">',
  bug7_heroSelector: 'hero {',
  bug8_cssSemicolon: '  padding: 20px 40px',
  bug9_flexDisplay: '  padding: 0px; margin-bottom: 0px;',
  bug10_contactLink: '<a href="#contactus">Contact</a>'
};

const EXPECTED_FIXED_CODE: Record<keyof BugFixState, string> = {
  bug1_mainClose: '</main>',
  bug2_cssLink: '<link rel="stylesheet" href="style.css">',
  bug3_headerInsideBody: '<header>',
  bug4_navInsideHeader: '<nav>',
  bug5_coffeePath: '<img src="images/coffee.jpg" alt="Freshly prepared coffee">',
  bug6_cakeAlt: '<img src="images/cake.jpg" alt="Homemade artisan cake">',
  bug7_heroSelector: '.hero {',
  bug8_cssSemicolon: '  padding: 20px 40px;',
  bug9_flexDisplay: '  padding: 24px; margin-bottom: 16px;',
  bug10_contactLink: '<a href="#contact">Contact</a>'
};

function isBugCodeValid(bugKey: keyof BugFixState, text: string): boolean {
  const t = text.trim();
  switch (bugKey) {
    case 'bug1_mainClose':
      return /^<\/main>$/i.test(t);
    case 'bug2_cssLink':
      return /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["']style\.css["'][^>]*>/i.test(t) ||
             /<link\s+[^>]*href=["']style\.css["'][^>]*rel=["']stylesheet["'][^>]*>/i.test(t);
    case 'bug3_headerInsideBody':
      return /^<header>$/i.test(t);
    case 'bug4_navInsideHeader':
      return /^<nav>$/i.test(t);
    case 'bug5_coffeePath':
      return /<img\s+[^>]*src=["']images\/coffee\.jpg["'][^>]*>/i.test(t);
    case 'bug6_cakeAlt':
      return /<img\s+[^>]*src=["']images\/cake\.jpg["'][^>]*alt=["'][^"']{2,}["'][^>]*>/i.test(t) ||
             /<img\s+[^>]*alt=["'][^"']{2,}["'][^>]*src=["']images\/cake\.jpg["'][^>]*>/i.test(t);
    case 'bug7_heroSelector':
      return /^\.hero\s*\{$/.test(t);
    case 'bug8_cssSemicolon':
      return /^padding:\s*\d+px(\s+\d+px)?\s*;$/i.test(t);
    case 'bug9_flexDisplay':
      return /padding:\s*[1-9]\d*px\s*;/i.test(t) && /margin(-bottom)?:\s*[1-9]\d*px\s*;?/i.test(t);
    case 'bug10_contactLink':
      return /<a\s+[^>]*href=["']#contact["'][^>]*>\s*Contact\s*<\/a>/i.test(t);
    default:
      return false;
  }
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
  onSetBugFixed,
  onSelectChallenge6Option,
  onMoveChallenge8Block,
  onMoveChallenge9Block
}) => {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  const [typedBugLines, setTypedBugLines] = React.useState<Record<keyof BugFixState, string>>(() => ({
    bug1_mainClose: bugState.bug1_mainClose ? EXPECTED_FIXED_CODE.bug1_mainClose : INITIAL_BROKEN_CODE.bug1_mainClose,
    bug2_cssLink: bugState.bug2_cssLink ? EXPECTED_FIXED_CODE.bug2_cssLink : INITIAL_BROKEN_CODE.bug2_cssLink,
    bug3_headerInsideBody: bugState.bug3_headerInsideBody ? EXPECTED_FIXED_CODE.bug3_headerInsideBody : INITIAL_BROKEN_CODE.bug3_headerInsideBody,
    bug4_navInsideHeader: bugState.bug4_navInsideHeader ? EXPECTED_FIXED_CODE.bug4_navInsideHeader : INITIAL_BROKEN_CODE.bug4_navInsideHeader,
    bug5_coffeePath: bugState.bug5_coffeePath ? EXPECTED_FIXED_CODE.bug5_coffeePath : INITIAL_BROKEN_CODE.bug5_coffeePath,
    bug6_cakeAlt: bugState.bug6_cakeAlt ? EXPECTED_FIXED_CODE.bug6_cakeAlt : INITIAL_BROKEN_CODE.bug6_cakeAlt,
    bug7_heroSelector: bugState.bug7_heroSelector ? EXPECTED_FIXED_CODE.bug7_heroSelector : INITIAL_BROKEN_CODE.bug7_heroSelector,
    bug8_cssSemicolon: bugState.bug8_cssSemicolon ? EXPECTED_FIXED_CODE.bug8_cssSemicolon : INITIAL_BROKEN_CODE.bug8_cssSemicolon,
    bug9_flexDisplay: bugState.bug9_flexDisplay ? EXPECTED_FIXED_CODE.bug9_flexDisplay : INITIAL_BROKEN_CODE.bug9_flexDisplay,
    bug10_contactLink: bugState.bug10_contactLink ? EXPECTED_FIXED_CODE.bug10_contactLink : INITIAL_BROKEN_CODE.bug10_contactLink
  }));

  // Keep typedBugLines in sync when Reset Challenge or Teacher Show Solution changes bugState externally
  React.useEffect(() => {
    setTypedBugLines(prev => {
      const next = { ...prev };
      let changed = false;
      (Object.keys(INITIAL_BROKEN_CODE) as Array<keyof BugFixState>).forEach(key => {
        const currentlyValid = isBugCodeValid(key, prev[key]);
        if (bugState[key] && !currentlyValid) {
          next[key] = EXPECTED_FIXED_CODE[key];
          changed = true;
        } else if (!bugState[key] && currentlyValid) {
          next[key] = INITIAL_BROKEN_CODE[key];
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [bugState]);

  const handleTypeBugLine = (bugKey: keyof BugFixState, newValue: string) => {
    setTypedBugLines(prev => ({ ...prev, [bugKey]: newValue }));
    const valid = isBugCodeValid(bugKey, newValue);
    if (valid !== bugState[bugKey]) {
      if (onSetBugFixed) {
        onSetBugFixed(bugKey, valid);
      } else {
        onToggleBug(bugKey);
      }
    }
  };

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
      height: '100%',
      minWidth: '240px',
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
          ) : currentChallengeId === 6 ? (
            /* Challenge 6: Simple, Clear Visual <head> Stylesheet Connector */
            (() => {
              const selectedBlock = blocks.find(b => b.category === 'selected');
              const isCorrectSelected = selectedBlock?.id === 'b6-correct';
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* 1. Live index.html <head> Preview */}
                  <div style={{
                    background: 'var(--bg-surface-subtle)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 18px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.86rem',
                    lineHeight: '1.75'
                  }}>
                    <div style={{ color: 'var(--text-muted)' }}>&lt;!DOCTYPE html&gt;</div>
                    <div style={{ color: 'var(--color-html)', fontWeight: 600 }}>&lt;html lang="en"&gt;</div>
                    <div style={{ color: 'var(--color-html)', fontWeight: 700 }}>&lt;head&gt;</div>
                    <div style={{ paddingLeft: '20px', color: 'var(--text-main)' }}>&lt;meta charset="UTF-8"&gt;</div>
                    <div style={{ paddingLeft: '20px', color: 'var(--text-main)' }}>&lt;title&gt;Bristol Brew Café&lt;/title&gt;</div>

                    {/* Interactive Line 6 Slot inside <head> */}
                    <div style={{
                      margin: '6px 0 6px 20px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: !selectedBlock
                        ? '2px dashed var(--color-hint)'
                        : isCorrectSelected
                        ? '2px solid var(--color-success)'
                        : '2px solid var(--color-error)',
                      backgroundColor: !selectedBlock
                        ? 'var(--color-hint-bg)'
                        : isCorrectSelected
                        ? 'var(--color-success-bg)'
                        : 'var(--color-error-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {!selectedBlock ? (
                        <span style={{ color: 'var(--color-hint)', fontWeight: 700 }}>
                          &lt;!-- 👇 Click one of the 3 options below to insert it here on Line 6! --&gt;
                        </span>
                      ) : (
                        <>
                          <span style={{
                            fontWeight: 700,
                            color: isCorrectSelected ? 'var(--color-success)' : 'var(--color-error)'
                          }}>
                            {selectedBlock.content}
                          </span>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: isCorrectSelected ? 'var(--color-success)' : 'var(--color-error)'
                          }}>
                            {isCorrectSelected
                              ? '✓ Connected! Look at the Live Preview on the right!'
                              : selectedBlock.id === 'b6-script-wrong'
                              ? '❌ <script> is for JavaScript, not CSS!'
                              : '❌ File not found: "styles.css" has an extra "s" (file is "style.css")'}
                          </span>
                        </>
                      )}
                    </div>

                    <div style={{ color: 'var(--color-html)', fontWeight: 700 }}>&lt;/head&gt;</div>
                    <div style={{ color: 'var(--color-html)', fontWeight: 600 }}>&lt;body&gt;</div>
                    <div style={{ paddingLeft: '20px', color: 'var(--text-muted)' }}>
                      &lt;header&gt;&lt;h1&gt;Bristol Brew Café&lt;/h1&gt;...&lt;/header&gt;
                    </div>
                    <div style={{ color: 'var(--color-html)', fontWeight: 600 }}>&lt;/body&gt;</div>
                    <div style={{ color: 'var(--color-html)', fontWeight: 600 }}>&lt;/html&gt;</div>
                  </div>

                  {/* 2. Clickable Option Cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                      Choose which tag to place inside <code>&lt;head&gt;</code> to connect <code>style.css</code>:
                    </div>

                    {blocks.map((block) => {
                      const isSelected = block.category === 'selected';
                      return (
                        <button
                          key={block.id}
                          onClick={() => onSelectChallenge6Option && onSelectChallenge6Option(block.id)}
                          style={{
                            textAlign: 'left',
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-md)',
                            border: isSelected
                              ? '2px solid var(--color-css)'
                              : '1px solid var(--border-medium)',
                            backgroundColor: isSelected
                              ? 'var(--color-css-bg)'
                              : 'var(--bg-surface-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                              {block.label}
                            </span>
                            <code style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.9rem',
                              fontWeight: 700,
                              color: 'var(--text-main)'
                            }}>
                              {block.content}
                            </code>
                          </div>

                          <span style={{
                            padding: '5px 12px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            backgroundColor: isSelected ? 'var(--color-css)' : 'var(--bg-panel-header)',
                            color: isSelected ? '#ffffff' : 'var(--text-main)'
                          }}>
                            {isSelected ? 'Selected in <head> ✓' : 'Insert into <head>'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          ) : currentChallengeId === 8 ? (
            /* Challenge 8: Side-by-Side Layout (Tray on Left, 2x2 Grid of Selectors on Right - Zero Scrolling!) */
            (() => {
              const trayBlocks = blocks.filter(b => !b.category || b.category === 'tray');
              const selectorMeta = [
                { selector: 'header', desc: 'Dark brown (#3d2314), white text, 20px padding' },
                { selector: 'nav a', desc: 'Cream text (#f5e9d8), no underline, 8px 16px padding' },
                { selector: '.hero', desc: 'White bg (#ffffff), 12px round corners, 40px padding' },
                { selector: '.button', desc: 'Amber bg (#c97a3e), white text, 6px round corners' }
              ] as const;

              return (
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', height: '100%' }}>
                  {/* Left Column: Compact Declarations Tray */}
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const blockId = e.dataTransfer.getData('text/plain');
                      if (blockId && onMoveChallenge8Block) {
                        onMoveChallenge8Block(blockId, 'tray');
                      }
                    }}
                    style={{
                      width: '44%',
                      minWidth: '250px',
                      background: 'var(--bg-surface-subtle)',
                      border: '2px dashed var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '2px' }}>
                      🧰 Declarations ({trayBlocks.length} left) — Drag or click a button:
                    </div>

                    {trayBlocks.length === 0 ? (
                      <div style={{
                        padding: '12px',
                        textAlign: 'center',
                        background: 'var(--color-success-bg)',
                        color: 'var(--color-success)',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}>
                        ✓ All 12 CSS declarations placed! Click "Check Answer" below.
                      </div>
                    ) : (
                      trayBlocks.map(block => (
                        <div
                          key={block.id}
                          draggable
                          onDragStart={(e) => e.dataTransfer.setData('text/plain', block.id)}
                          style={{
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-light)',
                            borderLeft: '3px solid var(--color-css)',
                            padding: '5px 8px',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            cursor: 'grab'
                          }}
                        >
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                            <span style={{ color: '#7c3aed', fontWeight: 700 }}>{block.content.split(':')[0]}:</span>
                            <span style={{ color: '#059669', fontWeight: 600 }}>{block.content.split(':')[1]}</span>
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                            {(['header', 'nav a', '.hero', '.button'] as const).map(target => (
                              <button
                                key={target}
                                onClick={() => onMoveChallenge8Block && onMoveChallenge8Block(block.id, target)}
                                style={{
                                  fontSize: '0.66rem',
                                  padding: '2px 6px',
                                  background: 'var(--color-css-bg)',
                                  color: 'var(--color-css)',
                                  borderRadius: '3px',
                                  fontWeight: 700,
                                  fontFamily: 'var(--font-mono)'
                                }}
                              >
                                + {target}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Right Column: 2x2 Grid of All 4 Target Selectors (All visible at once!) */}
                  <div style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px'
                  }}>
                    {selectorMeta.map(({ selector, desc }) => {
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
                            border: '2px solid var(--border-medium)',
                            borderRadius: 'var(--radius-md)',
                            padding: '10px',
                            minHeight: '145px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
                              /* {desc} */
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-css)', marginBottom: '6px' }}>
                              {selector} &#123;
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '10px' }}>
                              {selectorBlocks.length === 0 ? (
                                <div style={{
                                  fontSize: '0.73rem',
                                  color: 'var(--text-faint)',
                                  fontStyle: 'italic',
                                  padding: '10px 6px',
                                  border: '1px dashed var(--border-medium)',
                                  borderRadius: '4px',
                                  textAlign: 'center'
                                }}>
                                  Drop {selector} styles here
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
                                      padding: '4px 8px',
                                      borderRadius: '4px',
                                      fontFamily: 'var(--font-mono)',
                                      fontSize: '0.75rem',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      gap: '4px',
                                      cursor: 'grab'
                                    }}
                                  >
                                    <span>
                                      <span style={{ color: '#7c3aed', fontWeight: 600 }}>{block.content.split(':')[0]}:</span>
                                      <span style={{ color: '#059669' }}>{block.content.split(':')[1]}</span>
                                    </span>
                                    <button
                                      onClick={() => onMoveChallenge8Block && onMoveChallenge8Block(block.id, 'tray')}
                                      title="Return to tray"
                                      style={{
                                        fontSize: '0.68rem',
                                        padding: '1px 5px',
                                        background: 'var(--color-error-bg)',
                                        color: 'var(--color-error)',
                                        borderRadius: '3px',
                                        fontWeight: 700
                                      }}
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>

                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-css)', marginTop: '6px' }}>
                            &#125;
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          ) : currentChallengeId === 9 ? (
            /* Challenge 9: Padding & Margin Interactive Side-by-Side Editor (No Box Model mention!) */
            (() => {
              const trayBlocks = blocks.filter(b => !b.category || b.category === 'tray');
              const selectorTargets = [
                {
                  selector: '.about-box',
                  comment: '/* 1. About Box: padding: 30px; (inside) and margin-bottom: 25px; (outside below) */'
                },
                {
                  selector: '.menu-card',
                  comment: '/* 2. Menu Card: padding: 20px; (inside) and margin-bottom: 16px; (between cards) */'
                },
                {
                  selector: '.contact-box',
                  comment: '/* 3. Contact Box: padding: 24px; (inside) and margin-top: 20px; (outside above) */'
                }
              ] as const;

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Simple, clear Padding vs Margin Banner */}
                  <div style={{
                    background: 'var(--bg-surface-subtle)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    fontSize: '0.8rem'
                  }}>
                    <div>
                      <strong>💡 Quick Tip:</strong>{' '}
                      <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>padding</span> adds breathing room <strong>INSIDE</strong> a box •{' '}
                      <span style={{ color: 'var(--color-html)', fontWeight: 700 }}>margin</span> adds space <strong>OUTSIDE</strong> between separate boxes.
                    </div>
                  </div>

                  {/* Side-by-Side Tray & Target Selectors */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    {/* Left Column: Padding & Margin Tray */}
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
                        width: '44%',
                        minWidth: '250px',
                        background: 'var(--bg-surface-subtle)',
                        border: '2px dashed var(--border-medium)',
                        borderRadius: 'var(--radius-md)',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-main)' }}>
                        🧰 Padding &amp; Margin Rules ({trayBlocks.length} left):
                      </div>

                      {trayBlocks.length === 0 ? (
                        <div style={{
                          padding: '12px',
                          textAlign: 'center',
                          background: 'var(--color-success-bg)',
                          color: 'var(--color-success)',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 700
                        }}>
                          ✓ All 6 Padding &amp; Margin rules placed! Click "Check Answer" below.
                        </div>
                      ) : (
                        trayBlocks.map(block => (
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
                              flexDirection: 'column',
                              gap: '5px',
                              cursor: 'grab'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                                <span style={{ color: '#7c3aed', fontWeight: 700 }}>{block.content.split(':')[0]}:</span>
                                <span style={{ color: '#059669', fontWeight: 600 }}>{block.content.split(':')[1]}</span>
                              </span>
                              {block.explanationKey && (
                                <button
                                  onClick={() => onExplainBlock(block.explanationKey!)}
                                  title="Explain this property"
                                  style={{
                                    fontSize: '0.68rem',
                                    padding: '2px 6px',
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
                            {block.label && (
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                {block.label}
                              </span>
                            )}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {(['.about-box', '.menu-card', '.contact-box'] as const).map(target => (
                                <button
                                  key={target}
                                  onClick={() => onMoveChallenge9Block && onMoveChallenge9Block(block.id, target)}
                                  style={{
                                    fontSize: '0.68rem',
                                    padding: '2px 7px',
                                    background: 'var(--color-css-bg)',
                                    color: 'var(--color-css)',
                                    borderRadius: '4px',
                                    fontWeight: 700,
                                    fontFamily: 'var(--font-mono)'
                                  }}
                                >
                                  + {target}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Right Column: All 3 Target Selectors Visible Together */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {selectorTargets.map(({ selector, comment }) => {
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
                              border: '2px solid var(--border-medium)',
                              borderRadius: 'var(--radius-md)',
                              padding: '10px 12px'
                            }}
                          >
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                              {comment}
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-css)', marginBottom: '6px' }}>
                              {selector} &#123;
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '14px' }}>
                              {selectorBlocks.length === 0 ? (
                                <div style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.76rem',
                                  color: 'var(--color-error)',
                                  background: 'var(--color-error-bg)',
                                  border: '1px dashed var(--color-error)',
                                  borderRadius: '4px',
                                  padding: '6px 10px'
                                }}>
                                  padding: 0px; margin: 0px; /* ⚠️ Squashed! Drop rules here */
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
                                      borderLeft: '3px solid var(--color-success)',
                                      padding: '5px 10px',
                                      borderRadius: '4px',
                                      fontFamily: 'var(--font-mono)',
                                      fontSize: '0.8rem',
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
                                    <button
                                      onClick={() => onMoveChallenge9Block && onMoveChallenge9Block(block.id, 'tray')}
                                      style={{
                                        fontSize: '0.68rem',
                                        padding: '2px 6px',
                                        background: 'var(--color-error-bg)',
                                        borderRadius: '3px',
                                        color: 'var(--color-error)',
                                        fontWeight: 700
                                      }}
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))
                              )}
                            </div>

                            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-css)', marginTop: '6px' }}>
                              &#125;
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()
          ) : currentChallengeId === 10 ? (
            /* Challenge 10: Real Keyboard Editable Code Editor for index.html & style.css */
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

              type EditableCodeLine =
                | { kind: 'normal'; code: string }
                | {
                    kind: 'editable-bug';
                    bugNumber: number;
                    bugKey: keyof BugFixState;
                    indent: string;
                    hint: string;
                    expectedExample: string;
                  };

              const htmlCodeLines: EditableCodeLine[] = [
                { kind: 'normal', code: '<!DOCTYPE html>' },
                { kind: 'normal', code: '<html lang="en">' },
                { kind: 'normal', code: '<head>' },
                { kind: 'normal', code: '  <meta charset="UTF-8">' },
                { kind: 'normal', code: '  <title>Bristol Brew Café</title>' },
                {
                  kind: 'editable-bug',
                  bugNumber: 2,
                  bugKey: 'bug2_cssLink',
                  indent: '  ',
                  hint: 'Bug #2: Typo in filename "styles.css" — delete the extra "s" so it says href="style.css"',
                  expectedExample: '<link rel="stylesheet" href="style.css">'
                },
                { kind: 'normal', code: '</head>' },
                { kind: 'normal', code: '<body>' },
                {
                  kind: 'editable-bug',
                  bugNumber: 3,
                  bugKey: 'bug3_headerInsideBody',
                  indent: '  ',
                  hint: 'Bug #3: Typo in opening <hedaer> tag — type <header>',
                  expectedExample: '<header>'
                },
                { kind: 'normal', code: '    <h1>Bristol Brew Café</h1>' },
                {
                  kind: 'editable-bug',
                  bugNumber: 4,
                  bugKey: 'bug4_navInsideHeader',
                  indent: '    ',
                  hint: 'Bug #4: Typo in opening <navv> tag — type <nav>',
                  expectedExample: '<nav>'
                },
                { kind: 'normal', code: '      <a href="#home">Home</a>' },
                { kind: 'normal', code: '      <a href="#about">About</a>' },
                { kind: 'normal', code: '      <a href="#menu">Menu</a>' },
                {
                  kind: 'editable-bug',
                  bugNumber: 10,
                  bugKey: 'bug10_contactLink',
                  indent: '      ',
                  hint: 'Bug #10: Broken link href="#contactus" — change it to href="#contact"',
                  expectedExample: '<a href="#contact">Contact</a>'
                },
                { kind: 'normal', code: '    </nav>' },
                { kind: 'normal', code: '  </header>' },
                { kind: 'normal', code: '  <main>' },
                { kind: 'normal', code: '    <section id="home" class="hero">' },
                { kind: 'normal', code: '      <h2>Fresh Coffee in the Heart of Bristol</h2>' },
                { kind: 'normal', code: '      <p>Enjoy freshly brewed coffee and homemade cakes.</p>' },
                {
                  kind: 'editable-bug',
                  bugNumber: 5,
                  bugKey: 'bug5_coffeePath',
                  indent: '      ',
                  hint: 'Bug #5: Broken image path src="coffee.jpg" — add the folder so it says src="images/coffee.jpg"',
                  expectedExample: '<img src="images/coffee.jpg" alt="Freshly prepared coffee">'
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
                { kind: 'normal', code: '        <article class="menu-card"><h3>Flat White</h3><p class="price">£3.50</p></article>' },
                { kind: 'normal', code: '        <article class="menu-card"><h3>Cappuccino</h3><p class="price">£3.60</p></article>' },
                { kind: 'normal', code: '        <article class="menu-card">' },
                { kind: 'normal', code: '          <h3>Homemade Cake</h3>' },
                {
                  kind: 'editable-bug',
                  bugNumber: 6,
                  bugKey: 'bug6_cakeAlt',
                  indent: '          ',
                  hint: 'Bug #6: Missing alt attribute on cake image — add alt="Homemade cake" inside <img>',
                  expectedExample: '<img src="images/cake.jpg" alt="Homemade cake">'
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
                  kind: 'editable-bug',
                  bugNumber: 1,
                  bugKey: 'bug1_mainClose',
                  indent: '  ',
                  hint: 'Bug #1: Missing forward slash "/" in closing tag — change <main> to </main>',
                  expectedExample: '</main>'
                },
                { kind: 'normal', code: '  <footer>' },
                { kind: 'normal', code: '    <p>&copy; 2026 Bristol Brew Café. All rights reserved.</p>' },
                { kind: 'normal', code: '  </footer>' },
                { kind: 'normal', code: '</body>' },
                { kind: 'normal', code: '</html>' }
              ];

              const cssCodeLines: EditableCodeLine[] = [
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
                  kind: 'editable-bug',
                  bugNumber: 8,
                  bugKey: 'bug8_cssSemicolon',
                  indent: '  ',
                  hint: 'Bug #8: Missing semicolon ";" at the end of the line — add ";" after 40px',
                  expectedExample: 'padding: 20px 40px;'
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
                  kind: 'editable-bug',
                  bugNumber: 7,
                  bugKey: 'bug7_heroSelector',
                  indent: '',
                  hint: 'Bug #7: Missing dot "." before class selector — change hero { to .hero {',
                  expectedExample: '.hero {'
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
                  kind: 'editable-bug',
                  bugNumber: 9,
                  bugKey: 'bug9_flexDisplay',
                  indent: '  ',
                  hint: 'Bug #9: Cards are squashed with 0px! Change 0px to 24px padding and 16px margin-bottom',
                  expectedExample: 'padding: 24px; margin-bottom: 16px;'
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
                    padding: '10px 14px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        <Bug size={17} color={fixedCount === 10 ? 'var(--color-success)' : 'var(--color-error)'} />
                        <span>Live Code Editor — Type in the red boxes to fix ({fixedCount}/10 Repaired)</span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => onSelectTab('index.html')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            border: !viewingCss ? '2px solid var(--color-html)' : '1px solid var(--border-medium)',
                            background: !viewingCss ? 'var(--color-html-bg)' : 'var(--bg-surface)',
                            color: !viewingCss ? 'var(--color-html)' : 'var(--text-muted)'
                          }}
                        >
                          📄 index.html (7 Bugs)
                        </button>
                        <button
                          onClick={() => onSelectTab('style.css')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            border: viewingCss ? '2px solid var(--color-css)' : '1px solid var(--border-medium)',
                            background: viewingCss ? 'var(--color-css-bg)' : 'var(--bg-surface)',
                            color: viewingCss ? 'var(--color-css)' : 'var(--text-muted)'
                          }}
                        >
                          🎨 style.css (3 Bugs)
                        </button>
                      </div>
                    </div>

                    {/* Quick Jump Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {bugJumpList.map(b => {
                        const isResolved = bugState[b.key];
                        return (
                          <button
                            key={b.key}
                            onClick={() => onSelectTab(b.file)}
                            style={{
                              fontSize: '0.68rem',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontWeight: 700,
                              fontFamily: 'var(--font-mono)',
                              border: isResolved ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                              background: isResolved ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                              color: isResolved ? 'var(--color-success)' : 'var(--color-error)',
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

                  {/* Interactive Code Editor Canvas */}
                  <div style={{
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-surface)'
                  }}>
                    <div style={{
                      padding: '7px 14px',
                      backgroundColor: 'var(--bg-panel-header)',
                      borderBottom: '1px solid var(--border-light)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: 'var(--text-main)'
                    }}>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>
                        {viewingCss ? '🎨 style.css (Editable Code)' : '📄 index.html (Editable Code)'}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        ⌨️ Click inside any highlighted line and type with your keyboard to fix the code!
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0' }}>
                      {activeLines.map((line, idx) => {
                        if (line.kind === 'normal') {
                          return (
                            <div
                              key={idx}
                              style={{
                                padding: '2px 14px',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.82rem',
                                lineHeight: '1.55',
                                color: 'var(--text-muted)',
                                whiteSpace: 'pre'
                              }}
                            >
                              {line.code}
                            </div>
                          );
                        }

                        const currentVal = typedBugLines[line.bugKey] ?? '';
                        const isFixed = bugState[line.bugKey];

                        return (
                          <div
                            key={line.bugKey}
                            style={{
                              margin: '4px 10px',
                              padding: '7px 12px',
                              borderRadius: '6px',
                              borderLeft: isFixed ? '4px solid var(--color-success)' : '4px solid var(--color-error)',
                              borderTop: isFixed ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                              borderRight: isFixed ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                              borderBottom: isFixed ? '1px solid var(--color-success)' : '1px solid var(--color-error)',
                              backgroundColor: isFixed ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                backgroundColor: isFixed ? 'var(--color-success)' : 'var(--color-error)',
                                color: '#ffffff',
                                whiteSpace: 'nowrap'
                              }}>
                                {isFixed ? `✓ Bug #${line.bugNumber} Fixed` : `Bug #${line.bugNumber}`}
                              </span>

                              <input
                                type="text"
                                value={currentVal}
                                onChange={(e) => handleTypeBugLine(line.bugKey, e.target.value)}
                                spellCheck={false}
                                autoComplete="off"
                                aria-label={`Edit code for Bug ${line.bugNumber}`}
                                style={{
                                  flex: 1,
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.86rem',
                                  fontWeight: 700,
                                  padding: '5px 10px',
                                  borderRadius: '4px',
                                  border: isFixed ? '2px solid var(--color-success)' : '2px solid var(--color-error)',
                                  backgroundColor: 'var(--bg-surface)',
                                  color: 'var(--text-main)',
                                  outline: 'none'
                                }}
                              />
                            </div>

                            <div style={{
                              fontSize: '0.74rem',
                              color: isFixed ? 'var(--color-success)' : 'var(--color-error)',
                              fontWeight: 600,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: '6px'
                            }}>
                              <span>{isFixed ? `✅ Valid code! The preview has updated.` : `⚠️ ${line.hint}`}</span>
                              {!isFixed && (
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.71rem', opacity: 0.9 }}>
                                  Target: <code>{line.expectedExample}</code>
                                </span>
                              )}
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
            /* Standard Draggable Code Blocks (Challenges 2, 3, 4, 5, 7) */
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
