import { AddTodoForm } from '@/components/forms/AddTodoForm';
import { slices } from '@/redux';
import { TodoActionTypes, TodoItem } from '@/redux/todos';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {  StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

const initialTodo = {
  description: '',
  title: '',
  dueDate: new Date().toISOString(),
  status: TodoActionTypes.PENDING,
  id: Date.now().toString()
}

export default function Modal() {
  const { top: paddingTop } = useSafeAreaInsets()
  const [todo, setTodo] = useState<TodoItem>(initialTodo)
  // any for now no time to type
  const route = useRoute()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const currentTodo = useSelector(slices.todos.selectors.selectCurrentTodo)

  useEffect(() => {
    const routeParams: any = route.params
    if (routeParams?.type === 'edit-note' && routeParams.id) {
      dispatch(slices.todos.actions.selectTodo(routeParams.id))
    }
  }, [route])

  useEffect(() => {
    if (currentTodo) {
      setTodo(currentTodo)
    }
  }, [currentTodo])

  const isAddingNote = useMemo(() => {
    // as any for now no time
    const routeParams: any = route.params
    return routeParams?.type === 'add-note'
  }, [route.params])

  const onSave = useCallback(() => {
    const newTodo = {
      ...todo,
      status: todo?.status || TodoActionTypes.PENDING,
      id: Date.now().toString()
    }

    if (isAddingNote) {
      dispatch(slices.todos.actions.addTodo(newTodo))
    } else {
      dispatch(slices.todos.actions.updateTodo({
        id: todo.id,
        todo: newTodo
      }))
    }

    navigation.goBack()
  }, [isAddingNote, dispatch, todo, route])

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.formContainer}>
        <AddTodoForm
          title={todo.title}
          description={todo.description}
          dueDate={todo.dueDate ?? new Date().toISOString()}
          onChangeText={(field, val) => setTodo({ ...todo, [field]: val })}
          onSave={onSave}
          testID={isAddingNote ? 'add-todo-form' : 'edit-todo-form'}
          status={todo.status}
          isAddingTodo={isAddingNote}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});

