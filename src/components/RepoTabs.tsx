import type { GitHubRepo } from '@/lib/github';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RepoCard } from './RepoCard';
import { BookMarked, Star } from 'lucide-react';

interface RepoTabsProps {
  repos: GitHubRepo[];
  starred: GitHubRepo[];
}

export function RepoTabs({ repos, starred }: RepoTabsProps) {
  return (
    <Tabs defaultValue="repos" className="w-full">
      <TabsList>
        <TabsTrigger value="repos">
          <BookMarked />
          레포지토리 ({repos.length})
        </TabsTrigger>
        <TabsTrigger value="starred">
          <Star />
          스타 ({starred.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="repos" className="mt-4">
        {repos.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            검색 결과가 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="starred" className="mt-4">
        {starred.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            검색 결과가 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {starred.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
