import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { TodoActionTypes } from '@/redux/todos';

type OptionITem <TItem>= {
  label: string
  value: TItem
}

type PickerProps<T>= {
  status?: OptionITem<T>['value']
  options: Array<OptionITem<T>>
  onChange: (val: T) => void
}

export function StatusPicker<T>({
  onChange,
  status,
  options
}: PickerProps<T>) {
  return (
    <Picker
      selectedValue={status}
      mode='dialog'
      onValueChange={onChange}>
        {
         options.map(({ label, value }) => (
            <Picker.Item key={label} label={label} value={value} />
          ))
        }
    </Picker>
  )
}