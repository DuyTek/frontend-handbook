import { Link } from 'react-router-dom';

const learnLinks = [
  { label: 'Lộ trình', href: '#lo-trinh' },
  { label: 'Chủ đề', href: '#chu-de' },
  { label: 'Thực hành', href: '#thuc-hanh' },
];

const aboutLinks = [
  { label: 'Giới thiệu', href: '#gioi-thieu' },
  { label: 'Liên hệ', href: '#lien-he' },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-[1126px] mx-auto px-8 max-[1024px]:px-5">
        <div className="grid grid-cols-[1fr_2fr] gap-16 pt-16 pb-10 max-[768px]:grid-cols-1 max-[768px]:gap-8">
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 font-semibold no-underline" style={{ color: 'oklch(0.985 0 0)' }}>
              <img src="/favicon.svg" alt="" width={24} height={24} style={{ filter: 'brightness(10)' }} />
              <span>Frontend Handbook</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.985 0 0 / 60%)' }}>
              Học lập trình web theo lộ trình rõ ràng, miễn phí.
            </p>
          </div>

          <div className="flex gap-12 max-[480px]:flex-col max-[480px]:gap-8">
            <div className="flex flex-col gap-3">
              <strong className="text-sm font-medium" style={{ color: 'oklch(0.985 0 0)' }}>Học tập</strong>
              {learnLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm no-underline transition-opacity hover:opacity-100"
                  style={{ color: 'oklch(0.985 0 0 / 60%)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <strong className="text-sm font-medium" style={{ color: 'oklch(0.985 0 0)' }}>Về chúng tôi</strong>
              {aboutLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm no-underline transition-opacity hover:opacity-100"
                  style={{ color: 'oklch(0.985 0 0 / 60%)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-6 text-xs" style={{ borderTop: '1px solid oklch(0.985 0 0 / 10%)', color: 'oklch(0.985 0 0 / 40%)' }}>
          © 2026 Frontend Handbook. Miễn phí, mã nguồn mở.
        </div>
      </div>
    </footer>
  );
}
