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
        <tr v-for="item, idx in topTenScores" :key="item.name">
          <td>{{ idx + 1 }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.bestScore }}</td>
        </tr>
        <!-- If the user is not in the top 10, the user's score is displayed
        at the end of the best scores table -->
        <tr v-if="isNotUserInTopTen">
          <td>{{ currentUser.idx }}</td>
          <td>{{ currentUser.username }}</td>
          <td>{{ currentUser.bestScore }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>


<script>
  export default {
    props: ['records', 'current'],
    data () {
      return {
      }
    },
    computed: {
      topTenScores() {
        if (this.records != null) {
          return this.records.slice(0, 10);
        }
        return [];
      },
      isNotUserInTopTen() {
        if (!this.records || !this.current) {
          return false;
        }
        for (let i = 0; i < Math.min(10, this.records.length); i++) { 
          if (this.records[i].username == this.current) {
            return false;
          }
        }
        return true;
      },
      currentUser() {
        var idx = 1;
        for(let record of this.records) {
          if(record.username == this.current) {
            return {
              idx,
              username: record.username,
              bestScore: record.bestScore
            };
          }
          idx ++;
        }
        return {
          idx,
          username: "---",
          bestScore: "---"
        };
      }
    }
  }
</script>
<style lang="scss" scoped>
.text {
  font-family: 'Courier New', Courier, monospace;
}
</style>
