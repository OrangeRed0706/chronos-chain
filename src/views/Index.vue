<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer></v-spacer>
      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>
    <v-navigation-drawer v-model="drawer">

      <v-divider></v-divider>
      <v-list>
        <v-list-item
            v-for="[icon, text, route] in links"
            :key="icon"
            :prepend-icon="icon"
            :title="text"
            :active= "isActive(route)"
            link
            @click="() => router.push(route)"
        ></v-list-item>
      </v-list>
      <v-switch class="switch-container"
                color="blue darken-2"
                @change="toggleThemeMode"
      ></v-switch>
    </v-navigation-drawer>

    <router-view></router-view>
  </v-app>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useTheme} from 'vuetify'
import {useRouter, useRoute} from "vue-router";

const theme = useTheme()
const router = useRouter();
const route = useRoute();
const links = [
  ['mdi-inbox-arrow-down', 'Inbox', '/'],
  ['mdi-send', 'Deployment', '/deployment'],
  ['mdi-delete', 'Trash', '/test'],
  ['mdi-source-repository-multiple', 'Repositories', '/repositories'],
  ['mdi-integrated-circuit-chip', 'Integration', '/test']
]
const drawer = ref(null)
const isActive = (routePath: string) => route.path === routePath

function toggleThemeMode() {
  const currentThemeName = theme.global.name.value;
  theme.global.name.value = currentThemeName === 'light' ? 'dark' : 'light';
}
</script>

<style scoped>
.switch-container {
  position: absolute;
  bottom: 16px; /* 調整按鈕距離底部的距離 */
  left: 16px; /* 調整按鈕距離左側的距離 */
}
</style>
