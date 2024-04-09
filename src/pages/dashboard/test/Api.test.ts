import { test } from 'vitest'
import { fetchActivities } from '../components/Api'
import { mockData } from './Mocks'


describe('fetchActivities', () => {
    
    test('fetches activities successfully', async () => {
        // Sobrescribe globalmente la función fetch
        globalThis.fetch = () =>
            Promise.resolve(
                new Response(JSON.stringify(mockData), { status: 200, statusText: 'OK' })
            )

        const activities = await fetchActivities()
        expect(activities).toEqual(mockData)
    })
    
    test('handles unexpected response', async () => {
        // Sobrescribe globalmente la función fetch para devolver una respuesta inesperada
        globalThis.fetch = () =>
            Promise.resolve(
                new Response(JSON.stringify({ message: 'Not Found' }), { status: 404, statusText: 'Not Found' })
            )

        const activities = await fetchActivities()
        expect(activities).toEqual([])
    })
    
    test('handles server error', async () => {
        // Sobrescribe globalmente la función fetch para devolver un error 500
        globalThis.fetch = () =>
          Promise.resolve(
            new Response('Internal Server Error', { status: 500, statusText: 'Internal Server Error' })
          )
      
        try {
          await fetchActivities()
        } catch (err) {
          expect(err).toEqual(new Error('Network response was not ok'))
        }
      })
})
