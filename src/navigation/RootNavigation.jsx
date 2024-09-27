import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'

export default function RootNavigation() {
  return (
    <View>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </View>
  )
}