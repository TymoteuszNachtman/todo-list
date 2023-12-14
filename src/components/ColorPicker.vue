<template>
  <div>
    <input type="color" name="colorPicker" v-model="mainColor" @change="handleChange" @input="handleChange">
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

const mainColor: Ref<string | null> = ref('#ffffff');

const initMainColor = () => {
  if (localStorage.getItem('mainColor')) {
    const storedColor = localStorage.getItem('mainColor');
    mainColor.value = storedColor ? JSON.parse(storedColor) : null;
    emit('colorChange', mainColor.value);
  }
}

const emit = defineEmits(['colorChange']);

const handleChange = () => {
  localStorage.setItem('mainColor', JSON.stringify(mainColor.value));
  emit('colorChange', mainColor.value);
}

initMainColor();
</script>

<style lang="scss" scoped>

</style>