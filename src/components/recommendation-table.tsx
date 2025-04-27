

'use client';

import React, { useState, useMemo } from 'react';
import { Major } from '@/services/major-recommendation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendationTableProps {
  majors: Major[];
}

type SortKey = keyof Major | null;
type SortDirection = 'asc' | 'desc';

export function RecommendationTable({ majors }: RecommendationTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('admissionRanking2024'); // Default sort by 24年位次
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc'); // Default sort ascending

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const SortableHeader = ({ columnKey, label, className }: { columnKey: SortKey, label: string, className?: string }) => (
    <TableHead className={cn("cursor-pointer hover:bg-accent px-2 py-2 sm:px-4 sm:py-3", className)} onClick={() => handleSort(columnKey)}> {/* Adjusted padding */}
      <div className="flex items-center">
        {label}
        {sortKey === columnKey && (
          <ArrowUpDown className={`ml-1 h-3 w-3 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
        )}
         {sortKey !== columnKey && (
           <ArrowUpDown className="ml-1 h-3 w-3 opacity-30" />
         )}
      </div>
    </TableHead>
  );

  const sortedAndFilteredMajors = useMemo(() => {
    let filtered = majors;
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = majors.filter(major =>
        major.majorName.toLowerCase().includes(lowerCaseSearchTerm) ||
        major.majorCode.toLowerCase().includes(lowerCaseSearchTerm) ||
        major.university.toLowerCase().includes(lowerCaseSearchTerm) ||
        major.subjectRequirements?.toLowerCase().includes(lowerCaseSearchTerm) // Search in requirements too
      );
    }

    if (sortKey) {
      // Create a copy before sorting to avoid mutating the original array directly
       filtered = [...filtered].sort((a, b) => {
           const aValue = a[sortKey];
           const bValue = b[sortKey];

           // Handle null/undefined values: place them at the end for ascending, start for descending
           const nullOrder = sortDirection === 'asc' ? 1 : -1;
           if (aValue === null || aValue === undefined) return nullOrder;
           if (bValue === null || bValue === undefined) return -nullOrder;


           if (typeof aValue === 'number' && typeof bValue === 'number') {
              return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
           }

           if (typeof aValue === 'string' && typeof bValue === 'string') {
             const comparison = aValue.localeCompare(bValue, 'zh-CN'); // Use Chinese locale for sorting strings
             return sortDirection === 'asc' ? comparison : -comparison;
           }

           // Fallback for other types (though our Major interface is specific)
           if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
           if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;

           return 0;
       });
    }


    return filtered;
  }, [majors, searchTerm, sortKey, sortDirection]);

  return (
    <div className="w-full">
      <div className="mb-4">
        <Input
          placeholder="搜索专业名称、代码、院校或选科要求..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-sm" // Full width on small screens
        />
      </div>
       <div className="border rounded-lg overflow-x-auto shadow-sm">
        <Table>
            <TableHeader className="bg-muted/50 text-xs">
                <TableRow>
                    <SortableHeader columnKey="majorName" label="专业名称" className="min-w-[150px] sticky left-0 bg-muted/50 z-10" />
                    <SortableHeader columnKey="majorCode" label="专业代码" className="min-w-[90px]" />
                    <SortableHeader columnKey="university" label="所属院校" className="min-w-[160px]" />
                    <SortableHeader columnKey="subjectRequirements" label="选科要求" className="min-w-[110px]" />
                    <SortableHeader columnKey="admissionScore2024" label="24年分数" className="text-right min-w-[70px]" />
                    <SortableHeader columnKey="admissionRanking2024" label="24年位次" className="text-right min-w-[70px]" />
                    <SortableHeader columnKey="admissionScore2023" label="23年分数" className="text-right min-w-[70px]" />
                    <SortableHeader columnKey="admissionRanking2023" label="23年位次" className="text-right min-w-[70px]" />
                    <SortableHeader columnKey="admissionScore2022" label="22年分数" className="text-right min-w-[70px]" />
                    <SortableHeader columnKey="admissionRanking2022" label="22年位次" className="text-right min-w-[70px]" />
                </TableRow>
            </TableHeader>
            <TableBody className="text-xs sm:text-sm">
              {sortedAndFilteredMajors.length > 0 ? (
                sortedAndFilteredMajors.map((major, index) => (
                    <TableRow key={`${major.majorCode}-${major.university}-${index}`} className="hover:bg-accent/50">
                        <TableCell className="font-medium sticky left-0 bg-background hover:bg-accent/50 z-10 px-2 py-2 sm:px-4 sm:py-4">{major.majorName}</TableCell> {/* Adjusted padding */}
                        <TableCell className="px-2 py-2 sm:px-4 sm:py-4">{major.majorCode}</TableCell> {/* Adjusted padding */}
                        <TableCell className="px-2 py-2 sm:px-4 sm:py-4">{major.university}</TableCell> {/* Adjusted padding */}
                        <TableCell className="px-2 py-2 sm:px-4 sm:py-4">{major.subjectRequirements ?? '不详'}</TableCell> {/* Adjusted padding */}
                        <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.admissionScore2024 ?? '-'}</TableCell> {/* Adjusted padding */}
                        <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.admissionRanking2024 ?? '-'}</TableCell> {/* Adjusted padding */}
                        <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.admissionScore2023 ?? '-'}</TableCell> {/* Adjusted padding */}
                        <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.admissionRanking2023 ?? '-'}</TableCell> {/* Adjusted padding */}
                         <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.admissionScore2022 ?? '-'}</TableCell> {/* Adjusted padding */}
                        <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.admissionRanking2022 ?? '-'}</TableCell> {/* Adjusted padding */}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
                            {searchTerm ? '未找到匹配的专业。' : '暂无符合条件的推荐数据。'}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
       </div>
    </div>
  );
}
