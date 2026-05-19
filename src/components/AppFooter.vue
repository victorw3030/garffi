<script setup>
defineProps({
  footer: { type: Object, required: true },
  brand: { type: Object, required: true },
})

defineEmits(['donate'])
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <p class="footer__thanks">{{ footer.thanks }}</p>
      <p class="footer__brand">Con amor, la familia de {{ brand.name }} · {{ brand.location }}</p>
      <button type="button" class="btn btn--sage" @click="$emit('donate')">
        Hacer un aporte
      </button>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 3rem 1.25rem;
  background: linear-gradient(180deg, var(--cream) 0%, var(--cream-dark) 100%);
  text-align: center;
}

.footer__inner {
  max-width: 32rem;
  margin: 0 auto;
}

.footer__thanks {
  font-family: var(--font-display);
  font-size: 1.35rem;
  margin: 0 0 0.5rem;
}

.footer__brand {
  color: var(--text-soft);
  font-size: 0.9rem;
  margin: 0 0 1.5rem;
}
</style>
