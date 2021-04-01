<template>
  <div id="app">
      <ICalendar :formatYMD="'YYYY/MM/DD'" @onSelect="getData" :defaultTime="'2020/02/01'"></ICalendar>
  </div>
</template>

<script>
import ICalendar from '@/components/iCalendar'

export default {
  components: {
    ICalendar
  },
  data() {
      return {
          data: ''
      }
  },
  methods: {
      getData(val) {
          this.data = val;
      }
  },
}
</script>

<style>
</style>
