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
    <v-card class="mx-auto" max-width="400">
      <v-img
          color="surface-variant"
          height="200"
          src="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg"
          cover
      >
        <v-toolbar color="transparent">
          <template v-slot:prepend>
            <v-btn icon="$menu"></v-btn>
          </template>

          <v-toolbar-title class="text-h6" text="Messages"></v-toolbar-title>

          <template v-slot:append>
            <v-btn icon="mdi-dots-vertical"></v-btn>
          </template>
        </v-toolbar>
      </v-img>

      <v-card-text>
        <div class="font-weight-bold ms-1 mb-2">Today</div>

        <v-timeline align="start" density="compact">
          <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :dot-color="message.color"
              size="x-small"
          >
            <div class="mb-4">
              <div class="font-weight-normal">
                <strong>{{ message.from }}</strong> @{{ message.time }}
              </div>

              <div>{{ message.message }}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script setup>
import {ref} from 'vue'
import {axios} from '../utils/http.ts'

const count = ref(0)

function GetSomeing() {
  axios
      .get('https://webhook.site/f60c7a17-1d9d-4270-a228-223fb7608d02')
      .then(response => {
        console.log(response.data)
      })
}


const messages = [
  {
    from: 'You',
    message: `Sure, I'll see you later.`,
    time: '10:42am',
    color: 'deep-purple-lighten-1',
  },
  {
    from: 'John Doe',
    message: 'Yeah, sure. Does 1:00pm work?',
    time: '10:37am',
    color: 'green',
  },
  {
    from: 'You',
    message: 'Did you still want to grab lunch today?',
    time: '9:47am',
    color: 'deep-purple-lighten-1',
  }
]
</script>
