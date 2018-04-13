<template>
  <div>
    <ul>
      <li v-for="item in items">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    items () {
      return this.$store.getters.loadNewspapers
    }
  },
}
</script>
