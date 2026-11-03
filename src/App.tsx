import React, { useState, useEffect, useRef } from 'react';
import type { ChallengeId, CodeBlock, ValidationFeedback } from './types/challenge';
import { CHALLENGES } from './data/challenges';
import { TopNavigation } from './components/TopNavigation';
import { FileExplorer } from './components/FileExplorer';
import { CodeEditor } from './components/CodeEditor';
import { LivePreview } from './components/LivePreview';
import { LearningAssistant } from './components/LearningAssistant';
import { GlossaryModal } from './components/GlossaryModal';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { ExplainCodeModal } from './components/ExplainCodeModal';
import { CompletionModal } from './components/CompletionModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { assemblePreviewContent, INITIAL_BUG_STATE } from './utils/codeAssembler';
import type { BugFixState } from './utils/codeAssembler';
import { validateChallenge } from './utils/validator';
import { soundManager } from './utils/soundEffects';

const STORAGE_KEY_PROGRESS = 'bristol_cafe_completed_v1';
const STORAGE_KEY_CURRENT = 'bristol_cafe_current_v1';
const STORAGE_KEY_BUGS = 'bristol_cafe_bugs_v1';
const STORAGE_KEY_THEME = 'bristol_cafe_theme_v1';
const STORAGE_KEY_PREVIEW_WIDTH = 'bristol_cafe_preview_width_v1';
const STORAGE_KEY_EXPLORER_WIDTH = 'bristol_cafe_explorer_width_v1';

export const App: React.FC = () => {
  const workspaceRef = useRef<HTMLElement>(null);
  const [activeResizer, setActiveResizer] = useState<'explorer' | 'preview' | null>(null);

  // Resizable panel widths
  const [explorerWidth, setExplorerWidth] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EXPLORER_WIDTH);
      if (saved) {
        const parsed = parseFloat(saved);
        if (parsed >= 150 && parsed <= 420) return parsed;
      }
    } catch {}
    return 260;
  });

  const [previewWidthPercent, setPreviewWidthPercent] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREVIEW_WIDTH);
      if (saved) {
        const parsed = parseFloat(saved);
        if (parsed >= 18 && parsed <= 72) return parsed;
      }
    } catch {}
    return 45;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EXPLORER_WIDTH, explorerWidth.toString());
      localStorage.setItem(STORAGE_KEY_PREVIEW_WIDTH, previewWidthPercent.toString());
    } catch {}
  }, [explorerWidth, previewWidthPercent]);

  useEffect(() => {
    if (!activeResizer) {
      document.body.classList.remove('is-resizing-panes');
      return;
    }

    document.body.classList.add('is-resizing-panes');

    const updateSize = (clientX: number) => {
      if (!workspaceRef.current) return;
      const rect = workspaceRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;

      if (activeResizer === 'explorer') {
        const nextWidth = Math.max(150, Math.min(420, clientX - rect.left));
        setExplorerWidth(nextWidth);
      } else if (activeResizer === 'preview') {
        const rightPx = rect.right - clientX;
        const minEditorPx = 240;
        const maxRightPx = Math.max(220, rect.width - explorerWidth - minEditorPx - 16);
        const clampedRightPx = Math.max(220, Math.min(maxRightPx, rightPx));
        const nextPercent = (clampedRightPx / rect.width) * 100;
        setPreviewWidthPercent(Math.max(18, Math.min(72, nextPercent)));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateSize(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateSize(e.touches[0].clientX);
      }
    };

    const handleStopResize = () => {
      setActiveResizer(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleStopResize);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleStopResize);

    return () => {
      document.body.classList.remove('is-resizing-panes');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleStopResize);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleStopResize);
    };
  }, [activeResizer, explorerWidth]);
  // Theme state (light / dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {}
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {}
  }, [theme]);
  // Current challenge selection
  const [currentChallengeId, setCurrentChallengeId] = useState<ChallengeId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (parsed >= 1 && parsed <= 10) return parsed as ChallengeId;
      }
    } catch {}
    return 1;
  });

  // Completed challenges array
  const [completedChallenges, setCompletedChallenges] = useState<ChallengeId[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Active code editor tab
  const [activeTab, setActiveTab] = useState<'index.html' | 'style.css' | 'files'>('files');

  // Blocks state for each challenge
  const [blocksMap, setBlocksMap] = useState<Record<ChallengeId, CodeBlock[]>>(() => {
    const map: Record<number, CodeBlock[]> = {};
    CHALLENGES.forEach(ch => {
      map[ch.id] = [...ch.initialBlocks];
    });
    return map as Record<ChallengeId, CodeBlock[]>;
  });

  // Challenge 10 Bug Fix State
  const [bugState, setBugState] = useState<BugFixState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BUGS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { ...INITIAL_BUG_STATE };
  });

  // Attempt counters for progressive feedback (1 = conceptual, 2 = specific, 3+ = visual)
  const [attemptCounts, setAttemptCounts] = useState<Record<ChallengeId, number>>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0
  });

  // Current feedback
  const [feedback, setFeedback] = useState<ValidationFeedback | null>(null);

  // Sound mute state
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getIsMuted());

  // Modals state
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState(false);
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const [explainKey, setExplainKey] = useState<string | null>(null);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmVariant?: 'danger' | 'primary' | 'warning';
    onConfirm: () => void;
  } | null>(null);

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, currentChallengeId.toString());
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(completedChallenges));
      localStorage.setItem(STORAGE_KEY_BUGS, JSON.stringify(bugState));
    } catch {}
  }, [currentChallengeId, completedChallenges, bugState]);

  // Update active editor tab when challenge changes
  useEffect(() => {
    const ch = CHALLENGES.find(c => c.id === currentChallengeId);
    if (ch) {
      setActiveTab(ch.activeTab);
    }
    setFeedback(null);
  }, [currentChallengeId]);

  // Current challenge data
  const currentChallenge = CHALLENGES.find(c => c.id === currentChallengeId) || CHALLENGES[0];
  const currentBlocks = blocksMap[currentChallengeId] || [];

  // Assemble HTML and CSS for preview
  const isCurrentCompleted = completedChallenges.includes(currentChallengeId);
  const preview = assemblePreviewContent(currentChallengeId, currentBlocks, bugState, isCurrentCompleted);

  // Handle reordering of blocks
  const handleReorderBlocks = (newBlocks: CodeBlock[]) => {
    soundManager.playMove();
    setBlocksMap(prev => ({
      ...prev,
      [currentChallengeId]: newBlocks
    }));
  };

  // Move files for Challenge 1
  const handleMoveChallenge1File = (fileId: string, targetCategory: 'root' | 'images') => {
    soundManager.playMove();
    setBlocksMap(prev => {
      const updated = (prev[1] || []).map(b => {
        if (b.id === fileId) return { ...b, category: targetCategory };
        return b;
      });
      return { ...prev, 1: updated };
    });
  };

  // Select option for Challenge 6
  const handleSelectChallenge6Option = (blockId: string) => {
    soundManager.playMove();
    setBlocksMap(prev => {
      const updated = (prev[6] || []).map(b => ({
        ...b,
        category: b.id === blockId ? 'selected' : 'unselected'
      }));
      return { ...prev, 6: updated };
    });
  };

  // Move declarations for Challenge 8
  const handleMoveChallenge8Block = (blockId: string, targetCategory: string) => {
    soundManager.playMove();
    setBlocksMap(prev => {
      const updated = (prev[8] || []).map(b => {
        if (b.id === blockId) return { ...b, category: targetCategory };
        return b;
      });
      return { ...prev, 8: updated };
    });
  };

  // Move declarations for Challenge 9 (Padding & Margin)
  const handleMoveChallenge9Block = (blockId: string, targetCategory: string) => {
    soundManager.playMove();
    setBlocksMap(prev => {
      const updated = (prev[9] || []).map(b => {
        if (b.id === blockId) return { ...b, category: targetCategory };
        return b;
      });
      return { ...prev, 9: updated };
    });
  };

  // Set bug fixed state directly when student types valid code in Challenge 10
  const handleSetBugFixed = (bugKey: keyof BugFixState, isFixed: boolean) => {
    soundManager.playMove();
    setBugState(prev => {
      const next = { ...prev, [bugKey]: isFixed };
      const fixedCount = Object.values(next).filter(Boolean).length;
      if (fixedCount === 10) {
        soundManager.playSuccess();
        if (!completedChallenges.includes(10)) {
          setCompletedChallenges(c => [...c, 10]);
        }
        setIsCompletionModalOpen(true);
      }
      return next;
    });
  };

  // Toggle bug for Challenge 10
  const handleToggleBug = (bugKey: keyof BugFixState) => {
    soundManager.playMove();
    setBugState(prev => {
      const next = { ...prev, [bugKey]: !prev[bugKey] };
      // Check if all bugs fixed
      const fixedCount = Object.values(next).filter(Boolean).length;
      if (fixedCount === 10) {
        soundManager.playSuccess();
        if (!completedChallenges.includes(10)) {
          setCompletedChallenges(c => [...c, 10]);
        }
        setIsCompletionModalOpen(true);
      }
      return next;
    });
  };

  // Check Answer Button Clicked
  const handleCheckAnswer = () => {
    const nextAttempt = (attemptCounts[currentChallengeId] || 0) + 1;
    setAttemptCounts(prev => ({ ...prev, [currentChallengeId]: nextAttempt }));

    const res = validateChallenge(currentChallengeId, currentBlocks, nextAttempt, bugState);
    setFeedback(res);

    if (res.isValid) {
      soundManager.playSuccess();
      if (!completedChallenges.includes(currentChallengeId)) {
        setCompletedChallenges(prev => [...prev, currentChallengeId]);
      }
      if (currentChallengeId === 10) {
        setIsCompletionModalOpen(true);
      }
    } else {
      soundManager.playError();
    }
  };

  // Reset Challenge blocks
  const handleResetChallenge = () => {
    const ch = CHALLENGES.find(c => c.id === currentChallengeId);
    if (!ch) return;

    soundManager.playMove();
    if (currentChallengeId === 10) {
      setBugState({ ...INITIAL_BUG_STATE });
      setCompletedChallenges(prev => prev.filter(id => id !== 10));
      setFeedback(null);
      return;
    }

    if (currentChallengeId === 6) {
      setBlocksMap(prev => ({
        ...prev,
        6: ch.initialBlocks.map(b => ({ ...b, category: 'unselected' }))
      }));
      setFeedback(null);
      return;
    }

    if (currentChallengeId === 8 || currentChallengeId === 9) {
      setBlocksMap(prev => ({
        ...prev,
        [currentChallengeId]: ch.initialBlocks.map(b => ({ ...b, category: 'tray' }))
      }));
      setFeedback(null);
      return;
    }

    // Shuffle blocks for ordering challenges
    const shuffled = [...ch.initialBlocks].sort(() => Math.random() - 0.5);
    setBlocksMap(prev => ({
      ...prev,
      [currentChallengeId]: shuffled
    }));
    setFeedback(null);
  };

  // Advance to Next Challenge
  const handleNextChallenge = () => {
    soundManager.playSuccess();
    if (currentChallengeId < 10) {
      const nextId = (currentChallengeId + 1) as ChallengeId;
      setCurrentChallengeId(nextId);
    } else {
      setIsCompletionModalOpen(true);
    }
  };

  // Select Challenge from stepper
  const handleSelectChallenge = (id: ChallengeId) => {
    setCurrentChallengeId(id);
  };

  // Start Again with confirmation
  const handleStartAgain = () => {
    setConfirmationData({
      isOpen: true,
      title: 'Reset All Progress?',
      message: 'This will reset all 10 challenges back to the beginning so a new student can work through them. Are you sure you want to start again?',
      confirmLabel: 'Yes, Start Again',
      confirmVariant: 'danger',
      onConfirm: () => {
        try {
          localStorage.removeItem(STORAGE_KEY_CURRENT);
          localStorage.removeItem(STORAGE_KEY_PROGRESS);
          localStorage.removeItem(STORAGE_KEY_BUGS);
        } catch {}
        setCurrentChallengeId(1);
        setCompletedChallenges([]);
        setBugState({ ...INITIAL_BUG_STATE });
        const map: Record<number, CodeBlock[]> = {};
        CHALLENGES.forEach(ch => {
          map[ch.id] = [...ch.initialBlocks];
        });
        setBlocksMap(map as Record<ChallengeId, CodeBlock[]>);
        setAttemptCounts({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 });
        setFeedback(null);
        setConfirmationData(null);
      }
    });
  };

  // Teacher Guide "Show Solution" request
  const handleTeacherShowSolution = (id: ChallengeId) => {
    setConfirmationData({
      isOpen: true,
      title: `Show Solution for Challenge ${id}?`,
      message: `This will arrange the code blocks in Challenge ${id} to demonstrate the completed solution to your classroom.`,
      confirmLabel: 'Display Solution',
      confirmVariant: 'primary',
      onConfirm: () => {
        if (id === 1) {
          setBlocksMap(prev => ({
            ...prev,
            1: (prev[1] || []).map(b => {
              if (b.content.endsWith('.jpg')) return { ...b, category: 'images' };
              return { ...b, category: 'root' };
            })
          }));
        } else if (id === 2) {
          const solutionIds = ['b2-doctype', 'b2-html-open', 'b2-head-open', 'b2-meta', 'b2-title', 'b2-head-close', 'b2-body-open', 'b2-body-close', 'b2-html-close'];
          const current = [...(blocksMap[2] || [])];
          current.sort((a, b) => solutionIds.indexOf(a.id) - solutionIds.indexOf(b.id));
          setBlocksMap(prev => ({ ...prev, 2: current }));
        } else if (id === 3) {
          const solutionIds = ['b3-header-open', 'b3-h1', 'b3-nav-open', 'b3-a-home', 'b3-a-menu', 'b3-a-about', 'b3-a-contact', 'b3-nav-close', 'b3-header-close'];
          const current = [...(blocksMap[3] || [])];
          current.sort((a, b) => solutionIds.indexOf(a.id) - solutionIds.indexOf(b.id));
          setBlocksMap(prev => ({ ...prev, 3: current }));
        } else if (id === 4) {
          const solutionIds = ['b4-main-open', 'b4-sec-open', 'b4-h2', 'b4-p', 'b4-img', 'b4-cta', 'b4-sec-close', 'b4-main-close'];
          const current = [...(blocksMap[4] || [])];
          current.sort((a, b) => solutionIds.indexOf(a.id) - solutionIds.indexOf(b.id));
          setBlocksMap(prev => ({ ...prev, 4: current }));
        } else if (id === 5) {
          const solutionIds = ['b5-about-sec', 'b5-menu-open', 'b5-card-flatwhite', 'b5-card-cappuccino', 'b5-card-cake', 'b5-menu-close'];
          const current = [...(blocksMap[5] || [])];
          current.sort((a, b) => solutionIds.indexOf(a.id) - solutionIds.indexOf(b.id));
          setBlocksMap(prev => ({ ...prev, 5: current }));
        } else if (id === 6) {
          setBlocksMap(prev => ({
            ...prev,
            6: (prev[6] || []).map(b => ({
              ...b,
              category: b.id === 'b6-correct' ? 'selected' : 'unselected'
            }))
          }));
        } else if (id === 7) {
          const solutionIds = ['b7-body-sel', 'b7-open1', 'b7-prop-bg', 'b7-semi1', 'b7-prop-font', 'b7-close1', 'b7-h1-sel', 'b7-open2', 'b7-h1-color', 'b7-h1-align', 'b7-close2'];
          const current = [...(blocksMap[7] || [])];
          current.sort((a, b) => solutionIds.indexOf(a.id) - solutionIds.indexOf(b.id));
          setBlocksMap(prev => ({ ...prev, 7: current }));
        } else if (id === 8) {
          const mapping: Record<string, string> = {
            'b8-1': 'header', 'b8-2': 'header', 'b8-3': 'header',
            'b8-4': 'nav a', 'b8-5': 'nav a', 'b8-6': 'nav a',
            'b8-7': '.hero', 'b8-8': '.hero', 'b8-9': '.hero',
            'b8-10': '.button', 'b8-11': '.button', 'b8-12': '.button'
          };
          setBlocksMap(prev => ({
            ...prev,
            8: (prev[8] || []).map(b => ({ ...b, category: mapping[b.id] || b.category }))
          }));
        } else if (id === 9) {
          const mapping9: Record<string, string> = {
            'b9-about-pad': '.about-box',
            'b9-about-mar': '.about-box',
            'b9-card-pad': '.menu-card',
            'b9-card-mar': '.menu-card',
            'b9-contact-pad': '.contact-box',
            'b9-contact-mar': '.contact-box'
          };
          setBlocksMap(prev => ({
            ...prev,
            9: (prev[9] || []).map(b => ({ ...b, category: mapping9[b.id] || b.category }))
          }));
        } else if (id === 10) {
          setBugState({
            bug1_mainClose: true,
            bug2_cssLink: true,
            bug3_headerInsideBody: true,
            bug4_navInsideHeader: true,
            bug5_coffeePath: true,
            bug6_cakeAlt: true,
            bug7_heroSelector: true,
            bug8_cssSemicolon: true,
            bug9_flexDisplay: true,
            bug10_contactLink: true
          });
        }

        if (!completedChallenges.includes(id)) {
          setCompletedChallenges(c => [...c, id]);
        }
        setCurrentChallengeId(id);
        setIsTeacherGuideOpen(false);
        setConfirmationData(null);
      }
    });
  };

  // Explain Code click
  const handleExplainBlock = (key: string) => {
    setExplainKey(key);
    setIsExplainModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* 1. Top Navigation Bar */}
      <TopNavigation
        currentChallengeId={currentChallengeId}
        completedChallenges={completedChallenges}
        onSelectChallenge={handleSelectChallenge}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onStartAgain={handleStartAgain}
        isMuted={isMuted}
        onToggleMute={() => {
          const muted = soundManager.toggleMute();
          setIsMuted(muted);
        }}
        theme={theme}
        onToggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
      />

      {/* 2. Main 3-Column Studio Workspace */}
      <main ref={workspaceRef} style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        {/* Left: VS Code File Explorer */}
        <FileExplorer
          currentChallengeId={currentChallengeId}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          challenge1Blocks={blocksMap[1] || []}
          onMoveChallenge1File={handleMoveChallenge1File}
          width={explorerWidth}
        />

        {/* Resizer between Explorer & Code Editor */}
        <div
          className={`pane-resizer ${activeResizer === 'explorer' ? 'active' : ''}`}
          onMouseDown={() => setActiveResizer('explorer')}
          onTouchStart={() => setActiveResizer('explorer')}
          onDoubleClick={() => setExplorerWidth(260)}
          title="Drag to resize File Explorer (double-click to reset)"
          role="separator"
          aria-orientation="vertical"
        >
          <div className="pane-resizer-grip" />
        </div>

        {/* Center: Interactive Code Editor */}
        <CodeEditor
          currentChallengeId={currentChallengeId}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          blocks={currentBlocks}
          onReorderBlocks={handleReorderBlocks}
          onExplainBlock={handleExplainBlock}
          bugState={bugState}
          onToggleBug={handleToggleBug}
          onSetBugFixed={handleSetBugFixed}
          onSelectChallenge6Option={handleSelectChallenge6Option}
          onMoveChallenge8Block={handleMoveChallenge8Block}
          onMoveChallenge9Block={handleMoveChallenge9Block}
        />

        {/* Resizer between Code Editor & Live Website Preview */}
        <div
          className={`pane-resizer ${activeResizer === 'preview' ? 'active' : ''}`}
          onMouseDown={() => setActiveResizer('preview')}
          onTouchStart={() => setActiveResizer('preview')}
          onDoubleClick={() => setPreviewWidthPercent(45)}
          title="Drag left or right to resize Code Editor & Live Preview (double-click to reset)"
          role="separator"
          aria-orientation="vertical"
        >
          <div className="pane-resizer-grip" />
        </div>

        {/* Right: Live Sandboxed Website Preview */}
        <LivePreview
          htmlContent={preview.html}
          cssContent={preview.css}
          currentChallengeId={currentChallengeId}
          isCompleted={isCurrentCompleted}
          widthPercent={previewWidthPercent}
        />
      </main>

      {/* 3. Bottom Learning Assistant Panel */}
      <LearningAssistant
        challenge={currentChallenge}
        feedback={feedback}
        onCheckAnswer={handleCheckAnswer}
        onResetChallenge={handleResetChallenge}
        onNextChallenge={handleNextChallenge}
        onOpenExplainMenu={() => {
          setExplainKey('doctype');
          setIsExplainModalOpen(true);
        }}
        isLastChallenge={currentChallengeId === 10}
        onOpenCompletionModal={() => setIsCompletionModalOpen(true)}
      />

      {/* Modals */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
        currentChallengeId={currentChallengeId}
        onRequestShowSolution={handleTeacherShowSolution}
      />

      <ExplainCodeModal
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
        activeKey={explainKey}
        onSelectKey={setExplainKey}
      />

      <CompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
      />

      {confirmationData && (
        <ConfirmationModal
          isOpen={confirmationData.isOpen}
          title={confirmationData.title}
          message={confirmationData.message}
          confirmLabel={confirmationData.confirmLabel}
          confirmVariant={confirmationData.confirmVariant}
          onConfirm={confirmationData.onConfirm}
          onCancel={() => setConfirmationData(null)}
        />
      )}
    </div>
  );
};

export default App;
