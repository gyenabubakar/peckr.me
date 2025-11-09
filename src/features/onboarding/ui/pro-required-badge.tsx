import { CrownIcon } from 'lucide-react';
import { Badge } from 'shadcn/badge';

export function ProRequiredBadge() {
  return (
    <div className="text-center mb-2">
      <Badge variant="secondary">
        <CrownIcon />
        Pro plan required
      </Badge>
    </div>
  );
}
