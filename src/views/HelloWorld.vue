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
  </v-main>
</template>

<script setup>
import {ref} from 'vue'

const count = ref(0)
</script>
