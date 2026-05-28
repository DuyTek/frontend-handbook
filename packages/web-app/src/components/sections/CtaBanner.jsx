import { cn } from '@/lib/utils.js';
import { buttonVariants } from '@/components/ui/button.jsx';

export default function CtaBanner() {
  return (
    <section className="py-24 max-[1024px]:py-16">
      <div className="max-w-[1126px] mx-auto px-8 max-[1024px]:px-5">
        <div
          className="rounded-[32px] px-12 py-16 text-center max-[768px]:rounded-2xl max-[768px]:px-6 max-[768px]:py-12"
          style={{ background: 'oklch(0.145 0 0)' }}
        >
          <h2
            className="text-4xl max-[1024px]:text-3xl font-medium tracking-tight mb-4"
            style={{ color: 'oklch(0.985 0 0)' }}
          >
            Sẵn sàng bắt đầu hành trình?
          </h2>
          <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'oklch(0.985 0 0 / 60%)' }}>
            Tham gia ngay hôm nay — hoàn toàn miễn phí, không cần đăng ký.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#lo-trinh"
              className={cn(buttonVariants({ size: 'lg' }), 'rounded-full no-underline')}
              style={{ background: 'oklch(0.985 0 0)', color: 'oklch(0.145 0 0)' }}
            >
              Bắt đầu học ngay
            </a>
            <a
              href="#lo-trinh"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full no-underline')}
              style={{
                background: 'transparent',
                color: 'oklch(0.985 0 0)',
                borderColor: 'oklch(0.985 0 0 / 30%)',
              }}
            >
              Xem lộ trình
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
