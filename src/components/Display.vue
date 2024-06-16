<template>
  <div class="display q-gutter-sm">
    <div
      class="row items-center q-pb-sm"
      v-for="team in mainStore.teamList"
      :key="team.number"
    >
      <div
        class="team col-3 text-h5"
        :style="`background-color: ${team.team.color};color: ${mainStore.teamNameColor};`"
      >
        {{ team.team.name }}
      </div>
      <div class="name col-6 text-h5">
        <span class="number">
          {{ team.number }}
        </span>
        {{ team.name }}
      </div>
      <div class="backup col-3 text-h5">
        <template v-if="team.backup">
          待接
          {{ team.backup }}
        </template>
      </div>
    </div>
    <div class="row items-center q-pb-sm">
      <div class="team col-3 text-h5"></div>
      <div class="name col-6 text-h5">
        <span class="number"> Charting : </span> {{ mainStore.charting }}
      </div>
      <div class="col-3 text-h5"></div>
    </div>
    <div class="row items-center q-pb-sm">
      <div class="team col-3 text-h5"></div>
      <div class="name col-6 text-h5">
        <span class="number"> M8 : </span> {{ mainStore.m8 }}
      </div>
      <div class="col-3 text-h5"></div>
    </div>
    <q-icon
      name="west"
      class="back-btn cursor-pointer"
      color="positive"
      @click="mainStore.isDisplay = false"
    />
  </div>
</template>

<script setup lang="ts">
// vue 相關
// 元件 相關
// lib 相關
// store 相關
import { useMainStore } from '@/store/mainStore';
// data 相關
const mainStore = useMainStore();
</script>

<style lang="scss" scoped>
.display {
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  .row {
    border-bottom: 1px dashed #666;
    &:last-of-type {
      border-bottom: none;
    }
    .team {
      padding: 8px;
      border-radius: 5px;
    }
    .number {
      display: inline-block;
      min-width: 5em;
    }
  }
  .back-btn {
    position: fixed;
    bottom: 12px;
    left: 10px;
    font-size: 48px;
  }
}
</style>
