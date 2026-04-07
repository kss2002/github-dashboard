import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "updated" | "name";

interface FilterControlsProps {
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function FilterControls({ sort, onSortChange }: FilterControlsProps) {
  return (
    <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="정렬" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="updated">최신순</SelectItem>
        <SelectItem value="name">이름순</SelectItem>
      </SelectContent>
    </Select>
  );
}
