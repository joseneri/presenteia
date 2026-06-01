import { NextResponse } from "next/server";
import { products } from "@/data/products";

type RouteContext = {
  params: Promise<{ productId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { productId } = await context.params;
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.info("affiliate_click", {
    productId: product.id,
    title: product.title,
    at: new Date().toISOString(),
    referrer: request.headers.get("referer")
  });

  return NextResponse.redirect(product.amazonUrl);
}
