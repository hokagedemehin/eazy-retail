import { useEffect } from 'react';
import { AppState, Platform, AppStateStatus } from 'react-native';
import { focusManager } from '@tanstack/react-query';
// import type { AppStateStatus } from "react-native"

export function useAppState(onChange: (status: AppStateStatus) => void) {

  function onAppStateChange(status: AppStateStatus) {
    // React Query already supports in web browser refetch on window focus by default
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status) => {
      if (status !== 'active') {
        return;
      }
      onAppStateChange(status);
      // subscription.remove();
      return () => {
        subscription.remove();
      };
    });
  }, [onChange]);
}
