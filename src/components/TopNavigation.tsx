import React from 'react';
import { Coffee, BookOpen, GraduationCap, Maximize, RotateCcw, Volume2, VolumeX, CheckCircle } from 'lucide-react';
import type { ChallengeId } from '../types/challenge';
import { CHALLENGES } from '../data/challenges';

interface TopNavigationProps {
  currentChallengeId: ChallengeId;
  completedChallenges: ChallengeId[];
  onSelectChallenge: (id: ChallengeId) => void;
  onOpenTeacherGuide: () => void;
  onOpenGlossary: () => void;
  onStartAgain: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  currentChallengeId,
  completedChallenges,
  onSelectChallenge,
  onOpenTeacherGuide,
  onOpenGlossary,
  onStartAgain,
  isMuted,
  onToggleMute
}) => {
  const progressPercent = Math.round((completedChallenges.length / CHALLENGES.length) * 100);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <header className="top-nav" style={{
      height: '58px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      gap: '12px',
      zIndex: 100
    }}>
      {/* Left: Branding & Tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, #3d2314 0%, #2b1810 100%)',
          color: '#ffffff',
          padding: '6px 12px',
          borderRadius: 'var(--radius-sm)',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <Coffee size={20} color="#e59957" />
          <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.3px' }}>
            Bristol Café Code Lab
          </span>
        </div>
        <span style={{
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          padding: '3px 8px',
          background: 'var(--bg-panel-header)',
          borderRadius: '4px',
          fontWeight: 600,
          border: '1px solid var(--border-light)'
        }}>
          BTEC Unit 15: Website Development
        </span>
      </div>

      {/* Middle: Stepper & Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '580px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {CHALLENGES.map((ch) => {
            const isCompleted = completedChallenges.includes(ch.id);
            const isCurrent = ch.id === currentChallengeId;
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChallenge(ch.id)}
                title={`Challenge ${ch.id}: ${ch.title}`}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: isCurrent
                    ? 'var(--cafe-accent)'
                    : isCompleted
                    ? 'var(--color-success)'
                    : 'var(--bg-panel-header)',
                  color: isCurrent || isCompleted ? '#ffffff' : 'var(--text-muted)',
                  border: isCurrent ? '2px solid var(--cafe-primary)' : '1px solid var(--border-medium)',
                  transition: 'all 0.15s ease'
                }}
              >
                {isCompleted ? <CheckCircle size={14} /> : ch.id}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '120px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            <span>Challenge {currentChallengeId} of 10</span>
            <span>{progressPercent}% Done</span>
          </div>
          <div style={{ height: '6px', background: 'var(--border-light)', borderRadius: '3px', overflow: 'hidden', marginTop: '2px' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #c97a3e, #2e7d32)',
              borderRadius: '3px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={onOpenTeacherGuide}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.82rem', borderColor: 'var(--color-hint)' }}
          title="Open Classroom Teacher Guide & Solutions"
        >
          <GraduationCap size={16} color="var(--color-hint)" />
          <span>Teacher Guide</span>
        </button>

        <button
          onClick={onOpenGlossary}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.82rem' }}
          title="Searchable HTML & CSS Glossary"
        >
          <BookOpen size={16} color="var(--color-css)" />
          <span>Glossary</span>
        </button>

        <button
          onClick={onToggleMute}
          style={{
            padding: '7px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center'
          }}
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <button
          onClick={toggleFullScreen}
          style={{
            padding: '7px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Toggle Fullscreen for Classroom Display"
        >
          <Maximize size={16} />
        </button>

        <button
          onClick={onStartAgain}
          style={{
            padding: '7px 10px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            color: 'var(--color-error)',
            fontSize: '0.78rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title="Reset All Progress and Start Again"
        >
          <RotateCcw size={14} />
          <span>Start Again</span>
        </button>
      </div>
    </header>
  );
};
