import { cn } from '@/lib/utils.js';
import { buttonVariants } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';

const codeSnippet = `<!-- Trang web đầu tiên của bạn -->
<!DOCTYPE html>
<html lang="vi">
  <head>
    <title>Xin chào thế giới!</title>
  </head>
  <body>
    <h1>Xin chào, Frontend!</h1>
    <p>Hành trình bắt đầu từ đây.</p>
  </body>
</html>`;

export default function HeroSection() {
  return (
    <section id="bat-dau" className="py-24 max-[1024px]:py-16">
      <div className="max-w-[1126px] mx-auto px-8 max-[1024px]:px-5">
        <div className="grid grid-cols-2 gap-16 items-center max-[1024px]:grid-cols-1 max-[1024px]:gap-10">
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit rounded-full px-4 py-1.5 text-sm font-medium bg-accent text-accent-foreground">
              ✦ Hoàn toàn miễn phí
            </Badge>

            <h1 className="text-foreground">
              Trở thành<br />
              <span className="text-primary">Frontend Engineer</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Học HTML, CSS, JavaScript và React theo lộ trình thực chiến.
              Không cần nền tảng trước, chỉ cần bắt đầu.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#lo-trinh"
                className={cn(buttonVariants({ size: 'lg' }), 'rounded-full no-underline')}
              >
                Bắt đầu học ngay →
              </a>
              <a
                href="#lo-trinh"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full no-underline')}
              >
                Xem lộ trình
              </a>
            </div>
          </div>

          <div
            className="rounded-2xl p-6 font-mono text-sm leading-relaxed overflow-x-auto"
            style={{ background: 'var(--code-bg)' }}
          >
            <pre className="text-foreground whitespace-pre">{codeSnippet}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
