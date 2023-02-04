// import { StatusBar } from 'expo-status-bar';
import AllScreens from './screens/AllScreens';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store/store';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          Hubhead: require('./assets/fonts/Hubhead.otf'),
          'Givonic-Variable': require('./assets/fonts/Givonic-Font/GivonicVariable.otf'),
          'Givonic-Black': require('./assets/fonts/Givonic-Font/Givonic-Black.otf'),
          'Givonic-Bold': require('./assets/fonts/Givonic-Font/Givonic-Bold.otf'),
          'Givonic-Light': require('./assets/fonts/Givonic-Font/Givonic-Light.otf'),
          'Givonic-Regular': require('./assets/fonts/Givonic-Font/Givonic-Regular.otf'),
          'Givonic-SemiBold': require('./assets/fonts/Givonic-Font/Givonic-SemiBold.otf'),
          'Givonic-Thin': require('./assets/fonts/Givonic-Font/Givonic-Thin.otf'),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StoreProvider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <GestureHandlerRootView
              onLayout={onLayoutRootView}
              style={styles.container}
            >
              <AllScreens />
            </GestureHandlerRootView>
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
      <StatusBar backgroundColor='black' barStyle={'light-content'} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
