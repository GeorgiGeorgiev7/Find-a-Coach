<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">First name</label>
      <input type="text" id="firstname" v-model.trim="firstName.value" />
      <p v-if="!firstName.isValid">Please add your first name.</p>
    </div>

    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Last name</label>
      <input type="text" id="lastname" v-model.trim="lastName.value" />
      <p v-if="!lastName.isValid">Please add your last name.</p>
    </div>

    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea id="description" rows="3" v-model.trim="description.value" />
      <p v-if="!description.isValid">Please add a description.</p>
    </div>

    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly rate</label>
      <input type="number" id="rate" v-model.number="rate.value" />
      <p v-if="!rate.isValid">Hourly rate must be a non-negative number.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Area of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="javascript"
          value="javascript"
          v-model="areas.value"
        />
        <label for="javascript">JavaScript</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="python"
          value="python"
          v-model="areas.value"
        />
        <label for="python">Python</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="blockchain"
          value="blockchain"
          v-model="areas.value"
        />
        <label for="blockchain">Blockchain</label>
      </div>
      <div>
        <input type="checkbox" id="defi" value="defi" v-model="areas.value" />
        <label for="defi">DeFi</label>
      </div>
      <p v-if="!areas.isValid">Please select at least one expertise.</p>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      rate: {
        value: null,
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      formIsValid: true,
    }
  },
  methods: {
    validateForm() {
      this.formIsValid = true

      if (this.firstName.value === "") {
        this.firstName.isValid = false
        this.formIsValid = false
      } else {
        this.firstName.isValid = true
      }

      if (this.lastName.value === "") {
        this.lastName.isValid = false
        this.formIsValid = false
      } else {
        this.lastName.isValid = true
      }

      if (this.description.value === "") {
        this.description.isValid = false
        this.formIsValid = false
      } else {
        this.description.isValid = true
      }

      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false
        this.formIsValid = false
      } else {
        this.rate.isValid = true
      }

      if (this.areas.value.length === 0) {
        this.areas.isValid = false
        this.formIsValid = false
      } else {
        this.areas.isValid = true
      }
    },
    submitForm() {
      this.validateForm()

      if (!this.formIsValid) return

      const formData = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        description: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value,
      }

      this.$emit("save-data", formData)
    },
  },
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>