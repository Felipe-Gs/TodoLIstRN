import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import api from '../axios/api';

const AddTask = () => {
    const { navigate } = useNavigation();

    const [titulo, setTitulo] = useState('')
    const [tarefa, setTarefa] = useState('')

    const [resposta, setResposta] = useState('')

    const handleAddTarefa = async () => {
        if (titulo === '' || tarefa === '') {
            return alert('Impossivel enviar com campos vazios')
        }
        try {
            const response = await api.post('/addTarefa', {
                titulo: titulo,
                tarefa: tarefa
            })
            alert('Task enviada com sucesso')
            navigate('Home')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ marginTop: 50, fontSize: 25 }}>AddTask</Text>
            <View style={{ width: '90%', marginTop: 40 }}>
                <TextInput
                    style={{ backgroundColor: 'white' }}
                    mode='flat'
                    placeholder='Titulo'
                    value={titulo}
                    onChangeText={(e) => setTitulo(e)}
                >
                </TextInput>

                <TextInput
                    style={{ backgroundColor: "white", marginTop: 20 }}
                    mode='flat'
                    placeholder='Tarefa'
                    value={tarefa}
                    onChangeText={(e) => setTarefa(e)}
                >
                </TextInput>

                <Button
                    style={{ marginTop: 20 }}
                    onPress={() => Alert.alert(
                        'Confirmação',
                        'Tem certeza que deseja cadastrar esta tarefa?',
                        [
                            { text: 'Cancelar', style: 'cancel' },
                            { text: 'Enviar', onPress: () => handleAddTarefa() },
                        ],
                    )}
                >
                    Enviar Task
                </Button>
            </View>
        </View>
    )
}

export default AddTask

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }
})