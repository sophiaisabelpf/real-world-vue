<script setup>
import EventCard from '@/components/EventCard.vue';
import { ref, onMounted, watch, computed } from 'vue';
import EventService from '@/services/EventService';
import { useRouter } from 'vue-router';

const props = defineProps([
  "page"
])

const router = useRouter()

const events = ref(null)
const totalEvents = ref(0)
const limit = ref(2)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / limit.value) // 3 pages
  return props.page < totalPages // 1 < 3 true
})

const fetchEvents = () => {
  EventService.getEvents(limit.value, props.page)
    .then((response) => {
      events.value = response.data
      totalEvents.value = response.headers["x-total-count"]
    })
    .catch((error) => {
      console.log(error)
      router.push({
        name: 'network-error'
      })
    })
}

onMounted(() => {
  fetchEvents()
})

// TODO: Review
watch( // <-- remember to import LOL
  () => props.page, // <== *** Wrapped in a function because we are using watch on a prop ???
  () => {
    events.value = null // <== *** So that the website looks like it's waiting for data, not hanging
    fetchEvents()
  }
)
</script>

<template>
  <h1>Events For Good</h1>
    <div class="events">
        <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    </div>
    <div class="page-links">
      <RouterLink 
        :to="{ name: 'event-list', query: { page: page-1 }}"
        rel="prev"
        v-if="page != 1">
        < Page {{ page-1 }}
      </RouterLink>

      <p><b>Page {{ page }}</b></p>

      <RouterLink 
        :to="{ name: 'event-list', query: { page: page+1 }}"
        rel="next"
        v-if="hasNextPage"> <!-- Put the v-if logic in its own computed method -->
         Page {{ page+1 }} >
      </RouterLink>
    </div>
<!--     
    <p>limit: {{ limit }}</p>
    <p>total events: {{ totalEvents }}</p>
    <p>current page: {{ props.page }}</p>
    <p>{{ hasNextPage }}</p> -->
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.page-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

}
</style>