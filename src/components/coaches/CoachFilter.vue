<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-options">
      <input type="checkbox" id="javascript" checked @change="setFilter" />
      <label for="javascript">JavaScript</label>
    </span>
    <span class="filter-options">
      <input type="checkbox" id="python" checked @change="setFilter" />
      <label for="python">Python</label>
    </span>
    <span class="filter-options">
      <input type="checkbox" id="blockchain" checked @change="setFilter" />
      <label for="blockchain">Blockchain</label>
    </span>
    <span class="filter-options">
      <input type="checkbox" id="defi" checked @change="setFilter" />
      <label for="defi">DeFi</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        javascript: true,
        python: true,
        blockchain: true,
        defi: true,
      },
    }
  },
  methods: {
    setFilter(ev) {
      const inputId = ev.currentTarget.id
      const isActive = ev.target.checked

      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      }

      this.filters = updatedFilters
      this.$emit("change-filter", updatedFilters)
    },
  },
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>