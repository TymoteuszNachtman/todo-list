<script setup lang="ts">
import { ref, shallowRef, defineAsyncComponent } from 'vue';
import TodoList from './components/TodoList.vue';
import AddButton from './components/AddButton.vue';
import ThemeToggler from './components/ThemeToggler.vue';
import { useTodoLists } from './composables/useTodoLists.ts';
import { useTodoItems } from './composables/useTodoItems.ts';

const { todoLists, loadTodoLists, changeTodoListColor } = useTodoLists();
const { createTodoItem, deleteTodoItem, toggleTodoItem} = useTodoItems(todoLists);

const addListComponent:any = shallowRef(null);
const deleteListComponent:any = shallowRef(null);
const deleteListName:any = ref(null);

async function openListAddPopup(){
  addListComponent.value = defineAsyncComponent(() =>
    import('./components/AddList.vue')
  )
}

const addNewItem = (listName: String, name: String) => {
  if(!name){
    console.warn('No new Item name specified!');
    return false;
  }else{
    const listIndex = todoLists.value.findIndex((list: any) => list.name === listName);
    createTodoItem(listIndex, name);
    return true;
  }
}

const deleteItem = (listName: String, id: Number) => {
  const listIndex = todoLists.value.findIndex((list: any) => list.name === listName);
  deleteTodoItem(listIndex, id);
}

const toggleItemDone = (listName: String, id: Number) => {
  const listIndex = todoLists.value.findIndex((list: any) => list.name === listName);
  toggleTodoItem(listIndex, id);
}

const handleDeleteList = (listName: String) => {
  deleteListName.value = listName;
  deleteListComponent.value = defineAsyncComponent(() => import('./components/RemoveListModal.vue'));
}

const handleListColorChange = (listName: String, color: String) => {
  changeTodoListColor(listName, color);
}

loadTodoLists(); // Load Todo Lists on start
</script>

<template>
  <div class="page relative h-screen transition-colors duration-500 text-gray-800 dark:text-gray-50 bg-gray-50 dark:bg-gray-800">
    <ThemeToggler class="relative top-0 left-1/2 -translate-x-1/2 z-[999] text-center p-3" />
    <div class="text-center mb-6 font-medium text-lg">TODO's by Tymoteusz Nachtman</div>
    <div class="viewport h-[calc(100% - 2rem)] overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-slate-700
  dark:[&::-webkit-scrollbar-thumb]:bg-slate-500
  pl-3 pr-3">
      
      <div v-if="todoLists.length > 0">
        <div class="relative flex flex-col justify-center items-center py-6 w-full sm:w-[25rem]">
          <div v-for="(todoList, index) in todoLists" :key="index" class="w-full">
            <TodoList class="my-2" :mainColor="todoList.color" :title="todoList.name" :todos="todoList.items" @color-change="(color) => handleListColorChange(todoList.name, color)" @delete-list="handleDeleteList(todoList.name)" @add-item="(eventName) => addNewItem(todoList.name, eventName)" @toggle-done="(itemIndex) => toggleItemDone(todoList.name, itemIndex)" @delete-item="(itemIndex) => deleteItem(todoList.name, itemIndex)"/>
          </div>
        </div>
      </div>
      <div v-else class="absolute top-1/2 left-1/2 -translate-x-1/2 w-full text-center pl-3 pr-3">
        No Todo Lists. Click <span class="transition-all hover:bg-blue-300 cursor-pointer p-1 rounded-sm" @click="openListAddPopup">+ to create one</span>
      </div>
      
    </div>
    <AddButton class="absolute right-10 bottom-10" @clicked="openListAddPopup"></AddButton>
    <!-- Adding New TodoList -->
    <component 
      :is="addListComponent" 
      v-if="addListComponent"
      :title="'Add New List'" 
      class="bg-gray-100 absolute top-1/2 left-1/2 w-1/2"
    ></component>
    <component :is="deleteListComponent" v-if="deleteListComponent" :listName="deleteListName" :title="'Delete?'" :okTitle="'Yes, Delete'" class="bg-gray-100 absolute top-1/2 left-1/2 w-1/2"></component>
  </div>
</template>

<style lang="scss" scoped>
.viewport{
  max-height: calc(100% - 6.5rem);
  max-width: max-content;
  margin: 0 auto;
}
</style>
