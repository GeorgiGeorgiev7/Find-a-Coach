<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button :isLink="true" :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    selectedCoach() {
      return this.$store
        .getters["coaches/coaches"]
        .find((coach) => coach.id === this.id)
    },
    fullName() {
      return this.selectedCoach?.firstName + " " + this.selectedCoach?.lastName
    },
    contactLink() {
      return this.$route.path.endsWith("/contact")
        ? this.$route.path
        : this.$route.path + "/contact"
    },
    areas() {
      return this.selectedCoach?.areas
    },
    rate() {
      return this.selectedCoach?.rate
    },
    description() {
      return this.selectedCoach?.description
    },
  },
  created() {
    const loadedCoaches = this.$store.getters["coaches/coaches"]
    if (loadedCoaches.length === 0) {
      this.$store.dispatch("coaches/loadCoaches")
    }
  },
}
</script>
