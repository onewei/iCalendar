export const formatYMD = date => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month =
      dateObj.getMonth() + 1 < 10
        ? '0' + (dateObj.getMonth() + 1)
        : dateObj.getMonth() + 1;
    const day =
      dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
    return {
      YMd: `${year}${month}${day}`,
      YmD: `${year}-${month}-${day}`,
      yMD: `${year}/${month}/${day}`,
    };
  };
  export default class MyDate {
    constructor() {
      //当前日期
      const date = new Date();
      const year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
      //表头
      this.weeks = ['日', '一', '二', '三', '四', '五', '六'];
      //当前选择的日期
      this.current = {
        year,
        month
      };
      //输入日期
      this.dates = [];
      //今天
      this.today = new Date(year, month - 1, day);
      this.getDateArry();
    }
    //改变日期
    changeDate(date = new Date()) {
      this.current = {
        year: date.getFullYear(),
        month: date.getMonth() + 1
      };
      this.getDateArry();
    }
    //获得当前日期数组
    getDateArry() {
      this.dates = [];
      //当前选择日期所在月的第一天及这一天是星期几
      const firstDayOfCurrentMonth = new Date(
        this.current.year,
        this.current.month - 1
      );
      const firstDayOfWeek = firstDayOfCurrentMonth.getDay();
      //内层遍历起始点
      let weekLoopStart = -firstDayOfWeek + 1;
      //行数据
      for (let row = 0; row < 6; row++) {
        const rowDate = [];
        // 列数据
        for (
          let weekDay = weekLoopStart;
          weekDay <= 7 + weekLoopStart - 1;
          weekDay++
        ) {
          const targetDate = new Date(
            this.current.year,
            this.current.month - 1,
            weekDay
          );
          const day = targetDate.getDate();
          const month = targetDate.getMonth() + 1;
          const weekend = targetDate.getDay() === 0 || targetDate.getDay() === 6;
          rowDate.push({
            isWeekend: weekend,
            date: targetDate,
            value: formatYMD(targetDate),
            label: day,
            key: weekDay,
            isCurrentMonth: month === this.current.month,
            isToday: +targetDate === +this.today
          });
        }
        weekLoopStart += 7;
        this.dates.push(rowDate);
      }
    }
  }  