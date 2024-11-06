import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { slices } from '@/redux';
import { useCallback, useMemo, useState } from 'react';
import { TodoActionTypes, TodoItem } from '@/redux/todos';
import { format } from 'date-fns'
import { StatusPicker } from '@/components/picker/StatusPicker';

export default function Index() {
  const [term, setTerm] = useState('')
  const [status, setStatus] = useState<TodoActionTypes | 'all'>('all')
  const todos = useSelector((state) => slices.todos.selectors.selectAllTodos(state, status))

  const [showFilterSelections, setShowSelections] = useState(false)

  const dispatch = useDispatch()

  const onRemove = useCallback((id: string) => {
    dispatch(slices.todos.actions.removeTodo(id))
  }, [])

  const onSelect = useCallback((id: string) => {
    router.push({
      'pathname': '/add-todo',
      params: {
        type: 'edit-note',
        id
      }
    })
  }, [router])

  const renderItem = useCallback(({ item }: { item: TodoItem & { isDue: boolean } }) => {
    return (
      <TouchableOpacity style={[styles.listItem, item.isDue && styles.dueStyle]} onPress={() => onSelect(item.id)}>
        <View style={styles.textContainer}>
          <Text style={styles.titleStyle}>{item.title}</Text>
          <Text style={styles.descriptionStyle}>{item.description}</Text>
          <Text style={styles.descriptionStyle}>{item.status}</Text>
          <Text style={styles.descriptionStyle}>{format(item?.dueDate ? new Date(item?.dueDate) : new Date(), 'PP')}</Text>
        </View>
        <View>
          <Text onPress={() => onRemove(item.id)}>Remove</Text>
        </View>
      </TouchableOpacity>
    )
  }, [])

  const addTodo = useCallback(() => {
    router.push({
      'pathname': '/add-todo',
      params: {
        type: 'add-note'
      }
    })
    dispatch(slices.todos.actions.clearSelectedTodo())
  }, [dispatch])

  const filteredByTerm = useMemo(() => {

    if (term) {
      return todos.filter(todo =>
        todo.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
      )
    }

    return todos
  }, [todos, term, status])

  return (
    <View
      style={styles.container}
    >
      <View style={styles.searchContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.todoLabel}>Find Todo</Text>
          <Text onPress={() => {
            setShowSelections(!showFilterSelections)

            if (showFilterSelections) {
              setStatus('all')
            }
          }}>{showFilterSelections ? 'Close Filter' : 'Open Filter'}</Text>

        </View>
        <TextInput
          placeholder='Search todos'
          onChangeText={(text) => setTerm(text)}
        />
        {showFilterSelections ? <View style={styles.sections}>
          <StatusPicker
            status={status}
            onChange={setStatus}
            options={[
              {
                label: 'All',
                value: 'all' as any
              },
              {
                label: 'Pending',
                value: TodoActionTypes.PENDING
              },
              {
                label: 'In Progress',
                value: TodoActionTypes.INPROGRESS
              },
              {
                label: 'Completed',
                value: TodoActionTypes.COMPLETED
              }
            ]}
          />
        </View> : undefined
        }
      </View>
      <FlatList
        data={filteredByTerm || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={[styles.listContainer]}
        testID="todo-list"
        ListFooterComponent={
          <Text
            style={styles.addTodo}
            onPress={addTodo}
          >
            Add Todo
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 16,
    display: 'flex',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: '100%',
    padding: 8,
  },
  sections: { width: '100%', height: 150, paddingBottom: 24 },
  addTodo: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    color: 'blue',
    paddingTop: 18,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueStyle: {
    backgroundColor: 'red'
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionStyle: {
    fontSize: 14,
    fontWeight: 'regular',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 4,
  },
  searchContainer: {
    paddingVertical: 20,
    width: '100%',
    paddingHorizontal: 8,
    rowGap: 8,
  },
  todoLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})