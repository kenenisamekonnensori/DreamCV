import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function TemplateGenerateRedirect(
  { params }: { params: { template: string } }) 
  {
  redirect(`/generate?template=${params.template}`);
}
