<script setup>
import { ref, onMounted, computed } from 'vue';
import EventService from '@/services/EventService';
import { useRouter } from 'vue-router';

const props = defineProps({
    id: {
        required: true
    },
})

const router = useRouter()

const event = ref(null) // <== We need this because this is what holds our data.
// const id = ref(null) // <== We don't need this because the data is accessed as a prop.
const id = computed(()=>props.id) // <== We don't need this because the data is accessed as a prop.

onMounted(() => {
    // console.log("Prop id: " + id)
  EventService.getEvent(id.value)
  .then((response) => {
    event.value = response.data
  })
  .catch((error) => {
    // console.log(error)
    if (error.response && error.response.status == 404) {
      router.push({
        name: '404-resource',
        params: { resource: 'event'}
      })
    } else {
      router.push({
        name: 'network-error'
      })
    }
    
  })
})
</script>


<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>

        <div id="nav">
          <nav>
            <RouterLink :to="{ name:'event-details' }">
              Details
            </RouterLink> |
            <RouterLink :to="{ name:'event-register' }">
              Register
            </RouterLink> |
            <RouterLink :to="{ name:'event-edit' }">
              Edit
            </RouterLink>
          </nav>
        </div>
        <RouterView :event="event"></RouterView>
    </div>
</template>