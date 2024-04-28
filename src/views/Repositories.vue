<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-select
                v-model="selectedLanguage"
                :items="languages"
                label="Language"
                clearable
                dense
            ></v-select>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row style="margin-left: 2vh; margin-right: 1vh">
      <v-col v-for="repo in filteredRepositories" :key="repo.id" cols="12" md="4">
        <v-card class="d-flex flex-column repo-card">
          <div class="card-content">
            <v-card-title class="flex-grow-1">
              <div class="d-flex align-center">
                <v-icon class="mr-2" size="24">mdi-github</v-icon>
                <span>{{ repo.name }}</span>
              </div>
            </v-card-title>
            <v-card-text class="flex-grow-1">
              <p>{{ repo.description }}</p>
            </v-card-text>
          </div>
          <v-card-actions class="repo-info-container">
            <div class="d-flex align-center">
              <v-icon class="mr-1" size="16">mdi-language-javascript</v-icon>
              <span>{{ repo.language }}</span>
            </div>
            <div class="d-flex align-center">
              <v-icon class="mr-1" size="16">mdi-star</v-icon>
              <span>{{ repo.stargazers_count }}</span>
            </div>
            <div class="d-flex align-center">
              <v-icon class="mr-1" size="16">mdi-source-fork</v-icon>
              <span>{{ repo.forks_count }}</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn :href="repo.html_url" target="_blank" color="primary">View on GitHub</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { axios } from "../utils/http.ts";
import { repositoryType } from "../utils/types.ts";
import { computed, onMounted, ref } from "vue";

const repositories = ref<repositoryType[]>([]);
const search = ref("");
const selectedLanguage = ref("All");

const languages = computed(() => {
  const uniqueLanguages = new Set(repositories.value.map(repo => repo.language).filter(language => language !== null));
  return ["All", ...Array.from(uniqueLanguages)];
});

const filteredRepositories = computed(() => {
  return repositories.value.filter(repo => {
    const nameMatch = repo.name.toLowerCase().includes(search.value.toLowerCase());
    const languageMatch = selectedLanguage.value === "All" || repo.language === selectedLanguage.value;
    return nameMatch && languageMatch;
  });
});

const getRepositories = async () => {
  try {
    const response = await axios.get('http://localhost:5178/api/github/repositories');
    if (response.status !== 200) {
      console.error('Failed to get repositories');
      return;
    }
    repositories.value.push(...response.data);
  } catch (error) {
    console.error('Failed to get repositories', error);
  }
};

onMounted(getRepositories);
</script>

<style scoped>
.repo-info-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
}

.repo-card {
  aspect-ratio: 1 / 0.4; /* 設置卡片的寬高比為 1:1.2 */
  display: flex;
  flex-direction: column;
}

.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
