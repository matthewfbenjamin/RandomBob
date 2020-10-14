import React from 'react'
import 'react-native-gesture-handler'
import 'react-native-gesture-handler'
import * as eva from '@eva-design/eva'
import { ApplicationProvider as UIKittenProvider } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { SignIn, ClassList } from './Screens'
import { BottomTabBar } from './Components'

const DefaultScreen = createStackNavigator()
const SignedInTab = createBottomTabNavigator()
const SignInStack = createStackNavigator()

const SignedInTabScreen = () => (
  <SignedInTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <SignedInTab.Screen name="ClassList" component={ClassList} />
  </SignedInTab.Navigator>
)

console.log(SignIn)

const SignInStackScreen = () => (
  <SignInStack.Navigator>
    <SignInStack.Screen name="SignIn" component={SignIn} />
  </SignInStack.Navigator>
)

const App = () => {
  const isSignedIn = false
  return (
    <NavigationContainer>
      <UIKittenProvider {...eva} theme={eva.light}>
        <DefaultScreen.Navigator>
          {isSignedIn ? (
            <DefaultScreen.Screen
              name="SignedInTab"
              component={SignedInTabScreen}
            />
          ) : (
            <DefaultScreen.Screen name="SignInStack" component={SignInStackScreen} />
          )}
        </DefaultScreen.Navigator>
      </UIKittenProvider>
    </NavigationContainer>
  )
}

export default App