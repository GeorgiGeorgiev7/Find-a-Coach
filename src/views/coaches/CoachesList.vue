<template>
  <section>Filter</section>
  <section>
    <base-card>
      <div class="controls">
        <base-button class="outline">Refresh</base-button>
        <base-button :isLink="true" to="/register"
          >Register as a Coach</base-button
        >
      </div>
      <ul v-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.rate"
          :areas="coach.areas"
        >
        </coach-item>
      </ul>
      <h3 v-else>
        No existing coaches. Maybe
        <router-link to="/register">register</router-link>
        as one?
      </h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue"

export default {
  components: {
    "coach-item": CoachItem,
  },
  computed: {
    filteredCoaches() {
      return this.$store.getters["coaches/coaches"]
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"]
    },
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>