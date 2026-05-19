<script setup>
defineProps({
  brand: { type: Object, required: true },
})
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <a href="#" class="header__brand">
        <span class="header__icon" aria-hidden="true">🐱</span>
        <span class="header__name">{{ brand.name }}</span>
      </a>
      <nav class="header__nav" aria-label="Secciones">
        <a href="#historia">Historia</a>
        <a href="#instagram">Instagram</a>
        <a href="#transparencia">Transparencia</a>
        <a href="#agradecimientos">Agradecimientos</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(250, 246, 241, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--cream-dark);
}

.header__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text);
}

.header__icon {
  font-size: 1.35rem;
}

.header__name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
}

.header__nav {
  display: flex;
  gap: 1.25rem;
}

.header__nav a {
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-soft);
  transition: color 0.2s;
}

.header__nav a:hover {
  color: var(--blush-deep);
}

@media (max-width: 520px) {
  .header__nav {
    gap: 0.75rem;
  }

  .header__nav a {
    font-size: 0.8rem;
  }
}
</style>
