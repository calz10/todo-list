import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

type ButtonProps = {
  onPress: () => void
  title: string
  disabled?: boolean
}
export const Button = ({
  onPress,
  title,
  disabled
}: ButtonProps) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.container]}>
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#277dce',
    width: '100%',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})