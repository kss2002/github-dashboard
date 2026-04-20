import type { GitHubRepo } from '@/lib/github';
import { getLanguageColor, getRelativeTime } from '@/lib/constants';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitFork } from 'lucide-react';
import { MagicCard } from './ui/magic-card';

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="h-full border-none bg-transparent p-0 shadow-none ring-0">
      <MagicCard
        gradientColor="#D9D9D955"
        className="flex h-full flex-col rounded-xl p-0 transition-shadow hover:shadow-md"
      >
        <CardHeader className="pb-2 px-4 pt-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <CardTitle className="min-w-0 flex-1 text-base">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate hover:underline"
                >
                  {repo.name}
                </a>
              </CardTitle>
              {repo.fork && (
                <Badge variant="outline" className="shrink-0 text-xs gap-1">
                  <GitFork className="h-3 w-3" />
                  Fork
                </Badge>
              )}
            </div>
          </div>
          {repo.description && (
            <CardDescription className="mt-1 line-clamp-2 text-sm">
              {repo.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="mt-auto px-4 pt-0 pb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  />
                  {repo.language}
                </span>
              )}
            </div>
            <span>{getRelativeTime(repo.updated_at)}</span>
          </div>

          {repo.topics.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {repo.topics.slice(0, 4).map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="text-xs px-1.5 py-0"
                >
                  {topic}
                </Badge>
              ))}
              {repo.topics.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{repo.topics.length - 4}
                </span>
              )}
            </div>
          )}
        </CardContent>
      </MagicCard>
    </Card>
  );
}
