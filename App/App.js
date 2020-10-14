import React from 'react'
import 'react-native-gesture-handler'
import 'react-native-gesture-handler'
import * as eva from '@eva-design/eva'
import { ApplicationProvider as UIKittenProvider } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-community/async-storage'

import { SignIn, ClassList } from '../Screens'
import { BottomTabBar } from '../Components'
import { AuthContext, AuthProvider } from './AuthProvider'

const DefaultScreen = createStackNavigator()
const SignedInTab = createBottomTabNavigator()
const SignInStack = createStackNavigator()

const SignedInTabScreen = () => (
  <SignedInTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <SignedInTab.Screen name="ClassList" component={ClassList} />
  </SignedInTab.Navigator>
)

const SignInStackScreen = () => (
  <SignInStack.Navigator>
    <SignInStack.Screen name="SignIn" component={SignIn} />
  </SignInStack.Navigator>
)

const App = () => {
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken

      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken })
    }

    bootstrapAsync()
  })

  const { state, dispatch, authContext } = AuthProvider()

  return (
    <NavigationContainer>
      <UIKittenProvider {...eva} theme={eva.light}>
        <AuthContext.Provider value={authContext}>
          <DefaultScreen.Navigator>
            {state.userToken != null ? (
              <DefaultScreen.Screen
                name="SignedInTab"
                component={SignedInTabScreen}
              />
            ) : (
              <DefaultScreen.Screen
                name="SignInStack"
                component={SignInStackScreen}
              />
            )}
          </DefaultScreen.Navigator>
        </AuthContext.Provider>
      </UIKittenProvider>
    </NavigationContainer>
  )
}

export default App
