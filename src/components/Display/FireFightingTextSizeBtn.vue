<template>
  <div class="fire-fighting-text-size-btn">
    <q-btn
      flat
      size="md"
      color="transparent"
      text-color="dark"
      icon="text_decrease"
      @click="
        mainStore.displayTeamFontSize -= 0.2;
        mainStore.saveFont;
      "
    ></q-btn>
    <q-btn
      flat
      size="md"
      color="transparent"
      text-color="dark"
      icon="text_fields"
      @click="
        mainStore.displayTeamFontSize = 1.5;
        mainStore.saveFont;
      "
    ></q-btn>
    <q-btn
      flat
      size="md"
      color="transparent"
      text-color="dark"
      icon="text_increase"
      @click="
        mainStore.displayTeamFontSize += 0.2;
        mainStore.saveFont;
      "
    ></q-btn>
  </div>
</template>

<script setup lang="ts">
// vue 相關
// 元件 相關
// lib 相關
// store 相關
import { useMainStore } from '@/store/mainStore';
const mainStore = useMainStore();

// data 相關
</script>

<style lang="scss" scoped>
.fire-fighting-text-size-btn {
}
</style>
