<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <div v-if="isLoading">
          <base-spinner />
        </div>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData" />
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue"

export default {
  components: {
    "coach-form": CoachForm,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  methods: {
    async saveData(data) {
      this.isLoading = true
      try {
        await this.$store.dispatch("coaches/registerCoach", data)
      } catch (err) {
        this.error = err.message || "Something went wrong"
      }
      this.isLoading = false
      this.$router.replace("/")
    },
    handleError() {
      this.error = null
    },
  },
}
</script>