import { Image, StyleSheet, Platform, Text, Button, View, Modal, TextInput, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


import { useEffect, useState } from 'react';
import { useAsyncStorage } from '@/hooks/useAsyncStorage';

export default function HomeScreen() {


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<any>(new Date())

  const [showDatePicker, setShowDatePicker] = useState(false)


  const [modalVisible, setModalVisible] = useState(false)
  const { addItem, storedValue } = useAsyncStorage({})


  const [data, setData] = useState([])

  useEffect(() => {
    console.log(storedValue[0])
  }, [])

  const addTask = () => {

    setModalVisible(true)
  }
  const onChange = (event: any) => {
    if (event.type === 'set') {
      const currentDate = new Date(event.nativeEvent.timestamp);
      setDate(currentDate);

    }
  }

  useEffect(() => {
  }, [])

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
          <Button title='close' onPress={() => { setModalVisible(false), setShowDatePicker(false) }} >
          </Button>
          <Text style={{ marginTop: 10, fontSize: 40 }}>
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
            onChangeText={(e) => { setDescription(e) }}
            value={description}
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
          <View style={{ marginTop: 50 }}>
            <Button onPress={() => { addItem({ title, description, date }) }} title='add task'>
            </Button>
          </View>
        </View>
      </Modal>


      <ScrollView>

        {storedValue.map((el: any, key: number) => {
          return <View style={{
            backgroundColor: "white", padding: 10, margin: 20, marginVertical: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 3,
          }} key={key}>
            <Text  >{JSON.parse(el[1]).title} </Text>
            <Text  >{JSON.parse(el[1]).description} </Text>
            <Text  >{JSON.parse(el[1]).date} </Text>
          </View>
        })}


      </ScrollView>


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

