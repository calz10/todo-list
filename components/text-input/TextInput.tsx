import React from 'react'
import { TextInput as NativeTextInput, TextInputProps as TextInputPropsNative, Text, View, StyleSheet } from 'react-native'

type TextInputProps = TextInputPropsNative & {
  error?: string
  label?: string
}

export const TextInput = React.forwardRef<NativeTextInput, TextInputProps>(({
  error,
  label,
  style,
  ...restProps
}, ref) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <NativeTextInput ref={ref}
        {...restProps}
        style={[
          style,
          styles.inputContainer
        ]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  inputContainer: {
    width: '100%',
  },
  errorText: {
    color: 'red',
  }
})