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
    </v-container>
  </v-main>
    <v-footer>
      <div class="footer">
        Derechos de autor © Snake.com {{new Date().getFullYear()}}
      </div>
    </v-footer>
</v-app>
</template>


<script>
import Game from '@/components/Game'
import logo from '../public/page_title.png'

export default {
  name: 'App',
  components: { Game },
  data() {
    return {
      logo: logo
    }
  }
}
</script>


<style lang="scss" scoped>
.game {
  width: 70%;
  margin-left: 5%;
  margin-top: 5%;
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
</style>
