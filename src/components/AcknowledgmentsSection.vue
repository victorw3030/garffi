<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  acknowledgments: { type: Object, required: true },
})

defineEmits(['join'])

const sectionRef = ref(null)
const visible = ref(false)
let observer

const marqueeItems = computed(() => {
  const list = props.acknowledgments.collaborators || []
  if (!list.length) return []

  let expanded = [...list]
  while (expanded.length < 10) {
    expanded = [...expanded, ...list]
  }
  return expanded
})

const marqueeDuration = computed(() => {
  const count = props.acknowledgments.collaborators?.length || 1
  return `${Math.max(30, count * 5)}s`
})

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.15 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section
    id="agradecimientos"
    ref="sectionRef"
    class="section thanks"
    :class="{ 'thanks--visible': visible }"
  >
    <div class="thanks__glow" aria-hidden="true" />
    <ul class="thanks__hearts" aria-hidden="true">
      <li v-for="n in 6" :key="n" :style="{ '--i': n }">💗</li>
    </ul>

    <div class="section__inner">
      <span class="section__eyebrow">Comunidad</span>
      <h2 class="section__title thanks__title">{{ acknowledgments.title }}</h2>
      <p class="section__subtitle">{{ acknowledgments.subtitle }}</p>
      <p v-if="acknowledgments.intro" class="thanks__intro">{{ acknowledgments.intro }}</p>

      <p class="thanks__sr-list">
        Colaboradores:
        <span v-for="(person, i) in acknowledgments.collaborators" :key="`sr-${person.name}-${i}`">
          {{ person.name }}{{ person.role ? ` (${person.role})` : '' }}{{ i < acknowledgments.collaborators.length - 1 ? ', ' : '' }}
        </span>
      </p>

      <div
        v-if="marqueeItems.length"
        class="thanks__marquee"
        :class="{ 'thanks__marquee--active': visible }"
      >
        <div
          class="thanks__marquee-track"
          :style="{ '--marquee-duration': marqueeDuration }"
        >
          <div
            v-for="group in 2"
            :key="`group-${group}`"
            class="thanks__marquee-group"
            :aria-hidden="group === 2"
          >
            <article
              v-for="(person, i) in marqueeItems"
              :key="`${group}-${person.name}-${i}`"
              class="thanks__chip card"
            >
              <span class="thanks__chip-heart" aria-hidden="true">♥</span>
              <div class="thanks__chip-body">
                <strong>{{ person.name }}</strong>
                <span v-if="person.role">{{ person.role }}</span>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div class="thanks__cta">
        <button type="button" class="btn btn--primary thanks__join" @click="$emit('join')">
          <span class="thanks__join-icon" aria-hidden="true">🐾</span>
          {{ acknowledgments.joinButton }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.thanks {
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    165deg,
    var(--white) 0%,
    rgba(232, 180, 188, 0.18) 45%,
    rgba(184, 212, 200, 0.22) 100%
  );
}

.thanks__glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(90vw, 520px);
  height: min(90vw, 520px);
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(232, 180, 188, 0.35) 0%, transparent 70%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 1.2s ease;
}

.thanks--visible .thanks__glow {
  opacity: 1;
  animation: pulseGlow 4s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.08);
  }
}

.thanks__hearts {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.thanks__hearts li {
  position: absolute;
  font-size: 1rem;
  opacity: 0;
  animation: driftHeart 8s ease-in-out infinite;
  animation-delay: calc(var(--i) * 1.1s);
}

.thanks--visible .thanks__hearts li {
  opacity: 0.35;
}

.thanks__hearts li:nth-child(1) {
  left: 8%;
  top: 12%;
}
.thanks__hearts li:nth-child(2) {
  left: 85%;
  top: 18%;
}
.thanks__hearts li:nth-child(3) {
  left: 15%;
  top: 72%;
}
.thanks__hearts li:nth-child(4) {
  left: 78%;
  top: 65%;
}
.thanks__hearts li:nth-child(5) {
  left: 45%;
  top: 8%;
}
.thanks__hearts li:nth-child(6) {
  left: 52%;
  top: 82%;
}

@keyframes driftHeart {
  0%,
  100% {
    transform: translateY(0) rotate(-6deg);
  }
  50% {
    transform: translateY(-12px) rotate(6deg);
  }
}

.thanks__title {
  background: linear-gradient(120deg, var(--blush-deep), var(--terracotta));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.thanks--visible .thanks__title {
  opacity: 1;
  transform: translateY(0);
}

.thanks__intro {
  max-width: 32rem;
  color: var(--text-soft);
  margin: -0.5rem 0 1.5rem;
  font-size: 1.02rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
}

.thanks--visible .thanks__intro {
  opacity: 1;
  transform: translateY(0);
}

.thanks__sr-list {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0,  0, 0);
  white-space: nowrap;
  border: 0;
}

.thanks__marquee {
  position: relative;
  z-index: 1;
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-bottom: 2.5rem;
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    #000 6%,
    #000 94%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0%,
    #000 6%,
    #000 94%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.6s ease 0.25s;
}

.thanks--visible .thanks__marquee {
  opacity: 1;
}

.thanks__marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
}

.thanks__marquee--active .thanks__marquee-track {
  animation: marqueeScroll var(--marquee-duration, 45s) linear infinite;
}

.thanks__marquee:hover .thanks__marquee-track {
  animation-play-state: paused;
}

@keyframes marqueeScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.thanks__marquee-group {
  display: flex;
  align-items: stretch;
  gap: 1rem;
  padding-right: 1rem;
  flex-shrink: 0;
}

.thanks__chip {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.2rem;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.92);
  flex-shrink: 0;
  min-width: 12rem;
  max-width: 16rem;
  transition: box-shadow 0.25s, border-color 0.25s, transform 0.25s;
}

.thanks__chip:hover {
  border-color: var(--blush);
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}

.thanks__chip-heart {
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--blush) 0%, var(--lavender) 100%);
  color: var(--white);
  font-size: 0.9rem;
  flex-shrink: 0;
  animation: heartbeat 2.4s ease-in-out infinite;
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.12);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.08);
  }
  70% {
    transform: scale(1);
  }
}

.thanks__chip-body strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.thanks__chip-body span {
  display: block;
  font-size: 0.82rem;
  color: var(--text-soft);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.thanks__cta {
  text-align: center;
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
}

.thanks--visible .thanks__cta {
  opacity: 1;
  transform: translateY(0);
}

.thanks__join {
  padding: 1rem 2rem;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
}

.thanks__join::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255, 255, 255, 0.35) 50%,
    transparent 70%
  );
  transform: translateX(-120%);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%,
  70%,
  100% {
    transform: translateX(-120%);
  }
  85% {
    transform: translateX(120%);
  }
}

.thanks__join-icon {
  display: inline-block;
  animation: bounce 1.2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .thanks__marquee--active .thanks__marquee-track {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    padding: 0 1rem;
  }

  .thanks__marquee {
    mask-image: none;
    -webkit-mask-image: none;
    overflow-x: auto;
    width: 100%;
    margin-left: 0;
    max-width: 100%;
  }

  .thanks__marquee-group[aria-hidden='true'] {
    display: none;
  }

  .thanks__marquee-group {
    flex-wrap: wrap;
    justify-content: center;
    padding-right: 0;
  }
}
</style>
