import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import Task from "./components/Task";
import { useState } from "react";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
    // console.log(task);
  };
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", paddingBottom: 10 }}>
          Today's Tasks
        </Text>
        <StatusBar style="auto" />
        {/* Tasks */}
        {taskItems.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Button */}

      <KeyboardAvoidingView
        style={styles.ButtonTaskContainer}
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 10 : 0}
      >
        <TextInput
          style={styles.ButtonTextInput}
          placeholder="Write a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity
          style={styles.ButtonTaskContainerBG2}
          onPress={() => handleAddTask()}
        >
          <Text
            style={{
              textAlign: "center",
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCDCDC",
    paddingTop: 50,
    padding: 20,
  },
  ButtonTaskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    paddingLeft: 15,
  },
  ButtonTextInput: {
    backgroundColor: "#fff",
    padding: 10,
    width: 280,
    borderRadius: 30,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: "gray",
  },
  ButtonTaskContainerBG2: {
    backgroundColor: "#fff",
    borderRadius: 60,
    width: 65,
    height: 65,
    justifyContent: "center",
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: "gray",
  },
});
