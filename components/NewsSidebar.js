import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function NewsSidebar({ news = [] }) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden w-full flex flex-col">
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold">News</h2>
      </div>
      <ScrollArea className="flex-grow" style={{ height: 'calc(3 * 9rem)' }}>
        <div className="p-4 space-y-4">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-medium line-clamp-2">{item.title}</CardTitle>
                <p className="text-xs text-gray-500">{item.date}</p>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-xs text-gray-700 line-clamp-3">{item.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}