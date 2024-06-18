<template>
  <div class="display q-gutter-sm" :style="mainStore.getFontString">
    <template v-for="team in mainStore.teamList" :key="team.number">
      <div
        class="row row-data items-center q-pb-sm"
        v-if="team.name && team.team"
      >
        <template v-if="mainStore.isShowFontSetting">
          <div class="col-3 relative-position q-mb-lg">
            <FireFightingTextSizeBtn></FireFightingTextSizeBtn>
          </div>
          <div class="col-4 relative-position q-mb-lg">
            <NameTextSizeBtn></NameTextSizeBtn>
          </div>
          <div class="col-3 relative-position q-mb-lg">
            <CaseTextSizeBtn></CaseTextSizeBtn>
          </div>
          <div class="col-2 relative-position q-mb-lg">
            <BackupTextSizeBtn></BackupTextSizeBtn>
          </div>
        </template>
        <div
          class="team col-3 text-weight-bolder"
          :style="`background-color: ${team.team.color};color: ${mainStore.teamNameColor};`"
        >
          {{ team.team.name }}
        </div>
        <div class="name col-4 text text-weight-bolder">
          <span class="number">
            {{ team.number }}
          </span>
          {{ team.name }}
        </div>
        <div
          class="case col-3 text text-weight-bolder text-orange-10 row items-center justify-center"
        >
          <template v-if="team.case.length > 0">
            <q-avatar
              color="teal"
              text-color="white"
              size="xl"
              v-for="item in team.case"
              :key="item"
              >{{ item }}</q-avatar
            >
          </template>
        </div>
        <div class="backup col-2 text text-weight-bolder text-orange-10">
          <template v-if="team.backup">
            待接
            {{ team.backup }}
          </template>
        </div>
      </div>
    </template>
    <div class="row row-data justify-center items-center q-pb-sm under">
      <div
        class="name text text-weight-bolder"
        v-if="mainStore.charting !== ''"
      >
        <span class="number"> 85 : </span>{{ mainStore.charting }}
      </div>
      <div class="name text text-weight-bolder" v-if="mainStore.m8 !== ''">
        <span class="number"> M8 : </span>{{ mainStore.m8 }}
      </div>
    </div>
    <div class="btn-block row">
      <q-icon
        name="west"
        class="back-btn cursor-pointer"
        color="positive"
        @click="mainStore.isDisplay = false"
      />
      <q-icon
        name="text_fields"
        class="back-btn cursor-pointer"
        color="light-blue-10"
        @click="mainStore.isShowFontSetting = !mainStore.isShowFontSetting"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// vue 相關
// 元件 相關
import FireFightingTextSizeBtn from './Display/FireFightingTextSizeBtn.vue';
import NameTextSizeBtn from './Display/NameTextSizeBtn.vue';
import CaseTextSizeBtn from './Display/CaseTextSizeBtn.vue';
import BackupTextSizeBtn from './Display/BackupTextSizeBtn.vue';
// lib 相關
// store 相關
import { useMainStore } from '@/store/mainStore';
// data 相關
const mainStore = useMainStore();
</script>

<style lang="scss" scoped>
.display {
  --team-font-size: 1.5rem;
  --name-font-size: 1.5rem;
  --case-font-size: 1.5rem;
  --backup-font-size: 1.5rem;
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  .row-data {
    border-bottom: 1px dashed #666;
    .text {
      font-size: 1.5rem;
    }
    &.under {
      border-bottom: none;
    }
    .team {
      padding: 8px;
      border-radius: 5px;
      font-size: var(--team-font-size);
    }
    .name {
      font-size: var(--name-font-size);
    }
    .case {
      gap: 12px;
      .q-avatar {
        font-size: var(--case-font-size) !important;
      }
    }
    .backup {
      font-size: var(--backup-font-size);
    }
    .number {
      position: relative;
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
