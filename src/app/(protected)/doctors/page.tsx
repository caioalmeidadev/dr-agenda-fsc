import { Plus } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function DoctorsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Médicos</PageTitle>
          <PageDescription>Gerencie os médicos da sua clínica</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button>
            <Plus className="h-4 w-4" />
            Adicionar Médico
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>Médicos</PageContent>
    </PageContainer>
  );
}
