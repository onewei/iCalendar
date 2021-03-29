<template>
  <div id="app">
      <ICalendar :formatYMD="'YYYY/MM/DD'" @onSelect="getData"></ICalendar>
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
          console.log(val);
      }
  },
}
</script>

<style>
</style>
