import { LayoutProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Github, Twitter } from 'lucide-react';

export function Footer({ className }: LayoutProps) {
  return (
    <footer className={cn('w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Generic App</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Building the future of web applications, one component at a time.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Features</li>
              <li>Pricing</li>
              <li>Documentation</li>
              <li>Changelog</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="mt-4 flex space-x-4">
              <Github className="h-5 w-5" />
              <Twitter className="h-5 w-5" />
            </div>
          </div>
        </div>
        
        <div className="mt-10 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Generic App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}