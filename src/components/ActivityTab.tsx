import { useMemo, useState } from 'react';
import type { GitHubEvent } from '@/lib/github';
import { getRelativeTime } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Activity,
  CalendarDays,
  GitCommitHorizontal,
  GitPullRequest,
} from 'lucide-react';

interface ActivityTabProps {
  username: string;
  events: GitHubEvent[];
}

const WINDOW_OPTIONS = [
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
];

const MONTH_LABELS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

function getEventLabel(type: string): string {
  if (type === 'PushEvent') return 'Push';
  if (type === 'PullRequestEvent') return 'Pull Request';
  if (type === 'IssuesEvent') return 'Issue';
  if (type === 'IssueCommentEvent') return 'Issue Comment';
  if (type === 'CreateEvent') return 'Create';
  return type.replace('Event', '');
}

export function ActivityTab({ username, events }: ActivityTabProps) {
  const [selectedYear, setSelectedYear] = useState('2026');

  const filteredEvents = useMemo(() => {
    return events.filter(
      (event) =>
        String(new Date(event.created_at).getFullYear()) === selectedYear,
    );
  }, [events, selectedYear]);

  const monthlyStats = useMemo(() => {
    const monthly = Array.from({ length: 12 }, (_, index) => ({
      month: MONTH_LABELS[index],
      count: 0,
    }));

    for (const event of filteredEvents) {
      const monthIndex = new Date(event.created_at).getMonth();
      monthly[monthIndex].count += 1;
    }

    const maxCount = Math.max(...monthly.map((item) => item.count), 1);

    return {
      monthly,
      maxCount,
    };
  }, [filteredEvents]);

  const summary = useMemo(() => {
    const counts = new Map<string, number>();

    for (const event of filteredEvents) {
      counts.set(event.type, (counts.get(event.type) ?? 0) + 1);
    }

    const topTypes = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([type, count]) => ({ type, count }));

    const pushCount = counts.get('PushEvent') ?? 0;
    const prCount = counts.get('PullRequestEvent') ?? 0;

    return {
      total: filteredEvents.length,
      pushCount,
      prCount,
      topTypes,
    };
  }, [filteredEvents]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity className="h-4 w-4" />
          Activity Overview
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32.5" size="sm">
              <SelectValue placeholder="연도" />
            </SelectTrigger>
            <SelectContent>
              {WINDOW_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4" />
            Contribution Grass ({selectedYear})
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <img
            src={`https://ghchart.rshah.org/${username}`}
            alt={`${username} contribution grass`}
            className="w-full rounded-md border border-border bg-card"
            loading="lazy"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">
            Activity Overview ({selectedYear})
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
            {monthlyStats.monthly.map((item) => (
              <div
                key={item.month}
                className="flex flex-col items-center gap-1"
              >
                <div className="flex h-20 w-full items-end rounded-md bg-muted/40 p-1">
                  <div
                    className="w-full rounded-sm bg-primary/70"
                    style={{
                      height: `${Math.max((item.count / monthlyStats.maxCount) * 100, item.count > 0 ? 10 : 0)}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {item.month}
                </span>
                <span className="text-[10px] font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <span className="text-sm text-muted-foreground">총 이벤트</span>
            <span className="text-lg font-semibold">{summary.total}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <GitCommitHorizontal className="h-4 w-4" /> Push
            </span>
            <span className="text-lg font-semibold">{summary.pushCount}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <GitPullRequest className="h-4 w-4" /> PR
            </span>
            <span className="text-lg font-semibold">{summary.prCount}</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Top Activity Types</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5">
            {summary.topTypes.length > 0 ? (
              summary.topTypes.map((item) => (
                <Badge key={item.type} variant="secondary">
                  {getEventLabel(item.type)} {item.count}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                선택한 연도의 공개 활동이 없습니다.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Recent Public Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2">
            {filteredEvents.slice(0, 8).map((event) => (
              <li
                key={event.id}
                className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2 text-sm"
              >
                <div className="min-w-0">
                  <a
                    href={`https://github.com/${event.repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block truncate font-medium hover:underline"
                  >
                    {event.repo.name}
                  </a>
                  <p className="text-xs text-muted-foreground">
                    {getEventLabel(event.type)}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {getRelativeTime(event.created_at)}
                </span>
              </li>
            ))}
          </ul>
          {filteredEvents.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              선택한 연도에 표시할 공개 활동이 없습니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
