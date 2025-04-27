
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
import { Badge } from '@/components/ui/badge';

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

       const handleSelect = (option: string) => {
           const newValues = selectedValues.includes(option)
               ? selectedValues.filter((v) => v !== option)
               : [...selectedValues, option];
           handleMultiSelectChange(filterKey, newValues);
       };

       const removeValue = (e: React.MouseEvent | React.KeyboardEvent, valueToRemove: string) => {
           e.stopPropagation(); // Prevent popover from opening
           e.preventDefault(); // Prevent default behavior
           const newValues = selectedValues.filter((v) => v !== valueToRemove);
           handleMultiSelectChange(filterKey, newValues);
       }

        // Handle keyboard interaction for removing items
        const handleKeyDownRemove = (e: React.KeyboardEvent, valueToRemove: string) => {
            if (e.key === 'Enter' || e.key === ' ') {
                removeValue(e, valueToRemove);
            }
        };


       return (
           <div className="space-y-1">
               <Label htmlFor={filterKey as string} className="text-xs">{label}</Label>
               <Popover>
                    <PopoverTrigger asChild>
                       <Button
                           variant="outline"
                           role="combobox"
                           className={cn(
                             "w-full justify-between font-normal h-auto min-h-9 text-xs px-3 py-1", // Adjusted height and padding
                             selectedValues.length === 0 && "text-muted-foreground"
                           )}
                       >
                            <div className="flex flex-wrap gap-1 items-center flex-grow mr-1"> {/* Container for badges */}
                               {selectedValues.length > 0 ? (
                                   selectedValues.map((value) => (
                                       <Badge key={value} variant="secondary" className="flex items-center gap-1 pr-1 text-xs whitespace-nowrap">
                                           {value}
                                            {/* Changed button to div with role="button" */}
                                           <div
                                                role="button"
                                                tabIndex={0} // Make it focusable
                                                onClick={(e) => removeValue(e, value)}
                                                onKeyDown={(e) => handleKeyDownRemove(e, value)}
                                                className="rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                                                aria-label={`移除 ${value}`}
                                            >
                                                <X className="h-3 w-3" />
                                           </div>
                                       </Badge>
                                   ))
                               ) : (
                                    <span className="truncate">选择{label}</span> // Placeholder
                               )}
                            </div>
                           <ChevronDown className="h-3 w-3 shrink-0 opacity-50"/>
                       </Button>
                   </PopoverTrigger>
                   <PopoverContent className="w-[--radix-popover-trigger-width] max-w-[calc(100vw-2rem)] p-0" align="start">
                       <ScrollArea className="h-48">
                           <div className="p-1">
                               {options.map((option) => (
                                   <div
                                       key={option}
                                       className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-accent cursor-pointer"
                                       onClick={(e) => {
                                           // Stop propagation to prevent popover close when clicking the item area
                                           e.stopPropagation();
                                           handleSelect(option);
                                       }}
                                   >
                                       <Checkbox
                                           id={`${filterKey as string}-${option}`}
                                           checked={selectedValues.includes(option)}
                                           // Prevent checkbox click from closing popover, let the div handle it
                                           // onClick={(e) => e.stopPropagation()}
                                           aria-labelledby={`${filterKey as string}-${option}-label`}
                                            className="h-3.5 w-3.5"
                                       />
                                       <label
                                            id={`${filterKey as string}-${option}-label`}
                                           htmlFor={`${filterKey as string}-${option}`}
                                           className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                                            // Prevent label click from closing popover, let the div handle it
                                            // onClick={(e) => e.stopPropagation()}
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
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end', className)}> {/* Reduced gap */}
        <MultiSelectFilter filterKey="regions" label="地区" options={REGIONS} />
        <MultiSelectFilter filterKey="majorCategories" label="专业类别" options={MAJOR_CATEGORIES} />
        <SingleSelectFilter filterKey="schoolingLength" label="学制" options={SCHOOLING_LENGTHS} />
        <SingleSelectFilter filterKey="tuitionRange" label="学费范围" options={TUITION_RANGES} />
        <SingleSelectFilter filterKey="universityTier" label="院校层次" options={UNIVERSITY_TIERS} />

        <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs text-muted-foreground hover:text-foreground h-9 col-span-2 sm:col-span-1 mt-auto justify-self-end sm:justify-self-start" /* Adjusted alignment */
         >
            <X className="mr-1 h-3 w-3" />
            清空筛选
        </Button>
    </div>
  );
}
