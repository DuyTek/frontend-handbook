import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';

const topics = [
  { emoji: '📄', name: 'HTML', desc: 'Cấu trúc & Semantic', lessons: 12, color: 'oklch(0.97 0.05 90)' },
  { emoji: '🎨', name: 'CSS', desc: 'Style & Layout', lessons: 18, color: 'oklch(0.96 0.04 160)' },
  { emoji: '⚡', name: 'JavaScript', desc: 'Logic & Tương tác', lessons: 24, color: 'oklch(0.96 0.03 291)' },
  { emoji: '⚛️', name: 'React', desc: 'Component UI', lessons: 20, color: 'oklch(0.96 0.03 340)' },
  { emoji: '🔷', name: 'TypeScript', desc: 'Type Safety', lessons: 10, color: 'oklch(0.96 0.02 240)' },
];

export default function TopicsPreview() {
  return (
    <section id="thuc-hanh" className="py-24 max-[1024px]:py-16 bg-muted/40">
      <div className="max-w-[1126px] mx-auto px-8 max-[1024px]:px-5">
        <div className="flex items-end justify-between mb-12 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Khám phá
            </p>
            <h2 className="text-4xl max-[1024px]:text-3xl font-medium tracking-tight text-foreground">
              Các chủ đề học tập
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg">
              Mỗi chủ đề bao gồm bài giảng, ví dụ thực tiễn và bài tập luyện tập.
            </p>
          </div>
          <Link to="/topics" className="text-sm text-primary font-medium no-underline shrink-0">
            Xem tất cả →
          </Link>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {topics.map((topic) => (
            <Card
              key={topic.name}
              className="border rounded-2xl cursor-pointer transition-shadow hover:shadow-md"
            >
              <CardContent className="p-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: topic.color }}
                >
                  {topic.emoji}
                </div>
                <h3 className="font-medium text-foreground mb-1">{topic.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{topic.desc}</p>
                <Badge variant="secondary" className="text-xs rounded-full">
                  {topic.lessons} bài học
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
