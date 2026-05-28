const steps = [
  {
    step: '01',
    title: 'HTML',
    subtitle: 'Cấu trúc trang web',
    desc: 'Tags, elements, semantic HTML, forms. Nền tảng của mọi trang web.',
    duration: '~2 tuần',
    emoji: '📄',
  },
  {
    step: '02',
    title: 'CSS',
    subtitle: 'Thiết kế & Layout',
    desc: 'Flexbox, Grid, responsive design, animations. Làm trang web đẹp trên mọi thiết bị.',
    duration: '~3 tuần',
    emoji: '🎨',
  },
  {
    step: '03',
    title: 'JavaScript',
    subtitle: 'Lập trình & Tương tác',
    desc: 'Variables, functions, DOM, events, async. Linh hồn của mọi ứng dụng web.',
    duration: '~4 tuần',
    emoji: '⚡',
  },
  {
    step: '04',
    title: 'React',
    subtitle: 'UI Framework',
    desc: 'Components, hooks, state, props, routing. Xây dựng ứng dụng quy mô lớn.',
    duration: '~4 tuần',
    emoji: '⚛️',
  },
  {
    step: '05',
    title: 'TypeScript',
    subtitle: 'Type-safe Development',
    desc: 'Types, interfaces, generics. Code sạch hơn, ít lỗi hơn, dễ maintain hơn.',
    duration: '~2 tuần',
    emoji: '🔷',
  },
];

export default function LearningPathSection() {
  return (
    <section id="lo-trinh" className="py-24 max-[1024px]:py-16">
      <div className="max-w-[1126px] mx-auto px-8 max-[1024px]:px-5">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Lộ trình học tập
          </p>
          <h2 className="text-4xl max-[1024px]:text-3xl font-medium tracking-tight text-foreground max-w-md">
            5 bước đến Frontend Engineer
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Đi từ người mới bắt đầu đến có thể xin việc trong khoảng 15 tuần.
          </p>
        </div>

        <ol
          className="relative flex flex-col gap-0 list-none p-0 m-0 pl-10"
          style={{ borderLeft: '2px dashed oklch(0.85 0 0)' }}
        >
          {steps.map((s, i) => (
            <li key={s.step} className="relative pb-10 last:pb-0">
              <div
                className="absolute -left-[45px] flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold top-1"
              >
                {i + 1}
              </div>

              <div className="flex items-start justify-between gap-4 max-[768px]:flex-col max-[768px]:gap-2">
                <div className="flex gap-4 items-start">
                  <span className="text-2xl leading-none mt-0.5">{s.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-medium text-foreground">{s.title}</h3>
                      <span className="text-sm text-muted-foreground">— {s.subtitle}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{s.desc}</p>
                  </div>
                </div>
                <span
                  className="shrink-0 text-xs font-mono rounded-full px-3 py-1"
                  style={{ background: 'var(--code-bg)', color: 'var(--muted-foreground)' }}
                >
                  {s.duration}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
