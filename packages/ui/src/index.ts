// Core UI Components
export * from './components/ui/accordion';
export * from './components/ui/alert-dialog';
export * from './components/ui/avatar';
export * from './components/ui/badge';
export * from './components/ui/button';
export * from './components/ui/card';
export * from './components/ui/checkbox';
export * from './components/ui/dialog';
export * from './components/ui/dropdown-menu';
export * from './components/ui/input';
export * from './components/ui/label';
export * from './components/ui/progress';
export * from './components/ui/select';
export * from './components/ui/separator';
export * from './components/ui/slider';
export * from './components/ui/switch';
export * from './components/ui/tabs';
export * from './components/ui/toast';
export * from './components/ui/toaster';
export * from './components/ui/tooltip';
export * from './components/ui/sonner';

// Layout Components
export { default as Layout } from './components/Layout';
export { default as Footer } from './components/Footer';

// Feature Components
export { default as SystemMonitor } from './components/SystemMonitor';
export { default as AuthModal } from './components/AuthModal';
export { default as CartModal } from './components/CartModal';
export { default as NexusAI } from './components/NexusAI';
export { default as InstallPrompt } from './components/InstallPrompt';
export { default as FPSCounter } from './components/FPSCounter';
export { default as ProductGrid } from './components/ProductGrid';
export { default as OptimizerPanel } from './components/OptimizerPanel';
export { default as ProKeyPanel } from './components/ProKeyPanel';
export { default as FPSOverlay } from './components/FPSOverlay';

// Optimization Components
export { default as GPUTweaks } from './components/optimization/GPUTweaks';
export { default as SystemTweaks } from './components/optimization/SystemTweaks';
export { default as PowerTweaks } from './components/optimization/PowerTweaks';

// Hooks
export * from './hooks/use-toast';

// Utilities
export * from './lib/utils';

// Styles
import './styles.css';