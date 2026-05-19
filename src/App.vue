<script setup>
import { ref } from 'vue'
import { useSiteData } from './composables/useSiteData.js'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import StorySection from './components/StorySection.vue'
import InstagramSection from './components/InstagramSection.vue'
import TransparencySection from './components/TransparencySection.vue'
import AcknowledgmentsSection from './components/AcknowledgmentsSection.vue'
import CtaSection from './components/CtaSection.vue'
import AppFooter from './components/AppFooter.vue'
import DonateFab from './components/DonateFab.vue'
import DonateModal from './components/DonateModal.vue'
import CollaborateModal from './components/CollaborateModal.vue'

const { site, instagram, expenses, payment, acknowledgments, loading, error } = useSiteData()
const modalOpen = ref(false)
const collaborateOpen = ref(false)

function openDonate() {
  modalOpen.value = true
}

function closeDonate() {
  modalOpen.value = false
}

function openCollaborate() {
  collaborateOpen.value = true
}

function closeCollaborate() {
  collaborateOpen.value = false
}
</script>

<template>
  <div v-if="loading" class="loading-screen">
    <span class="loading-screen__paw" aria-hidden="true">🐾</span>
    <p>Cargando la historia de Garffi…</p>
  </div>

  <div v-else-if="error" class="loading-screen">
    <p>{{ error }}</p>
    <p>Revisá que existan los archivos en <code>public/data/</code></p>
  </div>

  <template v-else-if="site && payment">
    <AppHeader :brand="site.brand" />

    <main>
      <HeroSection
        :hero="site.hero"
        :progress="site.progress"
        :brand="site.brand"
        @donate="openDonate"
      />

      <StorySection :story="site.story" />

      <InstagramSection v-if="instagram" :instagram="instagram" />

      <TransparencySection v-if="expenses" :expenses="expenses" />

      <AcknowledgmentsSection
        v-if="acknowledgments"
        :acknowledgments="acknowledgments"
        @join="openCollaborate"
      />

      <CtaSection :cta="site.cta" :brand="site.brand" @donate="openDonate" />
    </main>

    <AppFooter :footer="site.footer" :brand="site.brand" @donate="openDonate" />

    <DonateFab :label="site.cta.fabLabel" @click="openDonate" />

    <DonateModal
      :open="modalOpen"
      :payment="payment"
      @close="closeDonate"
    />

    <CollaborateModal
      v-if="acknowledgments?.modal"
      :open="collaborateOpen"
      :modal="acknowledgments.modal"
      @close="closeCollaborate"
    />
  </template>
</template>
