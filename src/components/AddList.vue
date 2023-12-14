<template>
  <div v-if="isVisible" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" @keydown.esc="() => { emit('cancel'); closeModal(); }" >
    
  <div class="OVERLAY fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-out duration-300 opacity-0" :class="{'opacity-100': show}"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

      <div class="MODAL_PANEL relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" :class="{'opacity-100 translate-y-0 sm:scale-100': show}">
        <div class="transition-colors duration-500 bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="transition-colors duration-500 text-base font-semibold leading-6 text-gray-900 dark:text-white" id="modal-title">{{ props.title }}</h3>
              <div class="mt-2">
                <p class="transition-colors duration-500 text-sm text-gray-500 dark:text-gray-200">{{ props.description }}</p>
                <div :style="{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}">
                  <slot></slot>
                  <label for="listName" class="transition-colors duration-500 text-gray-900 dark:text-gray-200" :style="{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}">List Name: </label>
                  <input type="text" name="listName" class="text-white p-2 rounded-md" 
                    @keydown.enter="() => { emit('accept'); handleAccept(); }" 
                    v-model="newListName">
                  <div class="error text-red-500" v-if="errorMessage">{{ errorMessage }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" @click="() => { emit('accept'); handleAccept(); }" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">{{ props.okTitle }}</button>
          <button type="button" @click="() => { emit('cancel'); closeModal(); }" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 dark:bg-black dark:text-gray-100 dark:hover:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">{{ props.cancelTitle }}</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps } from 'vue';
import { useTodoLists } from '../composables/useTodoLists.ts';

const { createTodoList } = useTodoLists();

const props = defineProps({
  title: {
    type: String,
    default: 'Warning'
  },
  description: {
    type: String,
    default: ''
  },
  okTitle:{
    type: String,
    default: 'Ok'
  },
  cancelTitle: {
    type: String,
    default: 'Cancel'
  }
});

const show = ref(false);
const isVisible = ref(true);
const errorMessage = ref('');
const newListName = ref('Todo List');

const emit = defineEmits(['accept', 'cancel']);

onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 50);
});

const handleAccept = () => {
  let createOut:any = createTodoList(newListName.value); 
  if(createOut.error){
    errorMessage.value = createOut.error;
  }else{
    errorMessage.value = '';
    closeModal();
  };
}

function closeModal(){
  show.value = false;
  setTimeout(() => {
    isVisible.value = false;
  }, 100);
}
</script>

<style lang="scss" scoped>

</style>