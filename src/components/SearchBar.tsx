import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { BorderBeam } from './ui/border-beam';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative overflow-hidden rounded-md">
      <Search className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="검색..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
      <BorderBeam
        duration={16}
        size={60}
        className="from-transparent via-blue-500 to-transparent"
      />
    </div>
  );
}
