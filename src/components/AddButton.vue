<template>
  <div class="group">
    <div role="button" @click="emit('clicked')" class="group relative max-w-content w-10 h-10 justify-center items-center text-center bg-blue-600 group-hover:bg-blue-700 text-white text-sm px-4 py-2 border-none rounded-full transition-all ease-out duration-500 group-hover:w-36">
      <div class="plus absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 group-hover:-translate-x-full group-hover:left-[1.5rem]">+</div>
      <div class="block absolute right-[-1rem] top-[50%] -translate-y-[50%] pl-1 opacity-0 transition-all duration-200 group-hover:delay-200 group-hover:opacity-100 group-hover:right-5">Add List</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['clicked']);
</script>

<style lang="scss" scoped>

</style>