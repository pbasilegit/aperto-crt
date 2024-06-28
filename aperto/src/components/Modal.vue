<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">

    <div class="modal-content" @click.stop>
      <img v-if="imagePath" :src="imagePath" alt="Modal Image" />
      <p>{{ text }}</p>
      <button @click="closeModal"><img src="../../public/close.svg" alt="Close" ></button> 
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  imagePath: {
    type: String,
    default: ''
  },
  index: {
    type: Number,
    required: true
  },
  visibleIndex: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['update:visibleIndex']);

const isVisible = ref(false);

watch(
  () => props.visibleIndex,
  (newVal) => {
    isVisible.value = newVal === props.index;
  }
);

const closeModal = () => {
  emit('update:visibleIndex', -1);
};
</script>

