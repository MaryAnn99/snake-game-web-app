<template>
  <v-simple-table class="text">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">USER</th>
          <th class="text-left">SCORE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item, idx in records" :key="item.name">
          <td>{{ idx + 1 }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.bestScore }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>


<script>
  export default {
    props: ['records'],
    data () {
      return {
      }
    },
  }
</script>
<style lang="scss" scoped>
.text {
  font-family: 'Courier New', Courier, monospace;
}
</style>
