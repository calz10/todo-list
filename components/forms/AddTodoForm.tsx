import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput } from '../text-input/TextInput'
import { Button } from '../button/Button'
import DateTimePicker from '@react-native-community/datetimepicker';

type ItemPayload = {
  title: string
  description: string
  dueDate: string
  isAddingTodo?: boolean
}

type AddTodoFormProps = ItemPayload & {
  onChangeText: (key: keyof ItemPayload, value: string | Date) => void
  onSave: () => void
}

export const AddTodoForm = React.memo(({
  title,
  description,
  dueDate,
  isAddingTodo,
  onChangeText,
  onSave
}: AddTodoFormProps) => {
  return (
    <View style={[styles.container]}>
      <TextInput
        placeholder='Add todo'
        label='Title'
        value={title}
        onChangeText={(val) => onChangeText('title', val)}
      />
      <TextInput
        placeholder='Add description'
        label='Description'
        multiline
        numberOfLines={4}
        style={styles.textArea}
        value={description}
        onChangeText={(val) => onChangeText('description', val)}
      />
      <DateTimePicker
        value={dueDate ? new Date(dueDate) : new Date()}
        mode='date'
        display='default'
        onChange={(evt) => {
          onChangeText('dueDate', new Date(evt.nativeEvent.timestamp).toISOString())
        }}
      />
      <Button
        title={`${isAddingTodo ? 'Add' : 'Update'} Todo`}
        onPress={onSave}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
    width: '100%',
    paddingHorizontal: 16,
  },
  textArea: {
    height: 150,
    backgroundColor: '#e3e3e4',
    borderRadius: 8,
    padding: 8,
  }
})