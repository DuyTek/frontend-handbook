import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils.js';
import { buttonVariants } from '@/components/ui/button.jsx';

export default function TopicsPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-32 px-8">
      <p className="text-5xl mb-6">🚧</p>
      <h1 className="text-3xl font-medium text-foreground mb-3">Đang xây dựng</h1>
      <p className="text-muted-foreground max-w-sm mb-8">
        Trang chủ đề đang được chuẩn bị. Vui lòng quay lại sau.
      </p>
      <Link to="/" className={cn(buttonVariants({ variant: 'outline' }), 'rounded-full no-underline')}>
        ← Về trang chủ
      </Link>
    </div>
  );
}
