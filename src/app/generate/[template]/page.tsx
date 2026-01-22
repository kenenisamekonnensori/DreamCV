import { redirect } from "next/navigation";

export default function TemplateGenerateRedirect({ params }: { params: { template: string } }) {
  redirect(`/generate?template=${params.template}`);
}
