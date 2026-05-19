<script setup>
defineProps({
  label: { type: String, default: 'Quiero ayudar' },
})

defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="fab"
    :aria-label="label"
    @click="$emit('click')"
  >
    <span class="fab__icon" aria-hidden="true">❤️</span>
    <span class="fab__label">{{ label }}</span>
  </button>
</template>

<style scoped>
.fab {
  position: fixed;
  bottom: 1.5rem;
  right: 1.25rem;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.35rem;
  border: none;
  border-radius: var(--radius-pill);
  background: linear-gradient(135deg, var(--blush) 0%, var(--blush-deep) 100%);
  color: var(--white);
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 8px 24px rgba(212, 149, 159, 0.45);
  transition: transform 0.2s, box-shadow 0.2s;
  animation: fabPulse 2.5s ease-in-out infinite;
}

.fab:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 32px rgba(212, 149, 159, 0.55);
}

.fab__icon {
  font-size: 1.15rem;
}

@keyframes fabPulse {
  0%,
  100% {
    box-shadow: 0 8px 24px rgba(212, 149, 159, 0.45);
  }
  50% {
    box-shadow: 0 8px 32px rgba(212, 149, 159, 0.65);
  }
}

@media (max-width: 480px) {
  .fab__label {
    display: none;
  }

  .fab {
    width: 3.5rem;
    height: 3.5rem;
    padding: 0;
    justify-content: center;
    border-radius: 50%;
  }
}
</style>
