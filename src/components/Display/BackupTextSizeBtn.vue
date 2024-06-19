<template>
  <div class="backup-text-size-btn q-gutter-md">
    <q-icon
      flat
      size="md"
      color="dark"
      name="text_decrease"
      class="cursor-pointer"
      @click="
        mainStore.displayBackupFontSize -= 0.2;
        mainStore.saveFont();
      "
    ></q-icon>
    <q-icon
      flat
      size="md"
      color="dark"
      name="text_fields"
      class="cursor-pointer"
      @click="
        mainStore.displayBackupFontSize = 1.5;
        mainStore.saveFont();
      "
    ></q-icon>
    <q-icon
      flat
      size="md"
      color="dark"
      name="text_increase"
      class="cursor-pointer"
      @click="
        mainStore.displayBackupFontSize += 0.2;
        mainStore.saveFont();
      "
    ></q-icon>
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
.backup-text-size-btn {
}
</style>
