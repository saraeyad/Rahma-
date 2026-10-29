import { useCallback, useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [health, setHealth] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const checkHealth = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/health')
      if (!response.ok) {
        throw new Error(`The API returned HTTP ${response.status}`)
      }
      setHealth(await response.json())
    } catch (err) {
      setHealth(null)
      setError(err instanceof Error ? err.message : 'The API did not respond')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let ignore = false

    fetch('/health')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`The API returned HTTP ${response.status}`)
        }
        const body = await response.json()
        if (!ignore) {
          setHealth(body)
        }
      })
      .catch((err) => {
        if (!ignore) {
          setHealth(null)
          setError(err instanceof Error ? err.message : 'The API did not respond')
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  const status = loading ? 'Checking' : health?.status === 'ok' ? 'Up' : 'Down'

  return (
    <main className="screen">
      <p className="sprint">Sprint 0</p>
      <h1>Rahma</h1>
      <p className="lede">This screen calls the hospital API and shows whether it is running.</p>

      <section className="card" aria-live="polite">
        <div className="row">
          <span>GET /health</span>
          <strong className={status.toLowerCase()}>{status}</strong>
        </div>

        {health && <pre>{JSON.stringify(health, null, 2)}</pre>}
        {error && (
          <p className="error">
            {error}. From the server folder, run <code>npm run dev</code>, then check again.
          </p>
        )}

        <button type="button" onClick={checkHealth} disabled={loading}>
          Check again
        </button>
      </section>
    </main>
  )
}
