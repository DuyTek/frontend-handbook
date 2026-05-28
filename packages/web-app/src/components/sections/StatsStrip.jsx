const stats = [
  { number: '5', label: 'Chủ đề học' },
  { number: '50+', label: 'Bài học thực tiễn' },
  { number: '100%', label: 'Miễn phí' },
  { number: '0', label: 'Yêu cầu nền tảng' },
];

export default function StatsStrip() {
  return (
    <section className="border-y">
      <div className="max-w-[1126px] mx-auto px-8 max-[1024px]:px-5 py-10">
        <div className="grid grid-cols-4 max-[768px]:grid-cols-2">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center py-4 text-center ${i > 0 ? 'border-l max-[768px]:border-l-0' : ''} ${i === 2 ? 'max-[768px]:border-l' : ''}`}
            >
              <span className="text-4xl font-medium tracking-tight text-foreground leading-none">
                {stat.number}
              </span>
              <span className="mt-1.5 text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
