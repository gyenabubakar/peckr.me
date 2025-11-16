import { LinkIcon } from 'lucide-react';
import { Button } from 'shadcn/button';

export function EmptyState() {
  return (
    <div className="border border-border rounded-md py-28">
      <div className="text-center  w-2/5 mx-auto">
        <img
          src="/illustrations/undraw_link-shortener.png"
          alt="link shortener"
          aria-hidden
          className="w-48 mx-auto"
        />

        <h4 className="text-lg font-semibold mb-2">No links yet</h4>
        <p className="text-muted-foreground">
          Create short links to share anywhere. Track clicks, analyze your audience with geo and
          device insights, and measure real conversions.
        </p>

        <Button className="mt-5">
          <LinkIcon />
          Create link
        </Button>
      </div>
    </div>
  );
}
