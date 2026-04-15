<script setup>
import { ref, onMounted } from 'vue';
import EventService from '@/services/EventService';

const event = ref(null) // <== We need this because this is what holds our data.
// const id = ref(null) // <== We don't need this because the data is accessed as a prop.

const props = defineProps({
    id: {
        required: true
    }
})

onMounted(() => {
    console.log("Prop id: " + props.id)
  EventService.getEvent(props.id)
  .then((response) => {
    event.value = response.data
  })
  .catch((error) => {
    console.log(error)
  })
})
</script>


<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{  event.description }}</p>
    </div>
</template>