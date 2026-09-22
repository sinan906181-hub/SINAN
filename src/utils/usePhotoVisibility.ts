import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const STORAGE_KEY = 'sinan_hide_profile_photo';
const EVENT_NAME = 'sinan_hide_photo_changed';

export function usePhotoVisibility() {
  const [hidePhoto, setHidePhotoState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Listen to local changes across components / tabs
  useEffect(() => {
    const handleCustomEvent = (e: CustomEvent<boolean>) => {
      setHidePhotoState(Boolean(e.detail));
    };

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setHidePhotoState(e.newValue === 'true');
      }
    };

    window.addEventListener(EVENT_NAME as any, handleCustomEvent as EventListener);
    window.addEventListener('storage', handleStorageEvent);

    // Sync from Firestore in background
    let unsubscribe = () => {};
    try {
      const configDocRef = doc(db, 'settings', 'portfolioConfig');
      unsubscribe = onSnapshot(configDocRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (typeof data.hideProfilePhoto === 'boolean') {
            setHidePhotoState(data.hideProfilePhoto);
            try {
              localStorage.setItem(STORAGE_KEY, String(data.hideProfilePhoto));
            } catch {}
          }
        }
      }, (err) => {
        // Silent fallback to local storage
        console.debug('Firestore photo visibility listener notice:', err);
      });
    } catch (e) {
      console.debug('Firestore init notice:', e);
    }

    return () => {
      window.removeEventListener(EVENT_NAME as any, handleCustomEvent as EventListener);
      window.removeEventListener('storage', handleStorageEvent);
      unsubscribe();
    };
  }, []);

  const toggleHidePhoto = useCallback((explicitValue?: boolean) => {
    setHidePhotoState((prev) => {
      const nextVal = typeof explicitValue === 'boolean' ? explicitValue : !prev;

      try {
        localStorage.setItem(STORAGE_KEY, String(nextVal));
      } catch {}

      // Dispatch event for other components on current page
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: nextVal }));

      // Persist to Firestore asynchronously
      (async () => {
        try {
          const configDocRef = doc(db, 'settings', 'portfolioConfig');
          await setDoc(configDocRef, { hideProfilePhoto: nextVal }, { merge: true });
        } catch (err) {
          console.debug('Firestore photo config save notice:', err);
        }
      })();

      return nextVal;
    });
  }, []);

  return {
    hidePhoto,
    toggleHidePhoto,
    setHidePhoto: toggleHidePhoto,
  };
}
