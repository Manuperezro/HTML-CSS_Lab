import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, AlertCircle, HelpCircle, Lightbulb, ChevronRight, Eye } from 'lucide-react';
import { TEACHER_GUIDE_DATA } from '../data/teacherGuideData';
import type { ChallengeId } from '../types/challenge';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentChallengeId: ChallengeId;
  onRequestShowSolution: (id: ChallengeId) => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({
  isOpen,
  onClose,
  currentChallengeId,
  onRequestShowSolution
}) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<ChallengeId>(currentChallengeId);

  if (!isOpen) return null;

  const currentItem = TEACHER_GUIDE_DATA.find(d => d.challengeId === selectedChallengeId) || TEACHER_GUIDE_DATA[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '950px', height: '85vh' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>
            <GraduationCap size={24} color="var(--cafe-accent)" />
            <span>BTEC Unit 15 Teacher Guide & Pedagogical Reference</span>
          </h2>
          <button className="modal-close-btn" onClick={onClose} title="Close Guide">
            <X size={20} />
          </button>
        </div>

        {/* Master-Detail Layout */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left Challenge Selector Sidebar */}
          <div style={{
            width: '260px',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderRight: '1px solid var(--border-light)',
            overflowY: 'auto',
            padding: '10px 8px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', padding: '6px 10px', textTransform: 'uppercase' }}>
              Select Challenge:
            </div>
            {TEACHER_GUIDE_DATA.map(item => (
              <button
                key={item.challengeId}
                onClick={() => setSelectedChallengeId(item.challengeId)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: selectedChallengeId === item.challengeId ? 'var(--bg-surface)' : 'transparent',
                  color: selectedChallengeId === item.challengeId ? 'var(--cafe-accent)' : 'var(--text-main)',
                  fontWeight: selectedChallengeId === item.challengeId ? 700 : 500,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '2px',
                  border: selectedChallengeId === item.challengeId ? '1px solid var(--border-medium)' : '1px solid transparent'
                }}
              >
                <span>Ch. {item.challengeId}: {item.title.split(':')[1]?.trim() || item.title}</span>
                <ChevronRight size={14} color="var(--text-faint)" />
              </button>
            ))}
          </div>

          {/* Right Challenge Detail Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Title & Classroom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: '14px' }}>
              <div>
                <span className="badge badge-html" style={{ marginBottom: '6px' }}>
                  Challenge {currentItem.challengeId} Pedagogical Plan
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-main)', margin: '4px 0' }}>
                  {currentItem.title}
                </h3>
              </div>

              {/* Show Solution Button */}
              <button
                onClick={() => onRequestShowSolution(currentItem.challengeId)}
                className="btn-secondary"
                style={{ borderColor: 'var(--cafe-accent)', color: 'var(--cafe-accent)', padding: '8px 14px', fontSize: '0.82rem' }}
                title="Demonstrate solution to classroom"
              >
                <Eye size={16} />
                <span>Teacher: Show Solution</span>
              </button>
            </div>

            {/* Learning Objectives */}
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--color-success)" />
                <span>Unit 15 Learning Objectives:</span>
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {currentItem.learningObjectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>

            {/* Concepts Introduced */}
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                🔑 Key Concepts Introduced:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {currentItem.newConcepts.map((c, i) => (
                  <span key={i} className="badge badge-css" style={{ textTransform: 'none' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Common Student Misconceptions */}
            <div style={{ backgroundColor: 'var(--color-error-bg)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(198,40,40,0.2)' }}>
              <h4 style={{ fontSize: '0.88rem', color: 'var(--color-error)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={16} />
                <span>Common Student Misconceptions & Gotchas:</span>
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
                {currentItem.commonMisconceptions.map((mis, i) => (
                  <li key={i}>{mis}</li>
                ))}
              </ul>
            </div>

            {/* Suggested Teacher Questions */}
            <div style={{ backgroundColor: 'var(--color-hint-bg)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245,127,23,0.3)' }}>
              <h4 style={{ fontSize: '0.88rem', color: '#5c3e00', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={16} color="var(--color-hint)" />
                <span>Suggested Classroom Prompts & Questions:</span>
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
                {currentItem.suggestedQuestions.map((q, i) => (
                  <li key={i}>"{q}"</li>
                ))}
              </ul>
            </div>

            {/* Extension Tasks for Faster Learners */}
            <div style={{ backgroundColor: 'var(--cafe-cream)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid #ebd9c8' }}>
              <h4 style={{ fontSize: '0.88rem', color: 'var(--cafe-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lightbulb size={16} color="var(--cafe-accent)" />
                <span>Extension Tasks (for fast learners & merit/distinction criteria):</span>
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--cafe-primary)', lineHeight: 1.45 }}>
                {currentItem.extensionTasks.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Expected Code Solution */}
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                Expected Code Solution:
              </h4>
              <pre style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-main)',
                overflowX: 'auto',
                lineHeight: 1.4
              }}>
                {currentItem.expectedCode.html || currentItem.expectedCode.css}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close Teacher Guide
          </button>
        </div>
      </div>
    </div>
  );
};
