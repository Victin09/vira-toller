<script setup lang="ts">
import { defineComponent, ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <vds-card
    clear text="b" size="xl" color="special-text" shadow="special"
    image="linear(-15deg, hue(280 special), hue(320 special))">
    Fancy card
  </vds-card>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
