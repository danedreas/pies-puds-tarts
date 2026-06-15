import { redirect } from "next/navigation";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

/** Individual product pages replaced by the menu order flow */
export default async function ProductPage(_props: ProductPageProps) {
  redirect("/order");
}
