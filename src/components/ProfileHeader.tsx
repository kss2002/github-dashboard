import type { GitHubUser } from '@/lib/github';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { NumberTicker } from '@/components/ui/number-ticker';
import { Backlight } from './ui/backlight';

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
  const stats = [
    { label: '📦 Repositories', value: repoCount },
    { label: '⭐ Starred', value: starredCount },
    { label: '👥 Followers', value: user.followers },
    { label: '👤 Following', value: user.following },
  ];

  return (
    <div className="flex flex-col items-center gap-4 py-8 sm:flex-row sm:items-start sm:gap-6">
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        <Backlight>
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
            <AvatarImage src={user.avatar_url} alt={user.login} />
            <AvatarFallback>
              {user.login.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Backlight>
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

        <div className="relative flex flex-wrap gap-2 mt-1">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-1 bg-gray-100 rounded-md px-2 py-1"
            >
              <Badge className="font-tossface">{label}</Badge>
              <NumberTicker
                value={value}
                className="text-sm font-semibold text-foreground"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
