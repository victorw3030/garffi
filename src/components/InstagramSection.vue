<script setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  instagram: { type: Object, required: true },
})

const widgetRef = ref(null)

const widgetClass = `elfsight-app-${props.instagram.elfsight.appId}`

function loadElfsightScript() {
  const src = props.instagram.elfsight.scriptUrl
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      if (existing.getAttribute('data-loaded') === 'true') resolve()
      else existing.addEventListener('load', () => resolve(), { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.addEventListener('load', () => {
      script.setAttribute('data-loaded', 'true')
      resolve()
    })
    document.body.appendChild(script)
  })
}

onMounted(async () => {
  await nextTick()
  await loadElfsightScript()
})
</script>

<template>
  <section id="instagram" class="section instagram">
    <div class="section__inner">
      <span class="section__eyebrow">Actualizaciones</span>
      <h2 class="section__title">{{ instagram.title }}</h2>
      <p class="section__subtitle">{{ instagram.subtitle }}</p>

      <div class="instagram__widget card">
        <div
          ref="widgetRef"
          :class="widgetClass"
          :data-elfsight-app-lazy="instagram.elfsight.lazy ? '' : null"
        />
      </div>

      <p v-if="instagram.profileUrl" class="instagram__link-wrap">
        <a
          :href="instagram.profileUrl"
          class="btn btn--ghost instagram__profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ instagram.profileLabel }}
        </a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.instagram {
  background: var(--cream);
}

.instagram__widget {
  padding: 1rem;
  min-height: 320px;
  overflow: hidden;
}

.instagram__widget :deep(.elfsight-app) {
  width: 100%;
}

.instagram__link-wrap {
  text-align: center;
  margin: 1.5rem 0 0;
}

.instagram__profile {
  text-decoration: none;
}
</style>
