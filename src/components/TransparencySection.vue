<script setup>
import { computed } from 'vue'
import { formatMoney, formatDate } from '../utils/format.js'

const props = defineProps({
  expenses: { type: Object, required: true },
})

const categoryMap = computed(() => {
  const map = {}
  for (const c of props.expenses.categories || []) {
    map[c.id] = c
  }
  return map
})

const spentByCategory = computed(() => {
  const totals = {}
  for (const entry of props.expenses.entries || []) {
    totals[entry.categoryId] = (totals[entry.categoryId] || 0) + entry.amount
  }
  return totals
})

const totalSpentEntries = computed(() =>
  (props.expenses.entries || []).reduce((sum, e) => sum + e.amount, 0),
)
</script>

<template>
  <section id="transparencia" class="section transparency">
    <div class="section__inner">
      <span class="section__eyebrow">Confianza</span>
      <h2 class="section__title">{{ expenses.title }}</h2>
      <p class="section__subtitle">{{ expenses.subtitle }}</p>

      <div class="transparency__summary card">
        <div class="transparency__stat">
          <span>Recibido</span>
          <strong>{{ formatMoney(expenses.summary.totalReceived, expenses.currency) }}</strong>
        </div>
        <div class="transparency__stat">
          <span>Gastado</span>
          <strong>{{ formatMoney(expenses.summary.totalSpent || totalSpentEntries, expenses.currency) }}</strong>
        </div>
        <div class="transparency__stat">
          <span>Saldo</span>
          <strong>{{
            formatMoney(
              expenses.summary.totalReceived - (expenses.summary.totalSpent || totalSpentEntries),
              expenses.currency,
            )
          }}</strong>
        </div>
      </div>

      <div class="transparency__categories">
        <div
          v-for="cat in expenses.categories"
          :key="cat.id"
          class="transparency__cat card"
        >
          <div class="transparency__cat-head">
            <span class="transparency__cat-icon" :style="{ background: cat.color }">{{ cat.icon }}</span>
            <div>
              <strong>{{ cat.name }}</strong>
              <span>~{{ cat.budgetPercent }}% del presupuesto</span>
            </div>
          </div>
          <div class="transparency__cat-bar">
            <div
              class="transparency__cat-fill"
              :style="{
                width: Math.min(100, ((spentByCategory[cat.id] || 0) / (totalSpentEntries || 1)) * 100) + '%',
                background: cat.color,
              }"
            />
          </div>
          <p class="transparency__cat-amount">
            {{ formatMoney(spentByCategory[cat.id] || 0, expenses.currency) }} gastados
          </p>
        </div>
      </div>

      <div class="transparency__table-wrap card">
        <h3 class="transparency__table-title">Detalle de gastos</h3>
        <table class="transparency__table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Concepto</th>
              <th>Categoría</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in expenses.entries" :key="entry.id">
              <td>{{ formatDate(entry.date) }}</td>
              <td>{{ entry.description }}</td>
              <td>
                <span class="transparency__pill" :style="{ background: categoryMap[entry.categoryId]?.color }">
                  {{ categoryMap[entry.categoryId]?.icon }}
                  {{ categoryMap[entry.categoryId]?.name }}
                </span>
              </td>
              <td class="transparency__amount">{{ formatMoney(entry.amount, expenses.currency) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-if="expenses.summary.note" class="transparency__note">{{ expenses.summary.note }}</p>
    </div>
  </section>
</template>

<style scoped>
.transparency {
  background: var(--white);
}

.transparency__summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.transparency__stat {
  text-align: center;
}

.transparency__stat span {
  display: block;
  font-size: 0.85rem;
  color: var(--text-soft);
  margin-bottom: 0.25rem;
}

.transparency__stat strong {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--text);
}

.transparency__categories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.transparency__cat {
  padding: 1.15rem;
}

.transparency__cat-head {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.75rem;
}

.transparency__cat-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.1rem;
}

.transparency__cat-head strong {
  display: block;
  font-size: 0.95rem;
}

.transparency__cat-head span {
  font-size: 0.8rem;
  color: var(--text-soft);
}

.transparency__cat-bar {
  height: 8px;
  background: var(--cream-dark);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.transparency__cat-fill {
  height: 100%;
  border-radius: var(--radius-pill);
  transition: width 0.6s ease;
}

.transparency__cat-amount {
  font-size: 0.85rem;
  color: var(--text-soft);
  margin: 0.5rem 0 0;
}

.transparency__table-wrap {
  padding: 1.25rem;
  overflow-x: auto;
}

.transparency__table-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  margin: 0 0 1rem;
}

.transparency__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.transparency__table th,
.transparency__table td {
  padding: 0.75rem 0.5rem;
  text-align: left;
  border-bottom: 1px solid var(--cream-dark);
}

.transparency__table th {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-soft);
}

.transparency__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
}

.transparency__amount {
  font-weight: 700;
  white-space: nowrap;
}

.transparency__note {
  font-size: 0.85rem;
  color: var(--text-soft);
  margin-top: 1rem;
  font-style: italic;
}

@media (max-width: 600px) {
  .transparency__summary {
    grid-template-columns: 1fr;
  }

  .transparency__table th:nth-child(3),
  .transparency__table td:nth-child(3) {
    display: none;
  }
}
</style>
