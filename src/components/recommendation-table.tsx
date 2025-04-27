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
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const SortableHeader = ({ columnKey, label, className }: { columnKey: SortKey, label: string, className?: string }) => (
    <TableHead className={cn("cursor-pointer hover:bg-accent", className)} onClick={() => handleSort(columnKey)}>
      <div className="flex items-center">
        {label}
        {sortKey === columnKey && (
          <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
        )}
         {sortKey !== columnKey && (
           <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />
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
        major.university.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (sortKey) {
      filtered.sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
        if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? -1 : 1;


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
          placeholder="搜索专业名称、代码或院校..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
       <div className="border rounded-lg overflow-x-auto shadow-sm">
        <Table>
            <TableHeader className="bg-muted/50">
                <TableRow>
                <SortableHeader columnKey="majorName" label="专业名称" className="min-w-[150px]" />
                <SortableHeader columnKey="majorCode" label="专业代码" className="min-w-[100px]" />
                <SortableHeader columnKey="university" label="所属院校" className="min-w-[180px]" />
                <SortableHeader columnKey="admissionScore2024" label="24年分数" className="text-right min-w-[90px]" />
                <SortableHeader columnKey="admissionRanking2024" label="24年位次" className="text-right min-w-[90px]" />
                <SortableHeader columnKey="admissionScore2023" label="23年分数" className="text-right min-w-[90px]" />
                <SortableHeader columnKey="admissionRanking2023" label="23年位次" className="text-right min-w-[90px]" />
                 <SortableHeader columnKey="admissionScore2022" label="22年分数" className="text-right min-w-[90px]" />
                <SortableHeader columnKey="admissionRanking2022" label="22年位次" className="text-right min-w-[90px]" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {sortedAndFilteredMajors.length > 0 ? (
                    sortedAndFilteredMajors.map((major, index) => (
                    <TableRow key={`${major.majorCode}-${major.university}-${index}`} className="hover:bg-accent/50">
                        <TableCell className="font-medium">{major.majorName}</TableCell>
                        <TableCell>{major.majorCode}</TableCell>
                        <TableCell>{major.university}</TableCell>
                        <TableCell className="text-right">{major.admissionScore2024 ?? '-'}</TableCell>
                        <TableCell className="text-right">{major.admissionRanking2024 ?? '-'}</TableCell>
                        <TableCell className="text-right">{major.admissionScore2023 ?? '-'}</TableCell>
                        <TableCell className="text-right">{major.admissionRanking2023 ?? '-'}</TableCell>
                         <TableCell className="text-right">{major.admissionScore2022 ?? '-'}</TableCell>
                        <TableCell className="text-right">{major.admissionRanking2022 ?? '-'}</TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                            {searchTerm ? '未找到匹配的专业。' : '暂无推荐数据。'}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
       </div>
    </div>
  );
}
