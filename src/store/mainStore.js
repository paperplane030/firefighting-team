import { defineStore } from 'pinia';
import { Cookies, Notify } from 'quasar';
// data
import defaultNurseOptions from '@/data/nurseDefault';
import defaultTeamOptions from '@/data/teamDefault';
import teamList from '@/data/teamList';

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    isShowTeamDialog: false,
    isShowNurseDialog: false,
    nurseOptions: [],
    teamOptions: [],
    teamNameColor: '',
    // 編組名單
    teamList: teamList,
    charting: '',
    m8: '',
    // 是否前往顯示畫面
    isDisplay: false,
  }),
  getters: {},
  actions: {
    pageInit() {
      this.nurseOptions = Cookies.get('nurse_options') || [];
      this.teamOptions = Cookies.get('team_options') || [];
      this.teamNameColor = Cookies.get('team_name_color') || '#fff';
      // 編組名單從儲存的拿，沒有的話就用預設的
    },
    addDefaultNurseOptions() {
      this.nurseOptions = [];
      this.nurseOptions = defaultNurseOptions;
      Cookies.set('nurse_options', this.nurseOptions);
    },
    addNurseOption(option) {
      if (!option) {
        Notify.create({
          message: '請輸入護理師姓名',
          color: 'negative',
          position: 'top',
          timeout: 3000,
        });
        return;
      }
      if (this.nurseOptions.includes(option)) {
        Notify.create({
          message: '已有相同護理師姓名',
          color: 'negative',
          position: 'top',
          timeout: 3000,
        });
        return;
      }
      this.nurseOptions.push(option);
      Cookies.set('nurse_options', this.nurseOptions);
    },
    deleteNurseOption(option) {
      this.nurseOptions = this.nurseOptions.filter((item) => item !== option);
      Cookies.set('nurse_options', this.nurseOptions);
      if (this.nurseOptions.length === 0) {
        this.nurse = '';
      }
    },
    addDefaultTeamOptions() {
      this.teamOptions = [];
      this.teamOptions = defaultTeamOptions;
      Cookies.set('team_options', this.teamOptions);
    },
    addTeamOption(option) {
      this.teamOptions.push(option);
      Cookies.set('team_options', this.teamOptions);
    },
    deleteTeamOption(option) {
      this.teamOptions = this.teamOptions.filter(
        (item) => item.name !== option.name && item.color !== option.color
      );
      Cookies.set('team_options', this.teamOptions);
    },
    setTeamNameColor() {
      Cookies.set('team_name_color', this.teamNameColor);
    },
  },
});
