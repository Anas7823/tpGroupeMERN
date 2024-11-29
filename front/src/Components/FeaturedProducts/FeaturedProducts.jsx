import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/lib/data";

export function FeaturedProducts() {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Meilleurs plats de la semaine</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-xl font-bold mt-4">{product.price.toFixed(2)} €</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
