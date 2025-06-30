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
    // 是否顯示自訂案例
    isShowCustomCaseDialog: false,
    // 護理師名單
    nurseOptions: [],
    // 編組名單
    teamOptions: [],
    // 編組名稱顏色
    teamNameColor: '',
    // 編組大名單
    teamList: teamList || [],
    // 選擇 case 中的組別
    selectedTeam: {
      number: '',
      team: '',
      name: '',
      backup: '',
      case: [],
    },
    // case 名單
    caseList: caseList,
    // 已選擇的 case
    selectedCase: [],
    // 標記的 case
    markedCase: [],
    // 新增的 case
    customCase: '',
    // 目前自訂的 case
    customCaseList: [],
    // charting
    charting: '',
    // m8
    m8: '',
    // 是否前往顯示畫面
    isDisplay: false,
    // 顯示字體大小設定
    isShowFontSetting: false,
    // 顯示編組文字大小
    displayTeamFontSize: 1.5,
    // 顯示姓名大小
    displayNameFontSize: 1.5,
    // 顯示case大小
    displayCaseFontSize: 2.5,
    // 顯示待接大小
    displayBackupFontSize: 1.5,
  }),
  getters: {
    getFontString(state) {
      return `--team-font-size: ${state.displayTeamFontSize}rem;
      --name-font-size: ${state.displayNameFontSize}rem;
      --case-font-size: ${state.displayCaseFontSize}rem;
      --backup-font-size: ${state.displayBackupFontSize}rem;`;
    },
    getTeamFontString(state) {
      return ``;
    },
  },
  actions: {
    pageInit() {
      this.nurseOptions = Cookies.get('nurse_options') || [];
      this.teamOptions = Cookies.get('team_options') || [];
      this.teamNameColor = Cookies.get('team_name_color') || '#fff';
      this.charting = Cookies.get('charting') || '';
      this.m8 = Cookies.get('m8') || '';
      // 已選擇過的 case
      this.selectedCase = Cookies.get('selected_case', this.selectedCase) || [];
      // 標記的 case
      this.markedCase = Cookies.get('markedCase', this.markedCase) || [];
      // 自訂的 case
      this.customCaseList = Cookies.get('customCaseList') || [];
      // 預設的 case 名單
      this.caseList = Cookies.get('caseList') || caseList;
      // 如果有自訂的 case 名單，就合併到預設的 case 名單，並排除重複
      if (this.customCaseList.length > 0) {
        this.caseList = [
          ...new Set([...this.caseList, ...this.customCaseList]),
        ];
      }
      // 編組名單從儲存的拿，沒有的話就用預設的
      this.teamList = Cookies.get('teamList') || teamList;
      // 字體大小
      this.displayTeamFontSize =
        Number(Cookies.get('displayTeamFontSize')) || 1.5;
      this.displayNameFontSize =
        Number(Cookies.get('displayNameFontSize')) || 1.5;
      this.displayCaseFontSize =
        Number(Cookies.get('displayCaseFontSize')) || 2.5;
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
    openCustomCaseDialog() {
      this.isShowCustomCaseDialog = true;
    },
    addCustomCase() {
      if (!this.customCase) {
        Notify.create({
          message: '請輸入自訂案例',
          color: 'negative',
          position: 'top',
          timeout: 3000,
        });
        return;
      }
      if (this.customCaseList.includes(this.customCase) || this.caseList.includes(this.customCase)) {
        Notify.create({
          message: '已有相同案例',
          color: 'negative',
          position: 'top',
          timeout: 3000,
        });
        return;
      }
      this.customCaseList.push(this.customCase);
      this.caseList.push(this.customCase);
      this.customCase = '';
      Cookies.set('customCaseList', this.customCaseList);
      Cookies.set('caseList', this.caseList);
      Notify.create({
        message: '自訂案例已新增',
        color: 'positive',
        position: 'top',
        timeout: 3000,
      });
    },
    deleteCustomCaseOption(option) {
      this.customCaseList = this.customCaseList.filter(
        (item) => item !== option
      );
      this.selectedCase = this.selectedCase.filter((item) => item !== option);
      this.caseList = this.caseList.filter((item) => item !== option);
      // 更新 teamList 中的 case
      this.teamList.forEach((team) => {
        team.case = team.case.filter((item) => item !== option);
      });
      // 更新 Cookies
      Cookies.set('selected_case', this.selectedCase);
      Cookies.set('teamList', this.teamList);
      Cookies.set('markedCase', this.markedCase);
      Cookies.set('customCaseList', this.customCaseList);
      Cookies.set('caseList', this.caseList);
      Notify.create({
        message: '自訂案例已刪除',
        color: 'positive',
        position: 'top',
        timeout: 3000,
      });
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
      this.customCaseList = [];
      this.caseList = caseList;
      this.markedCase = [];
      Cookies.set('teamList', this.teamList);
      Cookies.set('selected_case', this.selectedCase);
      Cookies.set('customCaseList', this.customCaseList);
      Cookies.set('caseList', this.caseList);
      Cookies.set('markedCase', this.markedCase);
      Notify.create({
        message: '編組名單已重置',
        color: 'positive',
        position: 'top',
        timeout: 3000,
      });
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
    saveFont() {
      Cookies.set('displayTeamFontSize', this.displayTeamFontSize);
      Cookies.set('displayNameFontSize', this.displayNameFontSize);
      Cookies.set('displayCaseFontSize', this.displayCaseFontSize);
    },
    markCase(caseNum) {
      if (this.markedCase.includes(caseNum)) {
        this.markedCase = this.markedCase.filter((item) => item !== caseNum);
      } else {
        this.markedCase.push(caseNum);
      }
      Cookies.set('markedCase', this.markedCase);
    },
  },
});
