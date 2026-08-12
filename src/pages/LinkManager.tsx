import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { Archive, Copy, ExternalLink, LogOut, Pause, Play, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { getPortfolioUrl } from "@/types/portfolio";

interface ManagedPublication {
  id: string;
  applicationId: string;
  companyName: string;
  roleTitle: string;
  slug: string;
  status: string;
  revisionNo: number | null;
  updatedAt: string;
  noindex: boolean;
}

const LinkManager = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousRobotsContent = existingRobots?.getAttribute("content") ?? null;
    document.title = "포트폴리오 링크 관리";
    const robots = existingRobots ?? document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    if (!robots.parentNode) document.head.appendChild(robots);

    let unsubscribe: (() => void) | undefined;
    if (supabase) {
      supabase.auth.getSession().then(({ data }) => setSession(data.session));
      const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
        setSession(nextSession);
      });
      unsubscribe = () => subscription.subscription.unsubscribe();
    }

    return () => {
      unsubscribe?.();
      document.title = previousTitle;
      if (existingRobots) {
        if (previousRobotsContent === null) existingRobots.removeAttribute("content");
        else existingRobots.content = previousRobotsContent;
      } else {
        robots.remove();
      }
    };
  }, []);

  const publicationsQuery = useQuery({
    queryKey: ["managed-publications", session?.user.id],
    enabled: Boolean(supabase && session?.user.id),
    queryFn: async (): Promise<ManagedPublication[]> => {
      if (!supabase || !session) return [];

      const { data: applications, error: applicationsError } = await supabase
        .from("applications")
        .select("id, company_name, role_title")
        .eq("owner_id", session.user.id)
        .order("updated_at", { ascending: false });

      if (applicationsError) throw applicationsError;
      if (!applications.length) return [];

      const applicationIds = applications.map((application) => application.id);
      const applicationMap = new Map(applications.map((application) => [application.id, application]));

      const { data: publications, error: publicationsError } = await supabase
        .from("portfolio_publications")
        .select("id, application_id, current_revision_id, slug, status, noindex, updated_at")
        .in("application_id", applicationIds)
        .order("updated_at", { ascending: false });

      if (publicationsError) throw publicationsError;

      const revisionIds = publications
        .map((publication) => publication.current_revision_id)
        .filter((id): id is string => Boolean(id));

      const revisionMap = new Map<string, number>();
      if (revisionIds.length) {
        const { data: revisions, error: revisionsError } = await supabase
          .from("portfolio_revisions")
          .select("id, revision_no")
          .in("id", revisionIds);

        if (revisionsError) throw revisionsError;
        revisions.forEach((revision) => revisionMap.set(revision.id, revision.revision_no));
      }

      return publications.map((publication) => {
        const application = applicationMap.get(publication.application_id);
        return {
          id: publication.id,
          applicationId: publication.application_id,
          companyName: application?.company_name ?? "회사 미지정",
          roleTitle: application?.role_title ?? "직무 미지정",
          slug: publication.slug,
          status: publication.status,
          revisionNo: publication.current_revision_id
            ? revisionMap.get(publication.current_revision_id) ?? null
            : null,
          updatedAt: publication.updated_at,
          noindex: publication.noindex,
        };
      });
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "published" | "paused" | "archived" }) => {
      if (!supabase) throw new Error("Supabase가 설정되지 않았습니다.");
      const { error } = await supabase.from("portfolio_publications").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["managed-publications"] }),
  });

  const sortedPublications = useMemo(() => publicationsQuery.data ?? [], [publicationsQuery.data]);

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase || !email.trim()) return;

    setAuthMessage("");
    const redirectUrl = new URL("/admin/links", window.location.origin).href;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: redirectUrl,
        shouldCreateUser: false,
      },
    });

    setAuthMessage(error ? error.message : "로그인 링크를 이메일로 보냈습니다.");
  };

  if (!isSupabaseConfigured) {
    return <div className="p-8">Supabase 환경 설정이 필요합니다.</div>;
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6">
        <form onSubmit={handleSignIn} className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm font-semibold text-primary">PRIVATE ADMIN</p>
          <h1 className="mt-2 text-3xl font-extrabold">포트폴리오 링크 관리</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            소유자 이메일로 받은 로그인 링크를 사용합니다. 이 화면은 검색엔진에 노출되지 않습니다.
          </p>
          <Input
            className="mt-7"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="owner@example.com"
            aria-label="소유자 이메일"
            required
          />
          <Button className="mt-3 w-full" type="submit">로그인 링크 받기</Button>
          {authMessage && <p className="mt-4 text-sm text-muted-foreground">{authMessage}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 px-5 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">PORTFOLIO ADMIN</p>
            <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">지원 링크 관리</h1>
            <p className="mt-2 text-muted-foreground">같은 지원 건은 링크를 유지하고 revision만 갱신합니다.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => publicationsQuery.refetch()}>
              <RefreshCw className="mr-2 h-4 w-4" /> 새로고침
            </Button>
            <Button variant="outline" onClick={() => supabase?.auth.signOut()}>
              <LogOut className="mr-2 h-4 w-4" /> 로그아웃
            </Button>
          </div>
        </header>

        {publicationsQuery.isLoading && <p className="mt-10 text-muted-foreground">링크를 불러오는 중입니다.</p>}
        {publicationsQuery.isError && <p className="mt-10 text-destructive">링크를 불러오지 못했습니다.</p>}

        {!publicationsQuery.isLoading && sortedPublications.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
            <h2 className="text-xl font-bold">아직 발행된 지원 링크가 없습니다</h2>
            <p className="mt-2 text-muted-foreground">첫 JD 맞춤 포트폴리오가 생성되면 이곳에 표시됩니다.</p>
          </div>
        )}

        <section className="mt-10 grid gap-4">
          {sortedPublications.map((publication) => {
            const publicUrl = getPortfolioUrl(publication.slug);
            return (
              <article key={publication.id} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold">{publication.companyName}</h2>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{publication.status}</span>
                      {publication.noindex && <span className="rounded-full bg-muted px-3 py-1 text-xs">noindex</span>}
                    </div>
                    <p className="mt-1 text-muted-foreground">{publication.roleTitle}</p>
                    <p className="mt-4 break-all font-mono text-xs text-muted-foreground">{publicUrl}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      revision {publication.revisionNo ?? "-"} · {new Date(publication.updatedAt).toLocaleString("ko-KR")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={() => navigator.clipboard.writeText(publicUrl)}>
                      <Copy className="mr-2 h-4 w-4" /> 링크 복사
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={publicUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> 미리보기
                      </a>
                    </Button>
                    {publication.status === "published" ? (
                      <Button variant="outline" onClick={() => statusMutation.mutate({ id: publication.id, status: "paused" })}>
                        <Pause className="mr-2 h-4 w-4" /> 일시 중지
                      </Button>
                    ) : publication.revisionNo ? (
                      <Button variant="outline" onClick={() => statusMutation.mutate({ id: publication.id, status: "published" })}>
                        <Play className="mr-2 h-4 w-4" /> 재발행
                      </Button>
                    ) : null}
                    <Button variant="outline" onClick={() => statusMutation.mutate({ id: publication.id, status: "archived" })}>
                      <Archive className="mr-2 h-4 w-4" /> 보관
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default LinkManager;
