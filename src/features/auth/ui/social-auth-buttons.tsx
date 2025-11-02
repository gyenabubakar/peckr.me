import { Button } from 'shadcn/button';
import { Separator } from 'shadcn/separator';

export function SocialAuthButtons() {
  return (
    <div className="space-y-8 mt-8">
      <div className="relative flex items-center justify-center">
        <Separator className="w-full" />
        <span className="text-sm font-medium text-muted-foreground absolute left-1/2 -translate-x-1/2 bg-white px-2">
          OR
        </span>
      </div>

      <Button variant="outline" className="w-full">
        <img src="/icons/google.svg" alt="" aria-hidden className="size-4" />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
}
