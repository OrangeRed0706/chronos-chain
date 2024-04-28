<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-start">
          <div>
            <v-btn
                :loading="loading"
                @click="CreateTaskBtn"
            >
              Dry Run
              <template v-slot:loader>
                <v-progress-linear indeterminate></v-progress-linear>
              </template>
            </v-btn>
          </div>
        </v-col>
        <v-text-field
            v-model="searchUser"
            label="Search by User"
            placeholder="Enter user name"
            @input="searchTasks"
        ></v-text-field>
      </v-row>
    </v-container>
    <v-container>
      <v-card
          v-for="task in originalTasks"
          :key="task.id"
          class="mb-4"
      >
        <v-card-title>{{ task.name }}</v-card-title>
        <v-card-text>
          <p>ID: {{ task.id }}</p>
          <p>Description: {{ task.description }}</p>
          <p>Creator: {{ task.creator }}</p>
          <p>State: {{ taskStateType[task.status] }}</p>
          <p>Timestamp: {{ new Date(task.timestamp).toLocaleString() }}</p>
        </v-card-text>
        <v-progress-linear
            v-model="task.progressPercentage"
            color="blue-grey"
            height="25"
        >
          <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
        <v-card-actions v-if="task.status === taskStateType.WaitingVerification">
          <v-btn color="primary" @click="confirmTask(task)">Confirm</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn disabled color="primary">Confirm</v-btn>
          <v-btn v-if="task.status !== taskStateType.Completed" color="primary" @click="retryTask(task)">Retry</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import {axios, loading} from '../utils/http.ts';
import * as signalr from '../utils/signalr.ts';
import {onMounted, ref} from "vue";
import {taskType} from "@/utils/types.ts";
import {taskStateType} from "../utils/enums.ts";

const connection = signalr.createSignalRConnection();
const searchUser = ref('');
const originalTasks = ref<taskType[]>([]);
const searchTasks = ref<taskType[]>([]);

signalr.registerSignalRMessageHandler(connection, 'ClientReceiveMessage', message => {
  console.log(`receive message from server: ${message}`);
});


signalr.registerSignalRMessageHandler(connection, 'ClientReceiveTaskMessage', message => {
  const task = JSON.parse(message);
  const existingTask = originalTasks.value.find(t => t.id === task.id);
  if (existingTask) {
    Object.assign(existingTask, task);
  } else {
    originalTasks.value.push(task);
  }
});

const ClickBtn = async (): Promise<void> => {
  signalr.sendSignalRMessage(connection, 'BroadcastMessage', `SendMessage ${new Date().toISOString()}`);
}

const GetTasks = async (): Promise<void> => {
  try {
    const response = await axios.get('http://localhost:5178/api/deployment');
    originalTasks.value = response.data;
  } catch (e) {
    console.error(e);
  }
}

const CreateTaskBtn = async (): Promise<void> => {
  try {
    const response = await axios.post('http://localhost:5178/api/deployment/', {});
    console.log(response.status === 200 ? 'Create task successfully' : 'Failed to create task');

  } catch (e) {
    console.error(e);
  }
}

const confirmTask = async (taskInfo: taskType): Promise<void> => {
  try {
    const response = await axios.put(`http://localhost:5178/api/deployment/confirm`, taskInfo)
    console.log((response.data));
  } catch (e) {
    console.error(e);
  }
}

const retryTask = async (taskInfo: taskType): Promise<void> => {
  try {
    const response = await axios.post(`http://localhost:5178/api/deployment/retry`, taskInfo)
    console.log((response.data));
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  GetTasks();
});


defineExpose({
  ClickBtn,
  CreateTaskBtn
})
</script>

