import { defineStore } from 'pinia';
import { Cookies, Notify } from 'quasar';
// data
import defaultNurseOptions from '@/data/nurseDefault';
import defaultTeamOptions from '@/data/teamDefault';
import teamList from '@/data/teamList';
import caseList from '@/data/caseList';

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    // 是否顯示編組設定
    isShowTeamDialog: false,
    // 是否顯示護理師設定
    isShowNurseDialog: false,
    // 是否顯示案例
    isShowCaseDialog: false,
    // 護理師名單
    nurseOptions: [],
    // 編組名單
    teamOptions: [],
    // 編組名稱顏色
    teamNameColor: '',
    // 編組大名單
    teamList: teamList || [],
    // 選擇 case 中的組別
    selectedTeam: '',
    // case 名單
    caseList: caseList,
    // 已選擇的 case
    selectedCase: [],
    // charting
    charting: '',
    // m8
    m8: '',
    // 是否前往顯示畫面
    isDisplay: false,
    // 顯示畫面文字大小
    displayFontSize: 1.5,
  }),
  getters: {
    getFontString(state) {
      return `--font-size: ${state.displayFontSize}rem`;
    },
  },
  actions: {
    pageInit() {
      this.nurseOptions = Cookies.get('nurse_options') || [];
      this.teamOptions = Cookies.get('team_options') || [];
      this.teamNameColor = Cookies.get('team_name_color') || '#fff';
      this.charting = Cookies.get('charting') || '';
      this.m8 = Cookies.get('m8') || '';
      this.selectedCase = Cookies.get('selected_case', this.selectedCase) || [];
      // 編組名單從儲存的拿，沒有的話就用預設的
      this.teamList = Cookies.get('teamList') || teamList;
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
    deleteTeamList(number) {
      const team = this.teamList.find((item) => item.number === number);
      team.name = '';
      team.backup = '';
      team.team = '';
      this.selectedCase = this.selectedCase.filter(
        (item) => !team.case.includes(item)
      );
      team.case = [];
    },
    delete85() {
      this.charting = '';
    },
    deleteM8() {
      this.m8 = '';
    },
    openCaseDialog(teamNumber) {
      this.selectedTeam = this.teamList.find(
        (item) => item.number === teamNumber
      );
      this.isShowCaseDialog = true;
    },
    selectCase(caseNumber) {
      if (!this.selectedCase.includes(caseNumber)) {
        console.log('沒有這個號碼');
        this.selectedCase.push(caseNumber);
        this.selectedTeam.case.push(caseNumber);
      } else if (!this.selectedTeam.case.includes(caseNumber)) {
        console.log('已有這個號碼而且不在自己組別裡面');
        const ownCaseNumberTeam = this.teamList.find((item) =>
          item.case.includes(caseNumber)
        );
        ownCaseNumberTeam.case = ownCaseNumberTeam.case.filter(
          (item) => item !== caseNumber
        );
        this.selectedTeam.case.push(caseNumber);
      } else {
        console.log('已有這個號碼而且在自己組別裡面');
        this.selectedCase = this.selectedCase.filter(
          (item) => item !== caseNumber
        );
        this.selectedTeam.case = this.selectedTeam.case.filter(
          (item) => item !== caseNumber
        );
      }
      // 排序
      this.selectedTeam.case.sort((a, b) => a - b);
    },
    resetTeamList() {
      this.teamList = teamList;
      this.selectedCase = [];
      Cookies.set('teamList', this.teamList);
      Cookies.set('selected_case', this.selectedCase);
    },
    checkCaseBelongToTeam(caseNumber) {
      return this.teamList.find((item) => item.case.includes(caseNumber));
    },
    submit() {
      this.isDisplay = true;
      Cookies.set('teamList', this.teamList);
      Cookies.set('selected_case', this.selectedCase);
      Cookies.set('charting', this.charting);
      Cookies.set('m8', this.m8);
    },
  },
});
