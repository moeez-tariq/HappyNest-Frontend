const API_ROUTE = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req) {
    try {
      // Extract lat and lon from query parameters
      const { searchParams } = new URL(req.url)
      const lat = searchParams.get('lat')
      const lon = searchParams.get('lon')
  
      // Ensure lat and lon are provided
      if (!lat || !lon) {
        return new Response(JSON.stringify({ error: 'Latitude and longitude are required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
  
      // Make request to Python backend
      const response = await fetch(`${API_ROUTE}/api/news/fetch?lat=${lat}&lon=${lon}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Failed to fetch news:', error)
      return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }