import React from 'react';
import { Folder, FolderOpen, FileCode, FileText, Image, ChevronDown, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import type { ChallengeId, CodeBlock } from '../types/challenge';

interface FileExplorerProps {
  currentChallengeId: ChallengeId;
  activeTab: 'index.html' | 'style.css' | 'files';
  onSelectTab: (tab: 'index.html' | 'style.css' | 'files') => void;
  challenge1Blocks: CodeBlock[];
  onMoveChallenge1File?: (fileId: string, targetCategory: 'root' | 'images') => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  currentChallengeId,
  activeTab,
  onSelectTab,
  challenge1Blocks,
  onMoveChallenge1File
}) => {
  const [isImagesOpen, setIsImagesOpen] = React.useState(true);
  const isChallenge1 = currentChallengeId === 1;

  // Separate files for Challenge 1
  const rootFiles = challenge1Blocks.filter(b => b.category === 'root');
  const imageFiles = challenge1Blocks.filter(b => b.category === 'images');

  return (
    <aside style={{
      width: '280px',
      backgroundColor: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-light)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      userSelect: 'none'
    }}>
      {/* Explorer Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-surface-subtle)'
      }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.6px', color: 'var(--text-muted)' }}>
          EXPLORER: BRISTOL-CAFE
        </span>
        {isChallenge1 && (
          <span className="badge badge-html" style={{ fontSize: '0.65rem' }}>
            Interactive Mode
          </span>
        )}
      </div>

      {/* Explorer Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
        {isChallenge1 ? (
          /* Challenge 1: Interactive File Organizer */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{
              padding: '10px',
              backgroundColor: 'var(--color-hint-bg)',
              border: '1px solid rgba(245, 127, 23, 0.3)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              color: 'var(--text-main)'
            }}>
              <strong>Task:</strong> Move files to their correct destination. Images belong in <code>images/</code>, HTML and CSS in the root.
            </div>

            {/* Root Dropzone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const fileId = e.dataTransfer.getData('text/plain');
                if (fileId && onMoveChallenge1File) onMoveChallenge1File(fileId, 'root');
              }}
              style={{
                backgroundColor: 'var(--bg-surface-subtle)',
                border: '2px dashed var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                <FolderOpen size={16} color="var(--cafe-accent)" />
                <span>📁 Root: bristol-cafe/ (2 files belong here)</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {rootFiles.length === 0 ? (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontStyle: 'italic', padding: '8px', textAlign: 'center' }}>
                    Drop index.html and style.css here
                  </div>
                ) : (
                  rootFiles.map(file => (
                    <div
                      key={file.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', file.id)}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.82rem',
                        cursor: 'grab',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {file.content.endsWith('.html') ? (
                          <FileCode size={16} color="var(--color-html)" />
                        ) : file.content.endsWith('.css') ? (
                          <FileText size={16} color="var(--color-css)" />
                        ) : (
                          <Image size={16} color="var(--color-error)" />
                        )}
                        <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{file.content}</span>
                      </div>
                      <button
                        onClick={() => onMoveChallenge1File && onMoveChallenge1File(file.id, 'images')}
                        title="Move to images folder"
                        style={{
                          fontSize: '0.7rem',
                          padding: '3px 6px',
                          background: 'var(--bg-panel-header)',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          color: 'var(--text-muted)'
                        }}
                      >
                        <span>to images/</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Images Dropzone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const fileId = e.dataTransfer.getData('text/plain');
                if (fileId && onMoveChallenge1File) onMoveChallenge1File(fileId, 'images');
              }}
              style={{
                backgroundColor: 'var(--bg-surface-subtle)',
                border: '2px dashed var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                <FolderOpen size={16} color="#d97706" />
                <span>📁 Subfolder: images/ (3 photos belong here)</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {imageFiles.length === 0 ? (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontStyle: 'italic', padding: '8px', textAlign: 'center' }}>
                    Drop all .jpg image files here
                  </div>
                ) : (
                  imageFiles.map(file => (
                    <div
                      key={file.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', file.id)}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.82rem',
                        cursor: 'grab',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {file.content.endsWith('.jpg') ? (
                          <Image size={16} color="var(--color-success)" />
                        ) : file.content.endsWith('.html') ? (
                          <FileCode size={16} color="var(--color-error)" />
                        ) : (
                          <FileText size={16} color="var(--color-error)" />
                        )}
                        <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{file.content}</span>
                      </div>
                      <button
                        onClick={() => onMoveChallenge1File && onMoveChallenge1File(file.id, 'root')}
                        title="Move to root folder"
                        style={{
                          fontSize: '0.7rem',
                          padding: '3px 6px',
                          background: 'var(--bg-panel-header)',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          color: 'var(--text-muted)'
                        }}
                      >
                        <ArrowLeft size={12} />
                        <span>to root</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Normal VS Code Explorer Tree for Challenges 2-10 */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {/* Root folder item */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--text-main)',
              borderRadius: 'var(--radius-sm)'
            }}>
              <FolderOpen size={16} color="var(--cafe-accent)" />
              <span>bristol-cafe</span>
            </div>

            {/* index.html */}
            <button
              onClick={() => onSelectTab('index.html')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px 6px 26px',
                fontSize: '0.83rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: activeTab === 'index.html' ? 'var(--color-html-bg)' : 'transparent',
                color: activeTab === 'index.html' ? 'var(--color-html)' : 'var(--text-main)',
                fontWeight: activeTab === 'index.html' ? 700 : 500,
                width: '100%',
                textAlign: 'left'
              }}
            >
              <FileCode size={16} color="var(--color-html)" />
              <span style={{ fontFamily: 'var(--font-mono)' }}>index.html</span>
              {activeTab === 'index.html' && (
                <span style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-html)' }} />
              )}
            </button>

            {/* style.css */}
            <button
              onClick={() => onSelectTab('style.css')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px 6px 26px',
                fontSize: '0.83rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: activeTab === 'style.css' ? 'var(--color-css-bg)' : 'transparent',
                color: activeTab === 'style.css' ? 'var(--color-css)' : 'var(--text-main)',
                fontWeight: activeTab === 'style.css' ? 700 : 500,
                width: '100%',
                textAlign: 'left'
              }}
            >
              <FileText size={16} color="var(--color-css)" />
              <span style={{ fontFamily: 'var(--font-mono)' }}>style.css</span>
              {activeTab === 'style.css' && (
                <span style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-css)' }} />
              )}
            </button>

            {/* images folder */}
            <div style={{ marginTop: '4px' }}>
              <button
                onClick={() => setIsImagesOpen(!isImagesOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px 5px 20px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  width: '100%'
                }}
              >
                {isImagesOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                {isImagesOpen ? <FolderOpen size={15} color="#d97706" /> : <Folder size={15} color="#d97706" />}
                <span>images</span>
              </button>

              {isImagesOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginLeft: '36px', marginTop: '2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <Image size={14} color="var(--color-success)" />
                    <span style={{ fontFamily: 'var(--font-mono)' }}>coffee.jpg</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <Image size={14} color="var(--color-success)" />
                    <span style={{ fontFamily: 'var(--font-mono)' }}>cafe-interior.jpg</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <Image size={14} color="var(--color-success)" />
                    <span style={{ fontFamily: 'var(--font-mono)' }}>cake.jpg</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Explorer Footer Notes */}
      <div style={{
        padding: '12px',
        borderTop: '1px solid var(--border-light)',
        backgroundColor: 'var(--bg-surface-subtle)',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        lineHeight: 1.4
      }}>
        <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '3px' }}>
          ☕ Bristol Brew Café Root
        </div>
        Standard structure: <code>index.html</code> at root, assets in subdirectories.
      </div>
    </aside>
  );
};
