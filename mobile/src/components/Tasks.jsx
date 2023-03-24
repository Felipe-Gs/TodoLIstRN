import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar, Card, Switch } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';



const Tasks = ({ titulo, tarefa, completo, onToggleSwitch, deletar }) => {

    return (
        <Card style={{ width: '100%', marginBottom: 20 }}>
            <Card.Title
                title={titulo}
                subtitle={tarefa}
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                Card
            />
            <Card.Content style={{ width: "100%", alignItems: "flex-end", justifyContent: "space-around", flexDirection: "row", alignItems: "center" }}>
                <Switch value={completo} onValueChange={onToggleSwitch} />
                <TouchableOpacity onPress={deletar}>
                    <MaterialIcons name="minimize" size={30} color="black" />
                </TouchableOpacity>
            </Card.Content>

        </Card>
    )
}

export default Tasks

const styles = StyleSheet.create({})