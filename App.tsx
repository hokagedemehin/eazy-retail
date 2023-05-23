// import { StatusBar } from 'expo-status-bar';
import AllScreens from './screens/AllScreens';
import * as SplashScreen from 'expo-splash-screen';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store/store';
import { ToastProvider } from 'react-native-toast-notifications';
import { RootStackParamList } from './interfaces/navigation/navigation';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';
import { useAppState } from '@/hooks/react-query/useAppState';
import type { AppStateStatus } from 'react-native';
// import NetInfo from '@react-native-community/netinfo'
import { useOnlineManager } from '@/hooks/react-query/useOnlineManager';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const theme = useTheme();

  // **************** DEEP LINKING ****************
  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['easyretail://'],
    config: {
      screens: {
        Onboarding: 'Onboarding',
        SignIn: 'SignIn',
        SignUp: 'SignUp',
        PhoneVerification: 'PhoneVerification',
        BusinessName: 'BusinessName',
        BusinessLocation: 'BusinessLocation',
        SelectIndustry: 'SelectIndustry',
        RegistrationSuccessfull: 'RegistrationSuccessful',
        Home: {
          screens: {
            CounterPage: {
              screens: {
                Counter: 'Counter',
                CounterProduct: 'CounterProduct',
                NewSale: 'NewSale',
                ConfirmSale: 'ConfirmSale',
                CashPayment: 'CashPayment',
                CardPayment: 'CardPayment',
                CreditPayment: 'CreditPayment',
                SaleSuccess: 'SaleSuccess',
              },
            },
            SalesPage: 'SalesPage',
            InventoryPage: {
              screens: {
                InventoryHome: {
                  screens: {
                    AllProductList: {
                      screens: {
                        AllProducts: 'AllProducts',
                        LowStockProducts: 'LowStockProducts',
                        ExpiringProducts: 'ExpiringProducts',
                      },
                    },
                    AllCategoryList: 'AllCategoryList',
                  },
                },
                AddProduct: {
                  screens: {
                    AddSimpleProduct: 'AddSimpleProduct',
                    AddAdvancedProduct: 'AddAdvancedProduct',
                  },
                },
                AddCategory: 'AddCategory',
                AddVariant: 'AddVariant',
                AddBarcodeScanner: 'AddBarcodeScanner',
              },
            },
            ProfilePage: 'ProfilePage',
            MorePage: 'MorePage',
          },
        },
      },
    },
  };

  // *************** REACT QUERY ***************

  useOnlineManager();

  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });

  useAppState(onAppStateChange);

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
        <PaperProvider
          theme={{
            ...theme,
            dark: false,
          }}
        >
          <QueryClientProvider client={queryClient}>
            <NavigationContainer linking={linking}>
              <GestureHandlerRootView
                onLayout={onLayoutRootView}
                style={styles.container}
              >
                <ToastProvider placement='top'>
                  <AllScreens />
                </ToastProvider>
              </GestureHandlerRootView>
            </NavigationContainer>
          </QueryClientProvider>
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
