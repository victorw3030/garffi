<script setup>
defineProps({
  story: { type: Object, required: true },
})
</script>

<template>
  <section id="historia" class="section story">
    <div class="section__inner">
      <span class="section__eyebrow">Conocelo</span>
      <h2 class="section__title">{{ story.title }}</h2>

      <div class="story__grid">
        <div class="story__text">
          <p v-for="(p, i) in story.paragraphs" :key="i" class="story__p">{{ p }}</p>
        </div>

        <ul class="story__highlights">
          <li
            v-for="(item, i) in story.highlights"
            :key="i"
            class="story__highlight card"
          >
            <span class="story__highlight-icon" aria-hidden="true">{{ item.icon }}</span>
            <div>
              <strong>{{ item.label }}</strong>
              <span>{{ item.text }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story {
  background: linear-gradient(180deg, var(--cream) 0%, var(--white) 50%, var(--cream) 100%);
}

.story__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
  align-items: start;
}

.story__p {
  font-size: 1.05rem;
  color: var(--text-soft);
  margin: 0 0 1rem;
}

.story__highlights {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.story__highlight {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 1.25rem;
}

.story__highlight-icon {
  font-size: 1.75rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cream);
  border-radius: 50%;
}

.story__highlight strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--text);
}

.story__highlight span {
  font-size: 0.9rem;
  color: var(--text-soft);
}

@media (max-width: 768px) {
  .story__grid {
    grid-template-columns: 1fr;
  }
}
</style>
