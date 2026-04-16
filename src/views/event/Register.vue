<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(["event"])
const router = useRouter()
const GStore = inject('GStore')

const register = () => {
    // If registration API call is successful
    //Push back to the event details

    GStore.flashMessage = 'You are successfully registered for ' + props.event.title
    setTimeout(() => {
        GStore.flashMessage = ''
    }, 3000)

    router.push({
        name: 'event-details'
    })
}

</script>


<template>
    <p>Register for event here</p>
    <button @click="register">Register Me!</button>
</template>