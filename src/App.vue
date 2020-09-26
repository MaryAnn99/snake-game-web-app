<template>
<!-- App.vue -->
<v-app>
  <!-- Sizes your content based upon application components -->
  <v-main>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
    <img :src="logo" class="logo"/>
      <div class="game">
        <Game />
      </div>
      <div class="records">
        <div class="table">
          <div class="recordsTitle">
            <h3> BEST SCORES </h3>
          </div>
          <snake-game-records-table :records="records"> </snake-game-records-table>
        </div>
      </div>
    </v-container>
  </v-main>
    <v-footer>
      <div class="footer">
         © Snake.com {{new Date().getFullYear()}}
      </div>
    </v-footer>
</v-app>
</template>


<script>
import Game from '@/components/Game'
import RecordsTable from '@/components/RecordsTable'
import logo from '../public/page_title.png'
import {Records} from '@/services/records'

export default {
  name: 'App',
  components: { 
    Game, 
    'snake-game-records-table': RecordsTable 
  },
  data() {
    return {
      logo: logo,
      records: null
    }
  },
  mounted () {
    Records.index().then(data => {
      this.records = data
    }).catch((err) => {
      console.log("error: ", err)
    })
  }
}
</script>
<style lang="scss" scoped>
.game {
  width: 50%;
  margin-left: 5%;
  margin-top: 5%;
  float: left;
  margin-bottom: 5%;
}
.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}
.footer {
  text-align: center;
  vertical-align: middle;
  line-height: 25px;
  width: 100%;
}
.records {
  width: 45%;
  margin-top: 5%;
  float: right;
  margin-bottom: 5%;
}
.table {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  border: 4px dotted blue;
}
.recordsTitle {
  color:#fff700;
  text-align: center;
  font-size:30px;
  font-family: 'Courier New', Courier, monospace;
}
</style>
