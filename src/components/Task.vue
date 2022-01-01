<script setup>
import { ref } from "vue";

defineProps({
  nodeId: Number,
  name: String,
  isCompleted: Boolean,
  prerequisiteNodeIds: Array, //Array of NodeIds;
  dependentNodeIds: Array, //Array of NodeIds;
  prerequisitesAchieved: Array, //Array of Booleans
});
export default {
  computed: {
    //checking accessibility should be fast:
    isAccessible() {
      // if there are dependencies
      if (this.prerequisiteNodeIds.length > 0)
        // return 1 if nothing is _unsatisfied_
        return this.prerequisitesAchieved.includes(false) ? false : true;
      else return true; // return 1 otherwise.
    },
  },
  watch: {
    isCompleted(newState, oldState) {
      // if we complete a task, update all dependencies.
      //Not sure right now, pass both new state, nodeId, and dependentIds, up, probably?
    },
  },
  methods: {
    //nodeId: number, dependency that was toggled
    //state: Boolean, new state.
    updateDependency(nodeId, state) {
      // Update the input prereq (should work for completed vs not)
      const index = this.prerequisitesNodeIds.indexOf(nodeId);
      if (index > -1) this.prerequisitesAchieved[index] = state;
    },
  },
};
</script>

<template></template>

<style scoped></style>
