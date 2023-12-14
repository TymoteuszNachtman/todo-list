<template>
  <div class="w-full relative p-1">
    <div class="flex my-2 justify-between">
      <!-- COLOR PICKER -->
      <div class="flex">
        <div class="relative top-0 w-[2rem] h-[2rem]">
          <!-- Display the selected color -->
          <div v-if="theColor" class="color-display absolute top-1/2 left-1/2 rounded-full w-full h-full -translate-y-1/2 -translate-x-1/2 bg-white"></div>
          <input ref="colorInput" v-model="theColor" type="color" class="color-input 
          w-[1.5rem] h-[1.5rem] rounded-full bg-white absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2
          appeareance-none border-none outline-none cursor-pointer" @change="emit('colorChange', theColor)" @input="emit('colorInput', theColor)"/>
        </div>
        <div class="ml-1 p-1 transition-all duration-300 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 cursor-pointer" @click="handleColorChange">Change Color</div>
      </div>
      <div class="deleteList py-1 px-2 bg-red-600 rounded-lg flex items-center justify-center text-center cursor-pointer transition-all duration-200 opacity-[.3] hover:opacity-[1] hover:bg-red-800" @click="emit('deleteList')">
        <TrashIcon class="transition-colors duration-500 scale-[1.2] mx-1 text-white" />
        <div class="text-white">
          Delete List
        </div>
      </div>
    </div>

    <div class="w-full relative p-3 rounded-md" :style="{backgroundColor: theColor}">
      <div class="text-center text-white text-md font-medium" :style="{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}">
        {{ props.title }}
      </div>
      <div class="items max-w-sm">
        <TodoItem v-for="(item, index) in todos" :key="index" :title="item.name" :done="item.done" @delete="emit('deleteItem', index)" @toggle-done="emit('toggleDone', index)"/>
      </div>
      <div class="addItem rounded-lg mt-1 bg-neutral-200 dark:bg-gray-600 p-2">
        <div>Add Item: </div>
        <div class="flex justify-between">
          <input type="text" name="addItem" class="p-1 rounded-md text-gray-900 bg-neutral-100 dark:text-gray-100 dark:bg-gray-500" @keydown.enter="addItem" v-model="newItemName">
          <div @click="addItem" class="button bg-white dark:bg-gray-500 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-gray-400 cursor-pointer">+ ADD</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import TodoItem from './TodoItem.vue'
import TrashIcon from '../assets/TrashIcon.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Todo'
  },
  mainColor:{
    type: String,
    default: '#ffffff'
  },
  todos: {
    type: [Array, Object],
    default: null,
    required: true
  }
})

const theColor: Ref<any> = ref('#ffffff');
const newItemName: Ref<string> = ref('');
const colorInput: Ref<any> = ref(null);

const emit = defineEmits(['addItem', 'deleteList', 'deleteItem', 'toggleDone', 'colorChange', 'colorInput']);

const addItem = () => {
  emit('addItem', newItemName.value);
  newItemName.value = '';
}

const handleColorChange = () => {
  if(colorInput.value){
    colorInput.value.click();
  }
}

watch(() => props.mainColor, (newValue) => {
  theColor.value = newValue;
}, { immediate: true});
</script>

<style lang="scss" scoped>
.color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-input::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
}
</style>