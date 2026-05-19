<script setup>
const props = defineProps({
  open: { type: Boolean, default: false },
  modal: { type: Object, required: true },
})

const emit = defineEmits(['close'])

function onBackdropClick(e) {
  if (e.target === e.currentTarget) emit('close')
}

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

function openWhatsApp() {
  const raw = props.modal.contact?.whatsapp
  if (!raw) return
  const digits = raw.replace(/\D/g, '')
  if (!digits) return
  window.open(`https://wa.me/${digits}`, '_blank', 'noopener,noreferrer')
}

function openLink(url) {
  if (url) window.open(url, '_blank', 'noopener,noreferrer')
}

function openEmail() {
  const email = props.modal.contact?.email
  if (email) window.location.href = `mailto:${email}`
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="modal-backdrop"
      role="presentation"
      @click="onBackdropClick"
      @keydown="onKeydown"
    >
      <div
        class="modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="collab-title"
      >
        <button type="button" class="modal__close" aria-label="Cerrar" @click="emit('close')">
          ×
        </button>

        <span class="modal__sparkle" aria-hidden="true">✨</span>
        <h2 id="collab-title" class="modal__title">{{ modal.title }}</h2>
        <p class="modal__subtitle">{{ modal.subtitle }}</p>

        <ul class="modal__ways">
          <li v-for="(way, i) in modal.ways" :key="i" class="modal__way">
            <span class="modal__way-icon" aria-hidden="true">{{ way.icon }}</span>
            <div>
              <strong>{{ way.title }}</strong>
              <p>{{ way.text }}</p>
            </div>
          </li>
        </ul>

        <p v-if="modal.contact?.hint" class="modal__hint">{{ modal.contact.hint }}</p>

        <div class="modal__actions">
          <button
            v-if="modal.contact?.whatsapp"
            type="button"
            class="btn btn--sage modal__btn"
            @click="openWhatsApp"
          >
            {{ modal.contact.whatsappLabel || 'WhatsApp' }}
          </button>
          <button
            v-if="modal.contact?.email"
            type="button"
            class="btn btn--ghost modal__btn"
            @click="openEmail"
          >
            Enviar email
          </button>
          <button
            v-if="modal.contact?.instagram"
            type="button"
            class="btn btn--ghost modal__btn"
            @click="openLink(modal.contact.instagram)"
          >
            Instagram
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(74, 63, 63, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
  animation: backdropIn 0.3s ease;
}

@keyframes backdropIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (min-width: 520px) {
  .modal-backdrop {
    align-items: center;
  }
}

.modal {
  position: relative;
  width: 100%;
  max-width: 440px;
  max-height: min(90vh, 640px);
  overflow-y: auto;
  padding: 1.75rem 1.5rem 1.5rem;
  animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal__sparkle {
  display: block;
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.15) rotate(8deg);
    opacity: 0.85;
  }
}

.modal__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 2rem;
  height: 2rem;
  border: none;
  background: var(--cream);
  border-radius: 50%;
  font-size: 1.25rem;
  line-height: 1;
  color: var(--text-soft);
}

.modal__title {
  font-family: var(--font-display);
  font-size: 1.65rem;
  margin: 0 0 0.35rem;
  padding-right: 2rem;
}

.modal__subtitle {
  color: var(--text-soft);
  font-size: 0.95rem;
  margin: 0 0 1.25rem;
}

.modal__ways {
  list-style: none;
  margin: 0 0 1rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.modal__way {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 0.85rem 1rem;
  background: linear-gradient(135deg, rgba(232, 180, 188, 0.12) 0%, rgba(184, 212, 200, 0.15) 100%);
  border-radius: 1rem;
  border: 1px solid var(--cream-dark);
}

.modal__way-icon {
  font-size: 1.35rem;
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border-radius: 50%;
  box-shadow: var(--shadow);
}

.modal__way strong {
  display: block;
  font-size: 0.95rem;
  margin-bottom: 0.15rem;
}

.modal__way p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-soft);
  line-height: 1.45;
}

.modal__hint {
  font-size: 0.85rem;
  color: var(--text-soft);
  margin: 0 0 1rem;
  text-align: center;
  font-style: italic;
}

.modal__actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal__btn {
  width: 100%;
}
</style>
