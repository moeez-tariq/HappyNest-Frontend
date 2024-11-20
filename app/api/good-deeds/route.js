export async function GET(req) {
    try {
      const response = await fetch('http://localhost:8000/api/good-deeds/');
      const data = await response.json();
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Failed to fetch good deeds:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch good deeds' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  
  export async function POST(req) {
    try {
      const deedData = await req.json();
      
      const response = await fetch('http://localhost:8000/api/good-deeds/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deedData),
      });
  
      const result = await response.json();
  
      return new Response(JSON.stringify(result), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Failed to create good deed:', error);
      return new Response(JSON.stringify({ error: 'Failed to create good deed' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }