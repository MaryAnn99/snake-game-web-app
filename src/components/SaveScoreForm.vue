<template>
  <v-form v-model="valid">
    <v-container fluid>
      <v-row no-gutters>
        <v-col
          cols="12"
          md="11">
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
          <v-btn color="purple" class="mr-4" @click="submit">Get In the Best Scores Table!</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
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
    }),
    methods: {
        submit () {
            if (!this.valid) {
              return
            }
            // create a new record
            var data = {
              username: this.username,
              bestScore: this.bestScore
            }
            Records.create(data).then(data => {
              eventBus.updateRecordsTable();
            }).catch((err) => {
              Records.change(this.username, data).then(data => {
                eventBus.updateRecordsTable();
                console.log("You are in the Best Scores table!")
              }).catch((err) => {
                console.log("This username is already in the table with a better score")
              })
            })
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