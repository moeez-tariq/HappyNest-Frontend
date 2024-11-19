import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function NewsFeed({ newsItems }) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="border-b p-4">
        <h2 className="text-2xl font-bold">News</h2>
      </div>
      <div className="bg-gray-50 p-4">
        {newsItems.map((item) => (
          <Card key={item.id} className="mb-4">
            <CardHeader>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.date}</p>
            </CardHeader>
            <CardContent>
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-48 object-cover rounded-lg mb-4" 
              />
              <p>{item.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}