import { useEffect } from 'react';

export function useKeyboardShortcuts({
  onPlayPause,
  onStepNext,
  onStepPrev,
  onReset,
  onShuffle,
  enabled = true
}) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e) {
      // Don't trigger if user is typing inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          onPlayPause?.();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onStepNext?.();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onStepPrev?.();
          break;
        case 'KeyR':
          e.preventDefault();
          onReset?.();
          break;
        case 'KeyS':
          e.preventDefault();
          onShuffle?.();
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPlayPause, onStepNext, onStepPrev, onReset, onShuffle, enabled]);
}
