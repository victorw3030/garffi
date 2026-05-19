<script setup>
import { ref } from 'vue'
import { formatMoney, formatPercent } from '../utils/format.js'

const props = defineProps({
  hero: { type: Object, required: true },
  progress: { type: Object, required: true },
  brand: { type: Object, required: true },
})

defineEmits(['donate'])

const imageError = ref(false)

const percent = () => {
  if (!props.progress?.goal) return 0
  return Math.min(100, (props.progress.raised / props.progress.goal) * 100)
}
</script>

<template>
  <section class="hero">
    <div class="hero__blobs" aria-hidden="true">
      <span class="hero__blob hero__blob--1" />
      <span class="hero__blob hero__blob--2" />
      <span class="hero__blob hero__blob--3" />
    </div>

    <div class="hero__inner">
      <div class="hero__content reveal">
        <span class="hero__badge">{{ hero.badge }}</span>
        <h1 class="hero__title">{{ hero.headline }}</h1>
        <p class="hero__sub">{{ hero.subheadline }}</p>
        <p class="hero__location">📍 {{ brand.location }}</p>

        <div v-if="progress" class="hero__progress card">
          <div class="hero__progress-header">
            <span>{{ progress.label }}</span>
            <strong>{{ formatPercent(percent()) }}</strong>
          </div>
          <div class="hero__progress-bar">
            <div class="hero__progress-fill" :style="{ width: percent() + '%' }" />
          </div>
          <p class="hero__progress-amounts">
            <span> {{ formatMoney(progress.raised,progress.currency) }}</span>
            <span>de {{ formatMoney(progress.goal,progress.currency) }}</span>
          </p>
        </div>

        <button type="button" class="btn btn--primary hero__cta" @click="$emit('donate')">
          Quiero ayudar a {{ brand.name }}
        </button>
      </div>

      <div class="hero__visual reveal">
        <div class="hero__frame">
          <img
            v-if="!imageError"
            :src="hero.image"
            :alt="hero.imageAlt"
            class="hero__image"
            @error="imageError = true"
          />
          <div v-else class="hero__placeholder">
            <span class="hero__placeholder-icon">🐾</span>
            <p>Agregá la foto en <code>public{{ hero.image }}</code></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 2rem 1.25rem 4rem;
}

.hero__blobs {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.45;
}

.hero__blob--1 {
  width: 280px;
  height: 280px;
  background: var(--blush);
  top: -80px;
  right: -40px;
}

.hero__blob--2 {
  width: 220px;
  height: 220px;
  background: var(--sage);
  bottom: 10%;
  left: -60px;
}

.hero__blob--3 {
  width: 160px;
  height: 160px;
  background: var(--lavender);
  top: 40%;
  left: 30%;
}

.hero__inner {
  position: relative;
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
}

.hero__badge {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  background: var(--honey);
  color: var(--text);
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: var(--radius-pill);
  margin-bottom: 1rem;
}

.hero__title {
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  margin-bottom: 0.75rem;
}

.hero__sub {
  font-size: 1.1rem;
  color: var(--text-soft);
  margin: 0 0 0.5rem;
}

.hero__location {
  font-size: 0.95rem;
  color: var(--terracotta);
  font-weight: 600;
  margin: 0 0 1.5rem;
}

.hero__progress {
  padding: 1rem 1.15rem;
  margin-bottom: 1.5rem;
}

.hero__progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
}

.hero__progress-bar {
  height: 10px;
  background: var(--cream-dark);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.hero__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--sage), var(--blush));
  border-radius: var(--radius-pill);
  transition: width 0.8s ease;
}

.hero__progress-amounts {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--text-soft);
  margin: 0.5rem 0 0;
}

.hero__frame {
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 4px solid var(--white);
  aspect-ratio: 4 / 5;
  background: linear-gradient(160deg, var(--blush) 0%, var(--lavender) 100%);
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: var(--white);
}

.hero__placeholder-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.hero__placeholder code {
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.25);
  padding: 0.15rem 0.4rem;
  border-radius: 0.35rem;
}

@media (max-width: 768px) {
  .hero__inner {
    grid-template-columns: 1fr;
  }

  .hero__visual {
    order: -1;
  }

  .hero__frame {
    max-height: 320px;
    aspect-ratio: 1;
  }
}
</style>
