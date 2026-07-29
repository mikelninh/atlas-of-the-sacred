import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dispatches } from "@/content/dispatches";
import { DispatchArticle } from "@/components/dispatch/DispatchArticle";
import { getDispatch } from "@/lib/dispatches";

export function generateStaticParams() {
  return Object.values(dispatches).map((dispatch) => ({ slug: dispatch.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dispatch = getDispatch(slug);
  return dispatch ? { title: dispatch.title, description: dispatch.dek } : {};
}

export default async function DispatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dispatch = getDispatch(slug);
  if (!dispatch) notFound();
  return <DispatchArticle dispatch={dispatch} />;
}
