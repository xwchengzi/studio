
'use client';

import React, { useState, useEffect } from 'react';
import { MajorRecommendationFilter } from '@/services/major-recommendation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data - replace with actual data fetching or constants
const REGIONS = ['北京', '上海', '广东', '浙江', '江苏', '四川', '湖北', '陕西', '山东', '河南'];
const MAJOR_CATEGORIES = [
  '哲学', '经济学', '法学', '教育学', '文学', '历史学', '理学', '工学', '农学', '医学', '军事学', '管理学', '艺术学'
];
const SCHOOLING_LENGTHS = ['全部', '4年', '5年', '其他'];
const TUITION_RANGES = ['全部', '5000元以下', '5000-10000元', '10000-20000元', '20000元以上'];
const UNIVERSITY_TIERS = ['全部', '985', '211', '双一流', '普通本科', '专科'];

interface RecommendationFiltersProps {
  onFilterChange: (filters: MajorRecommendationFilter) => void;
  initialFilters: MajorRecommendationFilter;
  className?: string;
}

export function RecommendationFilters({ onFilterChange, initialFilters, className }: RecommendationFiltersProps) {
  const [filters, setFilters] = useState<MajorRecommendationFilter>(initialFilters);

   // Update local state if initialFilters change (e.g., when navigating back/forth)
   useEffect(() => {
       setFilters(initialFilters);
   }, [initialFilters]);


  const handleMultiSelectChange = (key: keyof MajorRecommendationFilter, value: string[]) => {
      const newFilters = { ...filters, [key]: value.length > 0 ? value : undefined }; // Set to undefined if empty
      setFilters(newFilters);
      onFilterChange(newFilters);
  };

   const handleSingleSelectChange = (key: keyof MajorRecommendationFilter, value: string) => {
       const newFilters = { ...filters, [key]: value === '全部' ? undefined : value };
       setFilters(newFilters);
       onFilterChange(newFilters);
   };

  const resetFilters = () => {
    // Reset to initial state derived from query params, not necessarily empty
    const resetState: MajorRecommendationFilter = {
        regions: initialFilters.regions,
        majorCategories: initialFilters.majorCategories,
        // Keep other fields undefined as they are not part of initial query
    };
    setFilters(resetState);
    onFilterChange(resetState);
  };


   // Custom MultiSelect Component using Popover
   const MultiSelectFilter = ({ filterKey, label, options }: { filterKey: keyof MajorRecommendationFilter; label: string; options: string[] }) => {
       const selectedValues = (filters[filterKey] as string[] | undefined) || [];
       const [isOpen, setIsOpen] = React.useState(false);

       const handleSelect = (option: string) => {
           const newValues = selectedValues.includes(option)
               ? selectedValues.filter((v) => v !== option)
               : [...selectedValues, option];
           handleMultiSelectChange(filterKey, newValues);
           // Keep popover open for multi-selection - do not explicitly control open state here
           // setIsOpen(true); // Removed: Rely on onMouseDown preventDefault
       };

       return (
           <div className="space-y-1 flex flex-col">
               <Label htmlFor={filterKey as string} className="text-xs">{label}</Label>
               <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                       <Button
                           variant="outline"
                           role="combobox"
                           aria-expanded={isOpen}
                           className={cn(
                             "w-full justify-between font-normal h-9 text-xs px-3 py-1", // Adjusted height and padding
                             selectedValues.length === 0 && "text-muted-foreground"
                           )}
                       >
                            {/* Simplified Trigger Label */}
                            <span className="truncate">
                                {selectedValues.length > 0 ? `${selectedValues.length}项已选` : `选择${label}`}
                            </span>
                           <ChevronDown className="h-3 w-3 shrink-0 opacity-50"/>
                       </Button>
                   </PopoverTrigger>
                   <PopoverContent
                        className="w-[--radix-popover-trigger-width] max-w-[calc(100vw-2rem)] p-0"
                        align="start"
                        // onOpenAutoFocus={(e) => e.preventDefault()} // Prevent focus hijack - Removed, let Popover handle focus
                    >
                       <ScrollArea className="h-48">
                           <div className="p-1">
                               {options.map((option) => (
                                   <div
                                       key={option}
                                       onMouseDown={(e) => e.preventDefault()} // Prevents popover close on item click start
                                       onClick={() => handleSelect(option)} // Handle selection on click complete
                                       className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-accent cursor-pointer"
                                   >
                                       <Checkbox
                                           id={`${filterKey as string}-${option}`}
                                           checked={selectedValues.includes(option)}
                                           aria-labelledby={`${filterKey as string}-${option}-label`}
                                           className="h-3.5 w-3.5 pointer-events-none" // Make checkbox non-interactive visually
                                           tabIndex={-1} // Make checkbox non-focusable
                                       />
                                       <label
                                            id={`${filterKey as string}-${option}-label`}
                                            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer select-none" // Added select-none
                                       >
                                           {option}
                                       </label>
                                   </div>
                               ))}
                           </div>
                       </ScrollArea>
                   </PopoverContent>
               </Popover>
           </div>
       );
   };

    const SingleSelectFilter = ({ filterKey, label, options }: { filterKey: keyof MajorRecommendationFilter; label: string; options: string[] }) => (
        <div className="space-y-1">
            <Label htmlFor={filterKey as string} className="text-xs">{label}</Label>
            <Select
                value={(filters[filterKey] as string | undefined) ?? '全部'}
                onValueChange={(value) => handleSingleSelectChange(filterKey, value)}
            >
                <SelectTrigger id={filterKey as string} className="w-full h-9 text-xs px-3">
                     <SelectValue placeholder={`选择${label}`} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option} className="text-xs">
                        {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );


  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-4 items-end', className)}> {/* Changed items-start to items-end */}
        <MultiSelectFilter filterKey="regions" label="地区" options={REGIONS} />
        <MultiSelectFilter filterKey="majorCategories" label="专业类别" options={MAJOR_CATEGORIES} />
        <SingleSelectFilter filterKey="schoolingLength" label="学制" options={SCHOOLING_LENGTHS} />
        <SingleSelectFilter filterKey="tuitionRange" label="学费范围" options={TUITION_RANGES} />
        <SingleSelectFilter filterKey="universityTier" label="院校层次" options={UNIVERSITY_TIERS} />

        <div className="col-span-2 sm:col-span-1 flex items-end h-full"> {/* Wrapper for button alignment */}
            <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-xs text-muted-foreground hover:text-foreground h-9 mt-auto w-full sm:w-auto justify-self-end sm:justify-self-start" /* Adjusted alignment */
             >
                <X className="mr-1 h-3 w-3" />
                清空筛选
            </Button>
        </div>
    </div>
  );
}
