import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View,Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';

export default function App() {
  const [todos,setTodos] = useState([
    {text:'react dev', key:'1'},
    {text:'react-native dev', key:'2'},
    {text:'js-backend', key:'3'},
   
  ])

  const pressHandler = (key)=>{
    setTodos((prevTodos)=>{
      return prevTodos.filter(todo => todo.key != key)
    })
  }

  const submitHandler = (text)=>{
    if(!text){
      Alert.alert('OOPS!','You must fill the field before you can add a todo',[{text:'Understood'}])
      
    }else if(text.length <=3){
      Alert.alert('OOPS!','Todos must be over 3 chars long',[{text:'Understood'}])
    }
    // if(text.length <= 3){
    //   Alert.alert('OOPS!','Todos must be over 3 chars long',[{text:'Understood'}])

    // }
    if(text.length > 3){

      setTodos((prevTodos)=>{
        return [
          {text:text,key:Math.random().toString()},
          ...prevTodos
        
        ]
      })

    }
  }
  return ( 
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss()
    }}>


    <View style={styles.container}>
      {/* header */}
      
        <Header/>
      <View style={styles.content}>
        {/* todo form */}
        <AddTodo submitHandler={submitHandler}/>
        <View style={styles.list}>
          <FlatList 
          data={todos}
          renderItem={({item})=> (
            <TodoItem item={item} pressHandler = {pressHandler} />
          )}
          />
        </View>
        </View>
    </View>
    </TouchableWithoutFeedback> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
  content:{
    padding:40,
    // flex:1
  },
  list:{
    // flex:1,
    marginTop:20 
   }
});
