import React, { useState, useRef } from 'react';
import { Monitor, Tablet, Smartphone, RotateCcw, Globe } from 'lucide-react';
import type { ChallengeId } from '../types/challenge';

interface LivePreviewProps {
  htmlContent: string;
  cssContent: string;
  currentChallengeId: ChallengeId;
  isCompleted?: boolean;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  htmlContent,
  cssContent,
  currentChallengeId,
  isCompleted = false
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [reloadKey, setReloadKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Combine HTML and CSS into iframe document
  const getCombinedDocument = () => {
    let doc = htmlContent;

    // If CSS is present and not already embedded in <style>
    if (cssContent && !doc.includes(cssContent)) {
      if (doc.includes('</head>')) {
        doc = doc.replace('</head>', `<style>${cssContent}</style></head>`);
      } else if (doc.includes('<body>')) {
        doc = doc.replace('<body>', `<head><style>${cssContent}</style></head><body>`);
      } else {
        doc = `<style>${cssContent}</style>${doc}`;
      }
    }

    return doc;
  };

  const getContainerWidth = () => {
    switch (deviceMode) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  return (
    <section style={{
      width: '45%',
      minWidth: '380px',
      backgroundColor: 'var(--bg-surface)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }}>
      {/* Browser Chrome Header */}
      <div style={{
        height: '42px',
        backgroundColor: 'var(--bg-panel-header)',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '8px',
        userSelect: 'none'
      }}>
        {/* Window dots */}
        <div style={{ display: 'flex', gap: '5px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>

        {/* URL Bar */}
        <div style={{
          flex: 1,
          maxWidth: '480px',
          height: '26px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: '4px',
          border: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
          gap: '6px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <Globe size={13} color="var(--color-css)" />
          <span style={{ fontFamily: 'var(--font-mono)' }}>
            http://localhost:3000/bristol-cafe/index.html (Ch. {currentChallengeId})
          </span>
        </div>

        {/* Device Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: 'var(--bg-surface)', borderRadius: '4px', padding: '2px', border: '1px solid var(--border-light)' }}>
          <button
            onClick={() => setDeviceMode('desktop')}
            title="Desktop View (100%)"
            style={{
              padding: '4px',
              borderRadius: '3px',
              backgroundColor: deviceMode === 'desktop' ? 'var(--bg-panel-header)' : 'transparent',
              color: deviceMode === 'desktop' ? 'var(--text-main)' : 'var(--text-muted)'
            }}
          >
            <Monitor size={14} />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            title="Tablet View (768px)"
            style={{
              padding: '4px',
              borderRadius: '3px',
              backgroundColor: deviceMode === 'tablet' ? 'var(--bg-panel-header)' : 'transparent',
              color: deviceMode === 'tablet' ? 'var(--text-main)' : 'var(--text-muted)'
            }}
          >
            <Tablet size={14} />
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            title="Mobile View (375px)"
            style={{
              padding: '4px',
              borderRadius: '3px',
              backgroundColor: deviceMode === 'mobile' ? 'var(--bg-panel-header)' : 'transparent',
              color: deviceMode === 'mobile' ? 'var(--text-main)' : 'var(--text-muted)'
            }}
          >
            <Smartphone size={14} />
          </button>
        </div>

        {/* Reload Preview */}
        <button
          onClick={() => setReloadKey(prev => prev + 1)}
          title="Reload Preview"
          style={{
            padding: '4px 6px',
            borderRadius: '4px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Preview Viewport Container */}
      <div style={{
        flex: 1,
        backgroundColor: '#e9ecef',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: deviceMode === 'desktop' ? '0' : '16px',
        overflow: 'auto',
        position: 'relative'
      }}>
        <div style={{
          width: getContainerWidth(),
          height: '100%',
          backgroundColor: '#ffffff',
          borderRadius: deviceMode === 'desktop' ? '0' : '8px',
          boxShadow: deviceMode === 'desktop' ? 'none' : 'var(--shadow-md)',
          overflow: 'hidden',
          transition: 'width 0.25s ease',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <iframe
            key={reloadKey}
            ref={iframeRef}
            srcDoc={getCombinedDocument()}
            title="Bristol Brew Café Live Website Preview"
            sandbox="allow-same-origin"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#ffffff'
            }}
          />
        </div>
      </div>

      {/* Preview Status Banner */}
      <div style={{
        padding: '6px 14px',
        backgroundColor: 'var(--bg-surface-subtle)',
        borderTop: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.72rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isCompleted ? 'var(--color-success)' : 'var(--color-hint)' }} />
          <span>{isCompleted ? '✓ Live Site Fully Validated' : 'Interactive Sandbox: Live Sandboxed Iframe'}</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)' }}>Viewport: {deviceMode}</span>
      </div>
    </section>
  );
};
