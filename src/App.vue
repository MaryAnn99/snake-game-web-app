<template>
  <Game />
</template>


<script>
import Game from '@/components/Game'
export default {
  name: 'App',
  components: { Game },
  data() {
    return {
      count: 199
    }
  }
}
</script>


<style lang="scss">
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
</style>
