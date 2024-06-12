<template>
  <div>
    <div class="inner">
      <InputForm></InputForm>
    </div>
  </div>
</template>

<script setup>
import InputForm from './components/InputForm.vue';
// store 相關
import { useMainStore } from '@/store/mainStore';

const mainStore = useMainStore();
mainStore.pageInit();
</script>

<style lang="scss" scoped>
.inner {
  width: 1200px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
