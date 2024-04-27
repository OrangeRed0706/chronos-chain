<template>
  <v-app>
    <v-layout class="fill-height login" justify-center align-center>
      <v-container class="fill-height">
        <v-sheet class="mx-auto" width="500">
          <v-form fast-fail @submit.prevent>
            <v-text-field v-model="email" label="Email" type="email"></v-text-field>
            <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            <v-btn class="mt-2" type="submit" block>Login</v-btn>
            <div class="text-center mt-2">
              <span>Or login with</span>
              <v-btn @click="loginWithGitLab">
                <v-icon>mdi-gitlab</v-icon>
              </v-btn>
              <v-btn @click="loginWithGitHub">
                <v-icon>mdi-github</v-icon>
              </v-btn>
            </div>
          </v-form>
        </v-sheet>
      </v-container>
    </v-layout>
  </v-app>
</template>

<script setup>
import {ref} from 'vue'
import { useAuthStore } from "../store";
import router from "../router/index";

const store = useAuthStore();
const email = ref('')
const password = ref('')

const loginWithGitLab = () => {
  localStorage.setItem("token", "gitlab");
  router.push('/');
}

const loginWithGitHub = () => {
  // 觸發 GitHub OAuth 登入流程
}

</script>
<script>
export default {
  components: {
    name: 'Login',
  }
}
</script>

<style>
.login {
  background: radial-gradient(circle at 10% 20%, rgb(69, 86, 102) 0%, rgb(34, 34, 34) 90%);
}
</style>
