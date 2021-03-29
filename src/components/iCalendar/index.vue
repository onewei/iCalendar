<template>
  <div>
    <div class="container">
      <div class="input-label">
        <span class="calenderIcon" @click="seleCalIcon" @mousedown="preventBlur($event)"></span>
        <input
          class="date-input"
          :class="{ active: containerVisible }"
          type="text"
          placeholder="选择日期"
          v-model="selectedDate"
          autocomplete="false"
          ref="input"
          @focus="toggleDateContainer(true)"
          @blur="toggleDateContainer(false)"
        />
      </div>
      <div
        class="date-container"
        :class="{ 'container-visible': containerVisible }"
        @mousedown.prevent
      >
        <div class="date-header">
          <div class="btn last-month-btn" @mousedown="changeMonth(-1)">
            <i class="icon last-month-icon"></i>
            <span class="sideMonth">{{ month === 1 ? 12 : month - 1 }}月</span>
          </div>
          <div class="centerDate">
            <div>{{ year }}年{{ month > 9 ? month : '0' + month }}月</div>
            <div class="turnYearBox">
              <i
                class="yearBtn last-year-btn"
                @mousedown="changeMonth(-12)"
              ></i>
              <i class="yearBtn next-year-btn" @mousedown="changeMonth(12)"></i>
            </div>
          </div>
          <div
            type="button"
            class="btn next-month-btn"
            @mousedown="changeMonth(1)"
          >
            <span class="sideMonth">{{ month === 12 ? 1 : month + 1 }}月</span>
            <i class="icon next-month-icon"></i>
          </div>
        </div>
        <div class="date-content">
          <table class="date-table">
            <thead>
              <tr>
                <th v-for="data in thead" :key="data">
                  <span>{{ data }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in tbody" :key="'row-' + rowIndex">
                <td v-for="cell in row" :key="cell.key">
                  <span
                    @click="selectDate(cell)"
                    :class="{
                      highLightDate: cell.isCurrentMonth && !cell.isWeekend,
                      highLightToday: cell.isToday
                    }"
                    >{{ cell.label }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyDate from '@/utils/const.js';
export default {
  name: 'datePicker',
  data() {
    return {
      datePicker: new MyDate(),
      selectedDate: this.defaultTime,
      containerVisible: false,
      formatFlag: '',
    };
  },
  props: {
    defaultTime: {
      type: String,
      default: ''
    },
    formatYMD: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },
  created() {
    switch(this.formatYMD) {
        case 'YYYY-MM-DD': this.formatFlag = 'YmD'; break;
        case 'YYYYMMDD': this.formatFlag = 'YMd'; break;
        case 'YYYY/MM/DD': this.formatFlag = 'yMD'; break;
    }
  },
  methods: {
    //改变月份
    changeMonth(count) {
      const changedDate = new Date(this.year, this.month + count - 1);
      this.datePicker.changeDate(changedDate);
    },
    //选择日期
    selectDate(selected) {
      this.selectedDate = selected.value[this.formatFlag];
      // this.$refs.input.blur();
      this.$emit('onSelect', this.selectedDate);
      this.containerVisible = false;

    },
    //显示隐藏日期选择器
    toggleDateContainer(visibility) {
      this.containerVisible = visibility;
    },
    preventBlur(event) {
      event.preventDefault();
    },
    seleCalIcon() {
      if(this.containerVisible) {
        this.$refs.input.blur();
      }else {
        this.$refs.input.focus();
      }
    }
  },
  computed: {
    year() {
      return this.datePicker.current.year;
    },
    month() {
      return this.datePicker.current.month;
    },
    thead() {
      return this.datePicker.weeks;
    },
    tbody() {
      return this.datePicker.dates;
    }
  }
};
</script>
<style lang="sass" scoped>
.container
  position: relative
  width: 320px
.input-label
  position: relative
  .date-input
    display: block
    width: 275px
    height: 40px
    padding: 0 45px 0 16px
    border: 1px solid #e1e1ed
    background: #ffffff
    outline: none
    font-size: 14px
    color: #333333
    border-radius: 2px 2px 0 0
  .active
    border: 1px solid #123460
    box-shadow: 0 0 10px 0 rgba(105, 119, 215, 0.24)
  .calenderIcon
    position: absolute
    right: 10px
    top: 50%
    transform: translateY(-50%)
    width: 16px
    height: 16px
    background: url('../../assets/images/calendar.png') center center
    background-size: 16px 16px
    cursor: pointer
.date-container
  position: absolute
  width: 304px
  background: #ffffff
  border: 1px solid #123460
  border-radius: 2px 0 2px 2px
  transition: all 0.5s ease
  height: 0
  overflow: hidden
  will-change: height
  opacity: 0
  transform: translateZ(0)
  z-index: 5
.container-visible
  height: 270px
  opacity: 1
.date-header
  width: 288px
  border-bottom: 1px solid #eeeeee
  margin: 0 auto
  font-size: 12px
  color: #333333
  line-height: 34px
  display: flex
  justify-content: center
.date-header .btn
  display: inline-block
  width: 47px
.date-header .btn .icon
  position: relative
  top: -1px
  display: inline-block
  width: 16px
  height: 16px
  vertical-align: middle
.last-month-icon
  background: url('../../assets/images/left.png') center center
  background-size: 32px 32px
  cursor: pointer
.next-month-btn
  text-align: right
.next-month-icon
  background: url('../../assets/images/right.png') center center
  background-size: 32px 32px
  cursor: pointer
.date-header .centerDate
  display: inline-block
  width: 194px
  text-align: center
  display: flex
  justify-content: center
.centerDate div
  height: 34px
  line-height: 34px
.date-header .centerDate .turnYearBox
  width: 16px
  height: 16px
  margin-top: 8px
.date-header .centerDate .turnYearBox .yearBtn
  display: block
  width: 16px
  height: 10px
.last-month-btn
  text-align: left
.last-year-btn
  background: url('../../assets/images/up.png') no-repeat center center
  background-size: 10px 10px
  cursor: pointer
.next-year-btn
  background: url('../../assets/images/down.png') no-repeat center center
  background-size: 10px 10px
  margin-top: -2px
  cursor: pointer
.date-content
  width: 100%
  font-size: 12px
  color: #333333
.date-content
  width: 300px
  font-size: 12px
  padding: 0 10px
  .date-table
    width: 100%
    border-spacing: 0
    th
      color: #333333
      border-bottom: 1px solid #ebeef5
      line-height: 30px
      user-select: none
      cursor: pointer
      text-align: center
    td
      cursor: pointer
      line-height: 30px
      text-align: center
      &:hover
        background: #ebedff
        color: #153b6c
      .highLightToday
          background: #ebedff
          color: #153b6c
      span
        display: inline-block
        width: 100%
        height: 100%
        cursor: pointer
        color: #a4a2a2
      .highLightDate
        color: #333333
</style>
