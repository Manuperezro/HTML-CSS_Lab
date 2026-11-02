import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, HelpCircle, Sparkles, Info } from 'lucide-react';
import type { Challenge, ValidationFeedback } from '../types/challenge';

interface LearningAssistantProps {
  challenge: Challenge;
  feedback: ValidationFeedback | null;
  onCheckAnswer: () => void;
  onResetChallenge: () => void;
  onNextChallenge: () => void;
  onOpenExplainMenu: () => void;
  isLastChallenge: boolean;
  onOpenCompletionModal: () => void;
}

export const LearningAssistant: React.FC<LearningAssistantProps> = ({
  challenge,
  feedback,
  onCheckAnswer,
  onResetChallenge,
  onNextChallenge,
  onOpenExplainMenu,
  isLastChallenge,
  onOpenCompletionModal
}) => {
  const [activeHintLevel, setActiveHintLevel] = useState<number>(0);
  const [showFunFact, setShowFunFact] = useState<boolean>(false);

  // Cycle hints 1 -> 2 -> 3
  const handleNextHint = () => {
    setActiveHintLevel(prev => (prev < 3 ? prev + 1 : 1));
  };

  return (
    <footer style={{
      backgroundColor: 'var(--bg-surface)',
      borderTop: '2px solid var(--border-light)',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '320px',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.03)',
      zIndex: 50
    }}>
      {/* Action Toolbar */}
      <div style={{
        padding: '10px 20px',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-surface-subtle)',
        gap: '12px'
      }}>
        {/* Left: Challenge Title & Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-html" style={{ fontWeight: 800 }}>
            Challenge {challenge.id}
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            color: 'var(--text-main)',
            margin: 0,
            fontWeight: 700
          }}>
            {challenge.title}
          </h2>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            ({challenge.difficulty})
          </span>
        </div>

        {/* Right: Controls (Check Answer, Hint, Explain, Reset) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onResetChallenge}
            className="btn-secondary"
            style={{ padding: '7px 12px', fontSize: '0.8rem' }}
            title="Reset code blocks and shuffle"
          >
            <RotateCcw size={14} />
            <span>Reset Challenge</span>
          </button>

          <button
            onClick={handleNextHint}
            className="btn-secondary"
            style={{
              padding: '7px 12px',
              fontSize: '0.8rem',
              backgroundColor: activeHintLevel > 0 ? 'var(--color-hint-bg)' : undefined,
              borderColor: activeHintLevel > 0 ? 'var(--color-hint)' : undefined,
              color: activeHintLevel > 0 ? 'var(--color-hint)' : undefined
            }}
            title="Reveal progressive hints"
          >
            <Lightbulb size={14} />
            <span>Hint {activeHintLevel > 0 ? `(${activeHintLevel}/3)` : ''}</span>
          </button>

          <button
            onClick={onOpenExplainMenu}
            className="btn-secondary"
            style={{ padding: '7px 12px', fontSize: '0.8rem' }}
            title="Understand HTML & CSS concepts"
          >
            <HelpCircle size={14} color="var(--color-css)" />
            <span>Explain This Code</span>
          </button>

          {feedback?.isValid ? (
            <button
              onClick={isLastChallenge ? onOpenCompletionModal : onNextChallenge}
              className="btn-success"
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              <span>{isLastChallenge ? 'Complete Project 🎉' : 'Next Challenge'}</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={onCheckAnswer}
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.88rem' }}
            >
              <CheckCircle2 size={16} />
              <span>Check Answer</span>
            </button>
          )}
        </div>
      </div>

      {/* Assistant Body: Instructions + Feedback Area */}
      <div style={{
        display: 'flex',
        padding: '14px 20px',
        gap: '20px',
        overflowY: 'auto'
      }}>
        {/* Left Column: Instructions */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Info size={15} color="var(--cafe-accent)" />
            <span>Instructions:</span>
          </div>
          <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
            {challenge.instructions.map((inst, i) => (
              <li key={i} style={{ marginBottom: '3px' }}>{inst}</li>
            ))}
          </ul>

          {/* Did You Know toggle */}
          <div style={{ marginTop: '8px' }}>
            <button
              onClick={() => setShowFunFact(!showFunFact)}
              style={{
                fontSize: '0.75rem',
                color: 'var(--cafe-accent)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Sparkles size={13} />
              <span>{showFunFact ? 'Hide Did You Know?' : 'Did You Know?'}</span>
            </button>
            {showFunFact && (
              <div style={{
                marginTop: '4px',
                padding: '6px 10px',
                backgroundColor: 'var(--cafe-cream)',
                border: '1px solid #ebd9c8',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                color: 'var(--cafe-primary)'
              }}>
                {challenge.funFact}
              </div>
            )}
          </div>
        </div>

        {/* Middle/Right Column: Feedback & Active Hint Display */}
        <div style={{ flex: 1.2, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Active Hint Card */}
          {activeHintLevel > 0 && (
            <div style={{
              padding: '10px 14px',
              backgroundColor: 'var(--color-hint-bg)',
              border: '1px solid rgba(245, 127, 23, 0.35)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              color: '#5c3e00'
            }}>
              <div style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                <Lightbulb size={15} color="var(--color-hint)" />
                <span>Hint Level {activeHintLevel} of 3:</span>
              </div>
              <p style={{ margin: 0 }}>
                {challenge.hints[activeHintLevel - 1]}
              </p>
            </div>
          )}

          {/* Validation Feedback Card */}
          {feedback ? (
            <div style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: feedback.isValid
                ? 'var(--color-success-bg)'
                : feedback.messageType === 'specific'
                ? '#fff8e1'
                : feedback.messageType === 'visual'
                ? '#f3e5f5'
                : 'var(--color-error-bg)',
              border: feedback.isValid
                ? '1px solid var(--color-success)'
                : feedback.messageType === 'specific'
                ? '1px solid #ffb300'
                : feedback.messageType === 'visual'
                ? '1px solid #ab47bc'
                : '1px solid var(--color-error)'
            }}>
              <div style={{
                fontWeight: 800,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: feedback.isValid ? 'var(--color-success)' : 'var(--text-main)',
                marginBottom: '4px'
              }}>
                {feedback.isValid ? (
                  <CheckCircle2 size={18} color="var(--color-success)" />
                ) : (
                  <AlertTriangle size={18} color={feedback.messageType === 'specific' ? '#f57f17' : 'var(--color-error)'} />
                )}
                <span>{feedback.title}</span>
              </div>

              <p style={{ fontSize: '0.83rem', color: 'var(--text-main)', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                {feedback.message}
              </p>

              {/* Positive Highlights on Success */}
              {feedback.positiveHighlights && feedback.positiveHighlights.length > 0 && (
                <ul style={{ paddingLeft: '18px', fontSize: '0.78rem', color: '#1b5e20', margin: '4px 0' }}>
                  {feedback.positiveHighlights.map((hl, idx) => (
                    <li key={idx}>✓ {hl}</li>
                  ))}
                </ul>
              )}

              {/* Visual Structure Hint for 3rd attempt */}
              {feedback.visualStructureHint && (
                <pre style={{
                  backgroundColor: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-medium)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-main)',
                  marginTop: '6px',
                  overflowX: 'auto'
                }}>
                  {feedback.visualStructureHint}
                </pre>
              )}
            </div>
          ) : (
            <div style={{
              padding: '12px 14px',
              backgroundColor: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.82rem',
              color: 'var(--text-muted)'
            }}>
              Arrange the code blocks in the editor, then click <strong>"Check Answer"</strong> to test your solution and preview the website!
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
