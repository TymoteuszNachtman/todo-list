import { Ref, ref, watch } from 'vue';

const todoLists:Ref<any[]> = ref([]);

export function useTodoLists(){
  // Load todo lists when initializing
  const loadTodoLists = () => {
    const storedTodoLists = JSON.parse(localStorage.getItem('todoLists') || '[]');
    todoLists.value = storedTodoLists;
  };

  // Find out if the list already exists when creating new one
  const doesTodoListExist = (name: String) => {
    return todoLists.value.some((list) => list.name === name);
  };

  // Create new ToDo List
  const createTodoList = (name: String) => {
    if(!doesTodoListExist(name)){
      const newList = { name, items: [], color: '#cccccc' };
      todoLists.value.push(newList);
      return true;
    }else{
      console.warn(`Todo list with name: '${name}' already exists!`);
      return {error: `Todo list with name: '${name}' already exists!`};
    }
  }

  // Delete specified List
  const deleteTodoList = (name: String) => {
    if(!doesTodoListExist(name)){
      console.warn(`Todo List with name: '${name}' doesn't exist!`);
      return {error: `Todo List with name: '${name}' doesn't exist!`};
    }else{
      const updatedLists = todoLists.value.filter((list) => list.name !== name);
      todoLists.value = updatedLists;
      return true;
    }
  }

  // Change color of specified list name
  const changeTodoListColor = (name:String, color:any) => {
    if(!doesTodoListExist(name)){
      console.warn(`Todo List with name: '${name}' doesn't exist!`);
      return {error: `Todo List with name: '${name}' doesn't exist!`};
    }else{
      const updatedLists = todoLists.value.map((list) => {
        if(list.name === name){
          return {...list, color: color}
        }
        return list;
      });

      todoLists.value = updatedLists;
    }
  }

  // Watch for changes and save them
  watch(todoLists, () => {
    localStorage.setItem('todoLists', JSON.stringify(todoLists.value));
  }, {deep: true}); // deep property for deep reactivity (objects)

  return{
    todoLists,
    loadTodoLists,
    createTodoList,
    deleteTodoList,
    doesTodoListExist,
    changeTodoListColor
  }
}