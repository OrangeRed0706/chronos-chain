<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-start">
          <div>
            <v-btn
                :loading="loading"
                @click="ClickBtn"
            >
              Dry Run
              <template v-slot:loader>
                <v-progress-linear indeterminate></v-progress-linear>
              </template>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { axios, loading } from '../utils/http.ts';

const ClickBtn = async (): Promise<void> => {
  try {
    loading.value = true;
    await axios.get('https://webhook.site/f60c7a17-1d9d-4270-a228-223fb7608d02');
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

defineExpose({
  ClickBtn
})
</script>
