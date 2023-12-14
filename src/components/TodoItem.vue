<template>
  <div class="w-full grid grid-cols-[1fr_auto] items-center">
    <div class="max-w-sm grid grid-cols-[1fr_auto] items-center transition-colors duration-500 bg-neutral-100 dark:bg-gray-600 text-gray-600 dark:text-gray-50 hover:cursor-pointer rounded-lg mt-1 mb-1 p-2" :class="{'bg-neutral-300 dark:bg-gray-700': isDone}">
      <div class="w-full overflow-hidden" @click="emit('toggleDone')">
        <div class="text max-w-sm inline" :style="{textDecoration: isDone ? 'line-through' : 'none', whiteSpace: 'normal', overflowWrap: 'break-word'}">
          {{ title }}
        </div>
      </div>
      <div class="relative flex cursor-pointer items-center rounded-full">
        <input type="checkbox" value="TEST" :checked="isDone" @click="emit('toggleDone')" 
          class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
        >
        <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="w-8 h-8 rounded-lg flex item-center justify-center text-center cursor-pointer" @click="$emit('delete')">
      <TrashIcon class="transition-colors duration-500 w-full h-full text-[black] dark:text-[white] hover:text-gray-600 dark:hover:text-neutral-300" />
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import TrashIcon from '../assets/TrashIcon.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Todo Item'
  },
  done:{
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['delete', 'toggleDone']);

const isDone = ref(props.done);

watch(() => props.done, (newValue) => {
  isDone.value = newValue;
}, {immediate: true});
</script>

<style scoped lang="scss">

</style>