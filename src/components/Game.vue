<template>
  <div>
    <div style="font-family:font1; position:absolute; left:-1000px; visibility:hidden;"></div>
    <div :id="containerId" v-if="downloaded" />
    <div class="placeholder" v-else>
      Downloading ...
    </div>
  </div>
</template>


<script>
export default {
  name: 'Game',
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: 'game-container'
    }
  },
  async mounted() {
    const game = await import(/* webpackChunkName: "game" */ '@/game/game')
    this.downloaded = true
    this.$nextTick(() => {
      this.gameInstance = game.launch(this.containerId)
    })
  },
  destroyed() {
    this.gameInstance.destroy(false)
  }
}
</script>


<style lang="scss" scoped>
.placeholder {
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
  text-align: center;
  vertical-align: middle;
  line-height: 600px; 
  width: 700px;
}
</style>
