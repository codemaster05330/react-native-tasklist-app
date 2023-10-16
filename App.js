import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput, Button, FlatList, Alert, Dimensions, Modal } from 'react-native';
import React, { useEffect, useState } from "react";
import NoteItem from './components/noteitem';
import AsyncStorage from "@react-native-async-storage/async-storage";

const win = Dimensions.get("window");

export default function App() {
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState("false");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let data = await AsyncStorage.getItem("savedNotes");
      if (data !== null) {
        setData(JSON.parse(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = () => {
    if (title.length < 3 || desc.length < 3) {
      Alert.alert(
        "OOPS!",
        "Title and description must be at least 3 characters long.",
        [{ text: "Ok" }]
      );
    } else {
      setData((prev) => [
        {
          title,
          desc,
          key: Date.now().toString()
        },
        ...prev,
      ]);
      toggleModal();
      setTitle("");
      setDesc("");
    }
  }

  useEffect(() => {
    storeData();
  }, [data]);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("savedNotes", JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.titleText}>Short Notes</Text>
      </View>
      <FlatList style={styles.flatList}
        data={data}
        renderItem={({item}) => (
          <NoteItem item={item} setData={setData} data={data} />
        )}
      />
      {/* <Pressable style={styles.bottomBar} onPress={toggleModal}>
        <Text style={styles.plus}>+</Text>
      </Pressable> */}
      <View style={styles.newNoteItem}>
        <Text style={styles.titleText}>Create a Short Note</Text>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={(val) => setTitle(val)}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Description"
          multiline={true}
          value={desc}
          onChangeText={(val) => setDesc(val)}
          style={styles.inputField}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add Note" onPress={handleSubmit} color="#f56642" />
          <Button title="Cancel" onPress={toggleModal} color="#f56642" />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    position: "absolute",
    top: 0,
    backgroundColor: "#f56642",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    width: win.width,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomBar: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 100,
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f56642",
  },
  newNoteItem: {
    width: win.width,
    position: "absolute",
    bottom: 0,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fcaa86",
  },
  plus: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
  },
  inputField: {
    marginVertical: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  flatList: {
    top: 60,
  },
  modalView: {
    position: "absolute",
    top: 100,
  }
});
