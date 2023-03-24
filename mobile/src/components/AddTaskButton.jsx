import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from '@expo/vector-icons';

const AddTaskButton = () => {
    const { navigate } = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigate('AddTask')} style={{ position: "absolute", bottom: 50, right: 40 }}>
            <Ionicons name="ios-add-circle-outline" size={50} color="green" />
        </TouchableOpacity>
    )
}

export default AddTaskButton

const styles = StyleSheet.create({})