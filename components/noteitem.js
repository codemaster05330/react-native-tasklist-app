import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const win = Dimensions.get("window");

export default function NoteItem ({ item, data, setData }) {
    const deleteItem = () => {
        setData((prev) => prev.filter((data) => data.key != item.key));
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={deleteItem}>
                <View style={styles.flex}>
                    <Text>{item.title}</Text>
                    <Ionicons name="trash" size={20} color="#f56642"/>
                </View>
            </TouchableOpacity>
            <Text>{item.desc}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width: win.width - 20,
      padding: 10,
      margin: 10,
      borderRadius: 10,
      borderColor: "#f56642",
      borderWidth: 1,
      borderStyle: "dashed",
    },
    flex: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#f56642",
      paddingBottom: 5,
      marginBottom: 10,
    },
  });