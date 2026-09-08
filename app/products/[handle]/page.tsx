import { ProductPage } from "@/components/bodywedge-pages";
import { products } from "@/lib/catalog";
import { notFound } from "next/navigation";
export async function generateMetadata({params}: {params:Promise<{handle:string}>}) {
 const {handle}=await params;
 const product=products.find(p=>p.handle===handle);
 return {title:product?.title || "Product not found",description:"Explore The Body Wedge, choose your size and material, and continue to the official store."};
}
export default async function Page({params}: {params:Promise<{handle:string}>}) {
 const {handle}=await params;
 if(!products.some(p=>p.handle===handle))notFound();
 return <ProductPage key={handle} handle={handle}/>;
}
