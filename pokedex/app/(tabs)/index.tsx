import { Image, StyleSheet, Platform, Text, Button, View, Modal, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


import { useState } from 'react';

export default function HomeScreen() {


  const [title, setTitle] = useState("")
  const [task, setTask] = useState("")
  const [date, setDate] = useState<Date>(new Date())


  const [showDatePicker, setShowDatePicker] = useState(false)




  const [modalVisible, setModalVisible] = useState(false)

  const addTask = () => {

    setModalVisible(true)
  }

  const onChange = (selectedDate: any) => {

console.log(selectedDate)
    setDate(new Date(selectedDate));
    console.log(date)
  };

  return (
    <View>
      <Button onPress={addTask} title='add task'></Button>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ margin: 5 }}>
          <Text onPress={() => { setModalVisible(false), setShowDatePicker(false) }} >
            close
          </Text>
          <Text>
            Add Task
          </Text>

          <TextInput
            style={{
              padding: 16,
              marginTop: 50,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 10
            }}
            onChangeText={(e) => setTitle(e)}
            value={title}
            placeholder={'title'}
          />

          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={4}
            onChangeText={(e) => { setTask(e) }}
            value={task}
            placeholder="Enter a description"
            placeholderTextColor="#999"
          />

          {date && <Text style={{ margin: 5 }}>to do for: {date.toLocaleDateString()}</Text>}

          <View style={{ marginTop: 10, borderRadius: 5 }}>
            <Button onPress={() => { setShowDatePicker(!showDatePicker) }} title='select date'>
            </Button>
          </View>



          {showDatePicker &&
            <DateTimePicker
              testID="date"
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          }
        </View>
      </Modal>

    </View>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  textArea: {
    marginTop: 10,

    height: 150,
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // Ensure text starts from the top in Android
    width: '100%',
  },
});

