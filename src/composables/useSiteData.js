import { ref, onMounted } from 'vue'

async function fetchJson(path) {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`No se pudo cargar ${path}`)
  return res.json()
}

export function useSiteData() {
  const site = ref(null)
  const instagram = ref(null)
  const expenses = ref(null)
  const payment = ref(null)
  const acknowledgments = ref(null)
  const loading = ref(true)
  const error = ref(null)

  onMounted(async () => {
    try {
      const [siteData, instagramData, expensesData, paymentData, acknowledgmentsData] = await Promise.all([
        fetchJson('/data/site.json'),
        fetchJson('/data/instagram.json'),
        fetchJson('/data/expenses.json'),
        fetchJson('/data/payment.json'),
        fetchJson('/data/acknowledgments.json'),
      ])
      site.value = siteData
      instagram.value = instagramData
      expenses.value = expensesData
      payment.value = paymentData
      acknowledgments.value = acknowledgmentsData

      if (siteData.meta?.title) {
        document.title = siteData.meta.title
      }
      if (siteData.meta?.description) {
        let meta = document.querySelector('meta[name="description"]')
        if (!meta) {
          meta = document.createElement('meta')
          meta.name = 'description'
          document.head.appendChild(meta)
        }
        meta.content = siteData.meta.description
      }
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  })

  return { site, instagram, expenses, payment, acknowledgments, loading, error }
}
