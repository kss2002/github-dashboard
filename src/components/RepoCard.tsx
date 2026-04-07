import type { GitHubRepo } from "@/lib/github";
import { getLanguageColor, getRelativeTime } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, GitFork } from "lucide-react";

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="flex flex-col h-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <CardTitle className="text-base truncate">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
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
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        {repo.description && (
          <CardDescription className="line-clamp-2 text-sm mt-1">
            {repo.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="mt-auto pt-0">
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
          <div className="flex flex-wrap gap-1 mt-2">
            {repo.topics.slice(0, 4).map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs px-1.5 py-0">
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
    </Card>
  );
}
