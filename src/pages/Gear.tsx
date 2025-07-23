import ProductGrid from "@/components/ProductGrid";

export default function Gear() {
  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Gaming <span className="bg-gradient-primary bg-clip-text text-transparent">Gear Store</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover premium gaming peripherals and hardware to enhance your performance.
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid />
      </div>
    </div>
  );
}