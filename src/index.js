import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App() {
const [projects, setProjects] = useState([]);

useEffect(() => {
    api.get('projects').then( response => {
      setProjects(response.data);
    });}, []);

async function handleAddProject(){
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Danivaldo Ribeiro'
    });
    const project = response.data;
    setProjects([...projects, project]);
}

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={projects}
          keyExtrator={project => project.id}
          renderItem={({item: project}) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />
        <TouchableOpacity
         activeOpacity={0.6} 
         style={styles.button} 
         onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  title: {
    color: '#FFF',
    fontSize: 42,
  },
  project: {
    color: '#FFF',
    fontSize: 20,
  },
  button:{
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  buttonText:{
    fontWeight: 'bold',
    fontSize: 16,
  },
});