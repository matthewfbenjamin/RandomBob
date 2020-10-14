import React, { useState, useContext } from 'react'
import { StyleSheet } from 'react-native'

import { Layout, Button, Input } from '@ui-kitten/components'
import { AuthContext } from '../../App/AuthProvider'

const SignIn = ({ navigation }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { signIn } = useContext(AuthContext)
  return (
    <Layout style={styles.container}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(nextValue) => setEmail(nextValue)}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={(nextValue) => setPassword(nextValue)}
        secureTextEntry
      />
      <Button onPress={() => signIn(email, password)}>Sign In</Button>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
})

export default SignIn
