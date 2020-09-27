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
        <div class="saveScoreform">
          <snake-game-save-score-form> </snake-game-save-score-form>
        </div>
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
import SaveScoreForm from '@/components/SaveScoreForm'
import logo from '../public/page_title.png'
import {Records} from '@/services/records'
import {eventBus} from '@/main'

export default {
  name: 'App',
  components: { 
    Game, 
    'snake-game-records-table': RecordsTable,
    'snake-game-save-score-form': SaveScoreForm
  },
  data() {
    return {
      logo: logo,
      records: null
    }
  },
  methods: {
    getRecords() {
      Records.index().then(data => {
          this.records = data
      }).catch((err) => {
        console.log("error: ", err)
      });
    },
  },
  mounted () {
    this.getRecords();
    eventBus.$on('recordsTableWasUpdated', () => {
        this.getRecords();
    })
  },
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
  margin-top: 3%;
}
.recordsTitle {
  color:#fff700;
  text-align: center;
  font-size:30px;
  font-family: 'Courier New', Courier, monospace;
}
.saveScoreform {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  // border: 4px dotted blue;
}
</style>
