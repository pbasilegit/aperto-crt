<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">

    <div class="modal-content" @click.stop>
      <img class="logo-modale" v-if="imagePath" :src="imagePath" alt="Modal Image" />
      <p v-html="text" class="testo-modale"></p>
      <button class="bottone-close" @click="closeModal"><img src="https://www.aperto-crt.it/core/wp-content/uploads/2024/07/Close.svg" alt="Close" ></button> 
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

