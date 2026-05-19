<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  payment: { type: Object, required: true },
})

const emit = defineEmits(['close'])

const copiedAlias = ref(false)
const copiedCbu = ref(false)

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      copiedAlias.value = false
      copiedCbu.value = false
    }
  },
)

async function copyText(text, field) {
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    if (field === 'alias') {
      copiedAlias.value = true
      setTimeout(() => { copiedAlias.value = false }, 2000)
    } else {
      copiedCbu.value = true
      setTimeout(() => { copiedCbu.value = false }, 2000)
    }
  } catch {
    /* fallback silencioso */
  }
}

function onBackdropClick(e) {
  if (e.target === e.currentTarget) emit('close')
}

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

function openMercadoPago() {
  const url = props.payment.mercadoPago?.baseUrl
  if (url && !url.includes('TU_LINK_AQUI')) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
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
        aria-labelledby="donate-title"
      >
        <button type="button" class="modal__close" aria-label="Cerrar" @click="emit('close')">
          ×
        </button>

        <h2 id="donate-title" class="modal__title">{{ payment.modal.title }}</h2>
        <p class="modal__subtitle">{{ payment.modal.subtitle }}</p>

        <dl class="modal__transfer">
          <div v-if="payment.transfer?.alias">
            <dt>Alias</dt>
            <dd>
              <code>{{ payment.transfer.alias }}</code>
              <button type="button" class="modal__copy" @click="copyText(payment.transfer.alias, 'alias')">
                {{ copiedAlias ? '¡Copiado!' : 'Copiar' }}
              </button>
            </dd>
          </div>
          <div v-if="payment.transfer?.cbu && !payment.transfer.cbu.includes('0000000')">
            <dt>CBU / CVU</dt>
            <dd>
              <code>{{ payment.transfer.cbu }}</code>
              <button type="button" class="modal__copy" @click="copyText(payment.transfer.cbu, 'cbu')">
                {{ copiedCbu ? '¡Copiado!' : 'Copiar' }}
              </button>
            </dd>
          </div>
          <div v-if="payment.transfer?.titular">
            <dt>Titular</dt>
            <dd>{{ payment.transfer.titular }}</dd>
          </div>
          <div v-if="payment.transfer?.banco">
            <dt>Banco</dt>
            <dd>{{ payment.transfer.banco }}</dd>
          </div>
        </dl>

        <p v-if="payment.transfer?.copyHint" class="modal__hint">{{ payment.transfer.copyHint }}</p>

        <button
          v-if="payment.mercadoPago?.enabled && payment.mercadoPago?.baseUrl && !payment.mercadoPago.baseUrl.includes('TU_LINK_AQUI')"
          type="button"
          class="btn btn--primary modal__btn"
          @click="openMercadoPago"
        >
          {{ payment.mercadoPago.label }}
        </button>
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
}

@media (min-width: 520px) {
  .modal-backdrop {
    align-items: center;
  }
}

.modal {
  position: relative;
  width: 100%;
  max-width: 420px;
  padding: 1.75rem 1.5rem 1.5rem;
  animation: slideUp 0.35s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

.modal__transfer {
  margin: 0 0 1rem;
}

.modal__transfer div {
  margin-bottom: 0.85rem;
}

.modal__transfer dt {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-soft);
  margin-bottom: 0.2rem;
}

.modal__transfer dd {
  margin: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.modal__transfer code {
  font-size: 1.05rem;
  font-weight: 700;
  background: var(--cream);
  padding: 0.35rem 0.65rem;
  border-radius: 0.5rem;
}

.modal__copy {
  padding: 0.35rem 0.75rem;
  border: none;
  border-radius: var(--radius-pill);
  background: var(--sage);
  color: var(--white);
  font-size: 0.8rem;
  font-weight: 600;
}

.modal__hint {
  font-size: 0.85rem;
  color: var(--text-soft);
  margin: 0 0 1rem;
  text-align: center;
}

.modal__btn {
  width: 100%;
}
</style>
