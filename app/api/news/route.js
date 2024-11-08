export async function POST(req) {
  try {
    // Parse the request body to extract lat/lon (we're not using them for now)
    const { lat, lon } = await req.json();

    // Mock news data
    const mockNews = [
        {
            "title": "Incredible Rescue of Stranded Hikers",
            "content": "Read the full story at https://example.com/story1",
            "location": {
              "city": "Unknown",
              "state": "Unknown",
              "country": "USA"
            },
            "source": "Local News",
            "sentiment": "positive"
          },
          {
            "title": "Local Community Comes Together to Clean Up Park",
            "content": "Read the full story at https://example.com/story2",
            "location": {
              "city": "Unknown",
              "state": "Unknown",
              "country": "USA"
            },
            "source": "Local News",
            "sentiment": "positive"
          },
          {
            "title": "Uplifting Stories from the Pandemic",
            "content": "Read the full story at https://example.com/story3",
            "location": {
              "city": "Unknown",
              "state": "Unknown",
              "country": "USA"
            },
            "source": "Local News",
            "sentiment": "positive"
          },
          {
            "title": "Kind Stranger Pays for Family’s Groceries",
            "content": "Read the full story at https://example.com/story4",
            "location": {
              "city": "Unknown",
              "state": "Unknown",
              "country": "USA"
            },
            "source": "Local News",
            "sentiment": "positive"
          },
          {
            "title": "New Library Opens in Town",
            "content": "Read the full story at https://example.com/story5",
            "location": {
              "city": "Unknown",
              "state": "Unknown",
              "country": "USA"
            },
            "source": "Local News",
            "sentiment": "neutral"
          },
          {
            "title": "Local Teen Wins National Science Competition",
            "content": "Read the full story at https://example.com/story6",
            "location": {
              "city": "Unknown",
              "state": "Unknown",
              "country": "USA"
            },
            "source": "Local News",
            "sentiment": "positive"
          },
          {
            "title": "Firefighters Rescue Cat from Tree",
            "content": "Read the full story at https://example.com/story7",
            "location": {
              "city": "Unknown",
              "state": "Unknown",
              "country": "USA"
            },
            "source": "Local News",
            "sentiment": "positive"
          }
    ];

    // Respond with mock news data
    return new Response(JSON.stringify(mockNews), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}