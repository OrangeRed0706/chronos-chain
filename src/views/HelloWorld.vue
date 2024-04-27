<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Hello World</v-card-title>
            <v-card-text>
              <p>Count: {{ count }}</p>
              <v-btn @click="count++">Increment</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Get Something</v-card-title>
            <v-card-text>
              <v-btn @click="GetSomeing">Get</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import {ref} from 'vue'
import {httpClient} from '../utils/http.ts'

const count = ref(0)

function GetSomeing() {
  httpClient
      .get('https://webhook.site/f60c7a17-1d9d-4270-a228-223fb7608d02')
      .then(response => {
        console.log(response.data)
      })
}
</script>
