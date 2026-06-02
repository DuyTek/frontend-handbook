import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { cn } from '@/lib/utils.js';
import { buttonVariants } from '@/components/ui/button.jsx';

const navLinks = [
  { label: 'Lộ trình', href: '#lo-trinh' },
  { label: 'Chủ đề', href: '#chu-de' },
  { label: 'Thực hành', href: '#thuc-hanh' },
];

const routeLinks = [{ label: 'Giám sát', to: '/dashboard' }];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Chuyển chế độ tối/sáng"
      className="rounded-full relative"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[1126px] mx-auto px-8 max-[1024px]:px-5">
        <div className="flex h-16 items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 font-semibold text-foreground no-underline shrink-0">
            <img src="/favicon.svg" alt="" width={28} height={28} />
            <span>Frontend Handbook</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-auto" aria-label="Điều hướng chính">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
              >
                {link.label}
              </a>
            ))}
            {routeLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 ml-auto md:ml-0">
            <ThemeToggle />
            <a
              href="#bat-dau"
              className={cn(buttonVariants({ size: 'sm' }), 'rounded-full no-underline')}
            >
              Bắt đầu học
            </a>
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Mở menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t py-4 flex flex-col gap-3" aria-label="Menu di động">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {routeLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#bat-dau"
              className={cn(buttonVariants({ size: 'sm' }), 'rounded-full no-underline w-fit mt-2')}
              onClick={() => setMobileOpen(false)}
            >
              Bắt đầu học
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
