import { Card, CardContent } from '@/components/ui/card.jsx';

const features = [
  {
    emoji: '🏗️',
    title: 'Nền tảng vững chắc',
    body: 'HTML & CSS — ngôn ngữ xây dựng mọi trang web. Học cách tạo layout, style và responsive design.',
    bg: 'oklch(0.96 0.03 291)',
    bgDark: 'oklch(0.22 0.04 291)',
  },
  {
    emoji: '⚡',
    title: 'Lập trình tương tác',
    body: 'JavaScript hiện đại: DOM, event, async/await, fetch API. Làm cho trang web "sống".',
    bg: 'oklch(0.97 0.05 90)',
    bgDark: 'oklch(0.22 0.02 90)',
  },
  {
    emoji: '⚛️',
    title: 'Framework thực chiến',
    body: 'React — thư viện UI phổ biến nhất thế giới. Component, hooks, state management.',
    bg: 'oklch(0.96 0.04 160)',
    bgDark: 'oklch(0.22 0.03 160)',
  },
  {
    emoji: '🔒',
    title: 'Code chuyên nghiệp',
    body: 'TypeScript, Git, quy trình làm việc nhóm. Kỹ năng mà công ty thực sự cần.',
    bg: 'oklch(0.96 0.03 340)',
    bgDark: 'oklch(0.22 0.03 340)',
  },
];

export default function FeaturesSection() {
  return (
    <section id="chu-de" className="py-24 max-[1024px]:py-16">
      <div className="max-w-[1126px] mx-auto px-8 max-[1024px]:px-5">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Tại sao chọn chúng tôi
          </p>
          <h2 className="text-4xl max-[1024px]:text-3xl font-medium tracking-tight text-foreground max-w-md">
            Bạn sẽ học được gì?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Từ những khái niệm cơ bản đến kỹ năng thực chiến mà nhà tuyển dụng tìm kiếm.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 max-[768px]:grid-cols-1">
          {features.map((f) => (
            <Card
              key={f.title}
              className="border-0 rounded-[28px] overflow-hidden"
              style={{ background: `light-dark(${f.bg}, ${f.bgDark})` }}
            >
              <CardContent className="p-8">
                <div className="text-4xl mb-5">{f.emoji}</div>
                <h3 className="text-xl font-medium text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
