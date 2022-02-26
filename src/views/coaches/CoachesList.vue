<template>
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="setFilters" />
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button class="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isCoach && !isLoading" :isLink="true" to="/register"
          >Register as a Coach</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner />
      </div>
      <ul v-else-if="hasCoaches">
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
import CoachFilter from "../../components/coaches/CoachFilter.vue"

export default {
  components: {
    "coach-item": CoachItem,
    "coach-filter": CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        javascript: true,
        python: true,
        blockchain: true,
        defi: true,
      },
    }
  },
  computed: {
    filteredCoaches() {
      const allCoaches = this.$store.getters["coaches/coaches"]
      return allCoaches.filter((coach) => {
        for (const filter in this.activeFilters) {
          if (this.activeFilters[filter] && coach.areas.includes(filter)) {
            return true
          }
        }
        return false
      })
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"]
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"]
    },
  },
  created() {
    this.loadCoaches()
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters
    },
    async loadCoaches() {
      this.isLoading = true
      try {
        await this.$store.dispatch("coaches/loadCoaches")
      } catch (err) {
        this.error = err.message || "Something went wrong"
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
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