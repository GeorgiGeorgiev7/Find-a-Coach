<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!isFormValid">
        Please enter a valid email and password (password must be at least 6
        characters long).
      </p>
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button type="button" class="flat" @click="toggleMode">{{
        switchModeButtonCaption
      }}</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isFormValid: true,
      mode: "login",
    }
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login"
      } else {
        return "Signup"
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Don't have an account?"
      } else {
        return "Already have an account?"
      }
    },
  },
  methods: {
    validateForm() {
      this.isFormValid = true
      if (!this.email.includes("@") || this.password.length < 6) {
        this.isFormValid = false
      }
    },
    submitForm() {
      this.validateForm()

      if (!this.isFormValid) return
    },
    toggleMode() {
      if (this.mode === "login") {
        this.mode = "signup"
      } else {
        this.mode = "login"
      }
    },
  },
}
</script>


<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>