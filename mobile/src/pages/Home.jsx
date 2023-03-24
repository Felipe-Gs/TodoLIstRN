import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'


import Tasks from '../components/Tasks'

import api from '../axios/api'
import AddTaskButton from '../components/AddTaskButton'


const Home = () => {

    const [dados, setDados] = useState([])
    const tarefasCompletas = dados ? dados.filter(item => item.completo) : []
    const tarefasIncompletas = dados ? dados.filter(item => !item.completo) : []

    const handleDados = async () => {
        try {
            const response = await api.get('/TodasTarefas');
            setDados(response.data.dados)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCompleto = async (id) => {
        try {
            const itemIndex = dados.findIndex(item => item.id === id);
            const item = dados[itemIndex];
            const novoValorCompleto = !item.completo;

            const response = await api.post(`/atualizarCompleto/${id}`, { completo: novoValorCompleto });

            setDados(dadosAntigos => {
                const novosDados = [...dadosAntigos];
                novosDados[itemIndex] = { ...item, completo: novoValorCompleto };
                return novosDados;
            });

            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeletar = async (id) => {
        try {
            const response = await api.delete(`/deletar/${id}`)
            console.log(response.data.message)
            setDados(dadosAntigos => dadosAntigos.filter(item => item.id !== id));
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        handleDados()
    }, [dados])

    return (
        <View style={styles.container}>
            <Text style={{ marginTop: 50, fontSize: 25 }}>Tasks list</Text>
            <ScrollView style={{ width: "100%", padding: 10 }}>
                {
                    tarefasIncompletas && tarefasIncompletas.map((item, index) => {
                        return (
                            <Tasks
                                key={index}
                                onToggleSwitch={() => handleCompleto(item.id)}
                                titulo={item.titulo}
                                tarefa={item.tarefa}
                                completo={item.completo}
                                deletar={() => Alert.alert(
                                    'Confirmação',
                                    'Tem certeza que deseja excluir esta tarefa?',
                                    [
                                        { text: 'Cancelar', style: 'cancel' },
                                        { text: 'Excluir', onPress: () => handleDeletar(item.id) },
                                    ],
                                )}
                            />
                        )
                    })
                }
                <Text style={{ marginTop: 20, fontSize: 23 }}>Tarefas Completas</Text>
                {
                    tarefasCompletas && tarefasCompletas.map((item, index) => {
                        return (
                            <Tasks
                                key={index}
                                onToggleSwitch={() => handleCompleto(item.id)}
                                titulo={item.titulo}
                                tarefa={item.tarefa}
                                completo={item.completo}
                                deletar={() => Alert.alert(
                                    'Confirmação',
                                    'Tem certeza que deseja excluir esta tarefa?',
                                    [
                                        { text: 'Cancelar', style: 'cancel' },
                                        { text: 'Excluir', onPress: () => handleDeletar(item.id) },
                                    ],
                                )}
                            />
                        )
                    })
                }
            </ScrollView>
            <AddTaskButton />
        </View>
    )
}

export default Home



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',

    },
});