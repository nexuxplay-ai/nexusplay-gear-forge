import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground bg-gradient-primary bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              NexusPlay.io
            </h3>
            <p className="text-muted-foreground text-sm">
              The ultimate gaming optimization and gear platform. Unleash your potential.
            </p>
            <p className="text-muted-foreground text-sm">
              Olamidepeniel@gmail.com
            </p>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Platform</h4>
            <div className="space-y-2">
              <a href="/optimizer" className="block text-muted-foreground hover:text-foreground transition-colors">
                Game Optimizer
              </a>
              <a href="/upgrade" className="block text-muted-foreground hover:text-foreground transition-colors">
                Premium Features
              </a>
              <a href="/gear" className="block text-muted-foreground hover:text-foreground transition-colors">
                Gaming Store
              </a>
              <a href="/cart" className="block text-muted-foreground hover:text-foreground transition-colors">
                Shopping Cart
              </a>
            </div>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <div className="space-y-2">
              <a href="/docs" className="block text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="/community" className="block text-muted-foreground hover:text-foreground transition-colors">
                Community
              </a>
              <a href="/help" className="block text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </a>
              <a href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              Join our community of gamers and optimization enthusiasts.
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 NexusPlay.io. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}