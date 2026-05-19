<script setup>
defineProps({
  cta: { type: Object, required: true },
  brand: { type: Object, required: true },
})

defineEmits(['donate'])
</script>

<template>
  <section class="cta section">
    <div class="cta__inner card">
      <span class="cta__paw" aria-hidden="true">🐾</span>
      <h2 class="cta__title">{{ cta.sectionTitle }}</h2>
      <p class="cta__text">{{ cta.sectionText }}</p>
      <button type="button" class="btn btn--primary" @click="$emit('donate')">
        {{ cta.fabLabel }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding-top: 30px;
}

.cta__inner {
  max-width: 36rem;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  text-align: center;
  background: linear-gradient(145deg, rgba(232, 180, 188, 0.25) 0%, rgba(184, 212, 200, 0.25) 100%);
  border: 2px solid var(--white);
}

.cta__paw {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.cta__title {
  font-size: 1.85rem;
  margin-bottom: 0.75rem;
}

.cta__text {
  color: var(--text-soft);
  margin: 0 0 1.5rem;
}
</style>
