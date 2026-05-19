<script setup>
import { ref } from 'vue'
import { formatDate } from '../utils/format.js'

defineProps({
  gallery: { type: Object, required: true },
})

const lightbox = ref(null)

function open(item) {
  lightbox.value = item
}

function close() {
  lightbox.value = null
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}
</script>

<template>
  <section id="galeria" class="section gallery">
    <div class="section__inner">
      <span class="section__eyebrow">Recorrido</span>
      <h2 class="section__title">{{ gallery.title }}</h2>
      <p class="section__subtitle">{{ gallery.subtitle }}</p>

      <div class="gallery__grid">
        <article
          v-for="item in gallery.items"
          :key="item.id"
          class="gallery__item card"
          @click="open(item)"
        >
          <div class="gallery__media">
            <img
              v-if="item.type === 'image'"
              :src="item.src"
              :alt="item.caption"
              loading="lazy"
              @error="($event.target).src = '/images/placeholder.svg'"
            />
            <template v-else>
              <video
                :src="item.src"
                :poster="item.poster"
                muted
                playsinline
                preload="metadata"
                @error="($event.target).style.display = 'none'"
              />
              <span class="gallery__play" aria-hidden="true">▶</span>
            </template>
          </div>
          <div class="gallery__caption">
            <time v-if="item.date">{{ formatDate(item.date.length === 7 ? item.date + '-01' : item.date) }}</time>
            <p>{{ item.caption }}</p>
          </div>
        </article>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="lightbox"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="lightbox.caption"
        @click.self="close"
        @keydown="onKeydown"
      >
        <button type="button" class="lightbox__close" aria-label="Cerrar" @click="close">×</button>
        <img
          v-if="lightbox.type === 'image'"
          :src="lightbox.src"
          :alt="lightbox.caption"
          class="lightbox__media"
        />
        <video
          v-else
          :src="lightbox.src"
          :poster="lightbox.poster"
          controls
          autoplay
          class="lightbox__media"
        />
        <p class="lightbox__caption">{{ lightbox.caption }}</p>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.gallery {
  background: var(--cream);
}

.gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.gallery__item {
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s;
}

.gallery__item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.gallery__media {
  position: relative;
  aspect-ratio: 4 / 3;
  background: linear-gradient(135deg, var(--sage) 0%, var(--blush) 100%);
  overflow: hidden;
}

.gallery__media img,
.gallery__media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery__play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--white);
  background: rgba(74, 63, 63, 0.25);
  pointer-events: none;
}

.gallery__caption {
  padding: 1rem 1.1rem;
}

.gallery__caption time {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--terracotta);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.gallery__caption p {
  margin: 0.35rem 0 0;
  font-size: 0.95rem;
  color: var(--text);
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(74, 63, 63, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: var(--white);
  font-size: 1.5rem;
  line-height: 1;
  color: var(--text);
}

.lightbox__media {
  max-width: min(90vw, 900px);
  max-height: 75vh;
  border-radius: var(--radius);
  object-fit: contain;
}

.lightbox__caption {
  color: var(--white);
  margin-top: 1rem;
  text-align: center;
  max-width: 32rem;
}
</style>
