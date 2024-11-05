export async function POST(req) {
  try {
    // Parse the request body to extract lat/lon (we're not using them for now)
    const { lat, lon } = await req.json();

    // Mock news data
    const mockNews = [
      { title: 'Incredible Rescue of Stranded Hikers', url: 'https://example.com/story1' },
      { title: 'Local Community Comes Together to Clean Up Park', url: 'https://example.com/story2' },
      { title: 'Uplifting Stories from the Pandemic', url: 'https://example.com/story3' },
      { title: 'Kind Stranger Pays for Family’s Groceries', url: 'https://example.com/story4' },
      { title: 'New Library Opens in Town', url: 'https://example.com/story5' },
      { title: 'Local Teen Wins National Science Competition', url: 'https://example.com/story6' },
      { title: 'Firefighters Rescue Cat from Tree', url: 'https://example.com/story7' },
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