<template>
  <div class="input-form q-pa-md">
    <div class="text-h4 q-mb-md">輸入頁面</div>
    <div class="setting-btn text-left q-gutter-md q-mb-md">
      <q-btn
        class="text-body2"
        color="primary"
        text-color="white"
        label="編組設定"
        @click="mainStore.isShowTeamDialog = true"
      ></q-btn>
      <q-btn
        class="text-body2"
        color="accent"
        text-color="white"
        label="護理師設定"
        @click="mainStore.isShowNurseDialog = true"
      ></q-btn>
    </div>
    <q-separator> </q-separator>
  </div>
  <q-dialog ref="teamDialog" v-model="mainStore.isShowTeamDialog">
    <q-card class="q-dialog-plugin" style="width: 800px; max-width: 80vw">
      <q-card-section class="q-pa-sm">
        <div class="text-h6 text-center">編組設定</div>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <div class="row">
          <q-input
            outlined
            dense
            type="text"
            v-model="mainStore.teamNameColor"
            label="編組文字顏色"
            lazy-rules
            hide-bottom-space
          >
            <template v-slot:prepend v-if="mainStore.teamNameColor">
              <div
                class="color"
                :style="`background-color:${mainStore.teamNameColor};width:20px;height:20px;border-radius:10%;border:1px solid #000;`"
              ></div>
            </template>
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color
                    v-model="mainStore.teamNameColor"
                    @update:model-value="mainStore.setTeamNameColor"
                    default-view="palette"
                  ></q-color>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <q-separator></q-separator>
        <div class="row items-center no-wrap">
          <q-input
            outlined
            dense
            type="text"
            v-model="teamInputName"
            label="編組名稱"
            lazy-rules
            hide-bottom-space
            class="q-mr-md"
          >
          </q-input>
          <q-input
            outlined
            dense
            type="text"
            v-model="teamInputColor"
            label="編組底色"
            lazy-rules
            hide-bottom-space
          >
            <template v-slot:prepend v-if="teamInputColor">
              <div
                class="color"
                :style="`background-color:${teamInputColor};width:20px;height:20px;border-radius:10%;border:1px solid #000;`"
              ></div>
            </template>
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color
                    v-model="teamInputColor"
                    default-view="palette"
                  ></q-color>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="preview">
            <q-chip
              v-if="teamInputName"
              :style="`background-color:${teamInputColor};color:${mainStore.teamNameColor}; `"
              class="q-mr-md"
              text-color="white"
              square
            >
              {{ teamInputName }}
            </q-chip>
          </div>
          <q-btn
            color="primary"
            label="新增編組"
            class="q-ml-auto"
            @click="addDefaultTeamOptions()"
            v-if="teamInputName && teamInputColor"
          ></q-btn>
        </div>
      </q-card-section>
      <q-card-section class="row" v-if="mainStore.teamOptions.length > 0">
        <div class="col">
          <q-list bordered separator>
            <q-item v-for="team in mainStore.teamOptions" v-ripple="false">
              <q-item-section
                class="items-center text-center text-body1 text-white"
              >
                <div
                  :style="`background-color:${team.color};color:${mainStore.teamNameColor};width:10em;border-radius:5px;`"
                >
                  {{ team.name }}
                </div>
              </q-item-section>
              <q-item-section avatar side>
                <q-icon
                  color="negative"
                  name="delete"
                  class="cursor-pointer"
                  @click="mainStore.deleteTeamOption(team)"
                ></q-icon>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          class="text-body2 q-mr-auto"
          color="secondary"
          label="載入預設編組"
          @click="mainStore.addDefaultTeamOptions"
        />
        <q-btn class="text-body2" color="grey" label="關閉" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog ref="nurseDialog" v-model="mainStore.isShowNurseDialog">
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-pa-sm">
        <div class="text-h6 text-center">護理師設定</div>
      </q-card-section>
      <q-card-section>
        <q-input
          outlined
          dense
          type="text"
          v-model="nurseInput"
          lazy-rules
          hide-bottom-space
        >
          <template v-slot:append>
            <q-icon
              name="add"
              class="cursor-pointer"
              @click="
                mainStore.addNurseOption(nurseInput);
                nurseInput = '';
              "
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="row" v-if="mainStore.nurseOptions.length > 0">
        <div class="col">
          <q-list bordered separator>
            <q-item v-for="nurse in mainStore.nurseOptions" v-ripple="false">
              <q-item-section class="text-center text-body1">{{
                nurse
              }}</q-item-section>
              <q-item-section avatar side>
                <q-icon
                  color="negative"
                  name="delete"
                  class="cursor-pointer"
                  @click="mainStore.deleteNurseOption(nurse)"
                ></q-icon>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          class="text-body2 q-mr-auto"
          color="secondary"
          label="載入預設護理師名單"
          @click="mainStore.addDefaultNurseOptions"
        />
        <q-btn class="text-body2" color="grey" label="關閉" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// vue 相關
import { ref } from 'vue';
// 元件 相關
// lib 相關
// store 相關
import { useMainStore } from '@/store/mainStore';
// data 相關
const mainStore = useMainStore();

const nurseInput = ref('');
const teamInputName = ref('');
const teamInputNameColor = ref('');
const teamInputColor = ref('');

const addDefaultTeamOptions = () => {
  mainStore.addTeamOption({
    name: teamInputName.value,
    color: teamInputColor.value,
  });
  teamInputName.value = '';
  teamInputColor.value = '';
};
</script>

<style lang="scss" scoped>
.input-form {
}
</style>
