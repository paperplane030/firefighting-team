<template>
  <div class="display q-gutter-sm" :style="mainStore.getFontString">
    <template v-for="team in mainStore.teamList" :key="team.number">
      <div
        class="row row-data items-center q-pb-sm"
        v-if="team.name && team.team"
      >
        <div
          class="team col-3 text text-weight-bolder"
          :style="`background-color: ${team.team.color};color: ${mainStore.teamNameColor};`"
        >
          {{ team.team.name }}
        </div>
        <div class="name col-6 text text-weight-bolder">
          <span class="number">
            {{ team.number }}
          </span>
          {{ team.name }}
        </div>
        <div class="backup col-2 text text-weight-bolder">
          <template v-if="team.backup">
            待接
            {{ team.backup }}
          </template>
        </div>
      </div>
    </template>
    <div
      class="row row-data items-center q-pb-sm under"
      v-if="mainStore.charting !== ''"
    >
      <div class="team col-3 text"></div>
      <div class="name col-6 text text-weight-bolder">
        <span class="number"> 85 </span> : {{ mainStore.charting }}
      </div>
      <div class="col-3 text"></div>
    </div>
    <div
      class="row row-data items-center q-pb-sm under"
      v-if="mainStore.m8 !== ''"
    >
      <div class="team col-3 text"></div>
      <div class="name col-6 text text-weight-bolder">
        <span class="number"> M8 </span> : {{ mainStore.m8 }}
      </div>
      <div class="col-3 text"></div>
    </div>
    <div class="btn-block row">
      <q-icon
        name="west"
        class="back-btn cursor-pointer"
        color="positive"
        @click="mainStore.isDisplay = false"
      />
      <q-icon
        name="text_decrease"
        class="back-btn cursor-pointer"
        @click="mainStore.displayFontSize -= 0.2"
      />
      <q-icon
        name="text_fields"
        class="back-btn cursor-pointer"
        @click="mainStore.displayFontSize = 1.5"
      />
      <q-icon
        name="text_increase"
        class="back-btn cursor-pointer"
        @click="mainStore.displayFontSize += 0.2"
      />
    </div>
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
  --font-size: 1.5rem;
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  .row-data {
    border-bottom: 1px dashed #666;
    .text {
      font-size: var(--font-size);
    }
    &.under {
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
  .btn-block {
    gap: 20px;
    position: fixed;
    bottom: 12px;
    left: 10px;
    font-size: 72px;
  }
}
</style>
