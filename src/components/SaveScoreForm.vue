<template>
  <div>
  <v-form v-model="valid">
    <v-container fluid>
      <v-row no-gutters>
        <v-col
          cols="12"
          md="10">
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="username"
            required
            solo
          ></v-text-field>
        </v-col>
     </v-row>
     <v-row no-gutters>
        <v-col
          cols="12"
          md="4">
          <v-btn color="deep-purple accent-4" class="mr-4" @click="handleSubmit">Get In the Best Scores Table!</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <div v-for="value of Object.values(snackbar)" :key="value.msg">
    <v-snackbar 
      v-model="value.show"
      color="deep-purple accent-4"
      elevation="24">
      {{ value.msg }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="value.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  </div>
</template>


<script>
import {eventBus} from '../main'
import {Records} from '../services/records'
  export default {
    data: () => ({
      valid: false,
      username: '',
      bestScore: 0,
      usernameRules: [
        v => !!v || 'username is required',
        v => v.length <= 10 || 'username must be less than 10 characters',
      ],
      snackbar: {
        success: {
          show: false,
          msg: 'You are in the Best Scores table!'
        },
        fail: {
          show: false,
          msg: 'This username is already in the table with a higher score'
        },
        error: {
          show: false,
          msg: 'Sorry, something went wrong'
        },
        invalid: {
          show: false,
          msg: 'Your score must be greater than 0'
        },
      }
    }),
    methods: {
        async handleSubmit (e) {
          e.preventDefault()
          if (!this.valid) {
              return
          }
          if (this.bestScore <= 0) {
            this.snackbar.invalid.show = true;
              return
          }
          // create a new record
          const data = {
            username: this.username,
            bestScore: this.bestScore
          }
          try {
            var result = await Records.create(data)
            if (result.statusCode === '400') {
              // Username exists.
              result = await Records.change(this.username, data)
              if (result.statusCode === '400') {
                // Username exists with a higher score
                this.snackbar.fail.show = true;
              } else {
                // Record updated
                eventBus.updateRecordsTable();
                this.snackbar.success.show = true;
              }
            } else {
              // Record created.
              this.snackbar.success.show = true;
              eventBus.updateRecordsTable();
            }
          } catch (e) {
            // network error
            this.snackbar.error.show = true;
            console.log("hal")
          }
        },
    },
    created() {
      eventBus.$on('scoreWasUpdated', (score) => {
        if (score > this.bestScore) {
          this.bestScore = score;
        }
      });
    }
  }
</script>