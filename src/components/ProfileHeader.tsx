import type { GitHubUser } from '@/lib/github';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ProfileHeaderProps {
  user: GitHubUser;
  repoCount: number;
  starredCount: number;
}

export function ProfileHeader({
  user,
  repoCount,
  starredCount,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 sm:flex-row sm:items-start sm:gap-6">
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
          <AvatarImage src={user.avatar_url} alt={user.login} />
          <AvatarFallback>
            {user.login.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </a>

      <div className="flex flex-col items-center gap-2 sm:items-start">
        <div className="flex items-center gap-3">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-semibold tracking-tight text-foreground hover:underline"
          >
            {user.name ?? user.login}
          </a>
          <span className="text-sm text-muted-foreground">@{user.login}</span>
        </div>

        {user.bio && (
          <p className="max-w-md text-sm text-muted-foreground">{user.bio}</p>
        )}

        <div className="flex flex-wrap gap-2 mt-1">
          <div className="flex items-center gap-1 bg-gray-100 rounded-md px-2 py-1">
            <Badge className="font-tossface">📦 Repositories</Badge>
            <p>{repoCount}</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-md px-2 py-1">
            <Badge className="font-tossface">⭐ Starred</Badge>
            <p>{starredCount}</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-md px-2 py-1">
            <Badge className="font-tossface">👥 Followers</Badge>
            <p>{user.followers}</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-md px-2 py-1">
            <Badge className="font-tossface">👤 Following</Badge>
            <p>{user.following}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
