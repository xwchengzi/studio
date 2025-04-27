

'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
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
import { ArrowUpDown, CheckCircle, HelpCircle, XCircle } from 'lucide-react'; // Import icons for probability
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge'; // Import Badge

interface RecommendationTableProps {
  majors: Major[];
}

type SortKey = keyof Major | null;
type SortDirection = 'asc' | 'desc';

export function RecommendationTable({ majors }: RecommendationTableProps) {
  const router = useRouter(); // Initialize useRouter
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('admissionProbability'); // Default sort by probability
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc'); // Default sort ascending

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Navigate to major details page
  const handleRowClick = (major: Major) => {
    router.push(`/major/${encodeURIComponent(major.university)}/${encodeURIComponent(major.majorCode)}`);
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

   const ProbabilityBadge = ({ probability }: { probability: Major['admissionProbability'] }) => {
       if (!probability) return <span className="text-muted-foreground">-</span>;

       let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'secondary';
       let icon = HelpCircle;
       let text = probability;

       switch (probability) {
           case '高':
               variant = 'default'; // Use primary color for high probability
               icon = CheckCircle;
               break;
           case '中':
                variant = 'secondary'; // Keep secondary for medium
               icon = HelpCircle;
               break;
           case '低':
               variant = 'destructive'; // Use destructive for low probability
               icon = XCircle;
               break;
       }

       return (
           <Badge variant={variant} className="flex items-center gap-1 w-fit mx-auto sm:mx-0">
                <icon className="h-3 w-3" />
               {text}
           </Badge>
       );
   };

  const sortedAndFilteredMajors = useMemo(() => {
    let filtered = majors;
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = majors.filter(major =>
        major.majorName.toLowerCase().includes(lowerCaseSearchTerm) ||
        major.university.toLowerCase().includes(lowerCaseSearchTerm) ||
        major.subjectRequirements?.toLowerCase().includes(lowerCaseSearchTerm) // Search in requirements too
      );
    }

    if (sortKey) {
       // Custom sort for probability
        const probabilityOrder: Record<string, number> = { '高': 1, '中': 2, '低': 3 };

      // Create a copy before sorting to avoid mutating the original array directly
       filtered = [...filtered].sort((a, b) => {
           const aValue = a[sortKey];
           const bValue = b[sortKey];

           // Handle null/undefined values: place them at the end for ascending, start for descending
           const nullOrder = sortDirection === 'asc' ? 1 : -1;
           if (aValue === null || aValue === undefined) return nullOrder;
           if (bValue === null || bValue === undefined) return -nullOrder;

           // Sort by probability
           if (sortKey === 'admissionProbability') {
                const aProb = probabilityOrder[aValue as string] ?? 99;
                const bProb = probabilityOrder[bValue as string] ?? 99;
                return sortDirection === 'asc' ? aProb - bProb : bProb - aProb;
           }

           if (typeof aValue === 'number' && typeof bValue === 'number') {
              return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
           }

           if (typeof aValue === 'string' && typeof bValue === 'string') {
             const comparison = aValue.localeCompare(bValue, 'zh-CN'); // Use Chinese locale for sorting strings
             return sortDirection === 'asc' ? comparison : -comparison;
           }

           // Fallback for other types
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
          placeholder="搜索专业名称、院校或选科要求..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-sm" // Full width on small screens
        />
      </div>
       <div className="border rounded-lg overflow-x-auto shadow-sm">
        <Table>
            <TableHeader className="bg-muted/50 text-xs">
                <TableRow>{/* Start TableRow for Header */}
                    <SortableHeader columnKey="majorName" label="专业名称" className="min-w-[150px] sticky left-0 bg-muted/50 z-10" />
                    {/* Removed majorCode: <SortableHeader columnKey="majorCode" label="专业代码" className="min-w-[90px]" /> */}
                    <SortableHeader columnKey="university" label="所属院校" className="min-w-[160px]" />
                     <SortableHeader columnKey="admissionProbability" label="录取概率" className="min-w-[90px] text-center sm:text-left" />
                    <SortableHeader columnKey="subjectRequirements" label="选科要求" className="min-w-[110px]" />
                    <SortableHeader columnKey="estimatedRanking2025" label="25年预估位次" className="text-right min-w-[90px]" />
                    <SortableHeader columnKey="admissionScore2024" label="24年分数" className="text-right min-w-[70px]" />
                    <SortableHeader columnKey="admissionRanking2024" label="24年位次" className="text-right min-w-[70px]" />
                    <SortableHeader columnKey="admissionScore2023" label="23年分数" className="text-right min-w-[70px]" />
                    <SortableHeader columnKey="admissionRanking2023" label="23年位次" className="text-right min-w-[70px]" />
                    <SortableHeader columnKey="admissionScore2022" label="22年分数" className="text-right min-w-[70px]" />
                    <SortableHeader columnKey="admissionRanking2022" label="22年位次" className="text-right min-w-[70px]" />
                </TableRow>{/* End TableRow for Header */}
            </TableHeader>
            <TableBody className="text-xs sm:text-sm">
              {sortedAndFilteredMajors.length > 0 ? (
                sortedAndFilteredMajors.map((major, index) => (
                    <TableRow
                      key={`${major.majorCode}-${major.university}-${index}`} // Still use majorCode internally for key
                      className="hover:bg-accent/50 cursor-pointer" // Added cursor-pointer
                      onClick={() => handleRowClick(major)} // Added onClick handler
                    >
                        <TableCell className="font-medium sticky left-0 bg-background hover:bg-accent/50 z-10 px-2 py-2 sm:px-4 sm:py-4">{major.majorName}</TableCell>{/* Adjusted padding */}
                        {/* Removed majorCode cell: <TableCell className="px-2 py-2 sm:px-4 sm:py-4">{major.majorCode}</TableCell> */}
                        <TableCell className="px-2 py-2 sm:px-4 sm:py-4">{major.university}</TableCell>{/* Adjusted padding */}
                         <TableCell className="text-center sm:text-left px-2 py-2 sm:px-4 sm:py-4"> {/* Added probability cell */}
                             <ProbabilityBadge probability={major.admissionProbability} />
                        </TableCell>
                        <TableCell className="px-2 py-2 sm:px-4 sm:py-4">{major.subjectRequirements ?? '不详'}</TableCell>{/* Adjusted padding */}
                         <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.estimatedRanking2025 ?? '-'}</TableCell>{/* Adjusted padding */}
                        <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.admissionScore2024 ?? '-'}</TableCell>{/* Adjusted padding */}
                        <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.admissionRanking2024 ?? '-'}</TableCell>{/* Adjusted padding */}
                        <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.admissionScore2023 ?? '-'}</TableCell>{/* Adjusted padding */}
                        <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.admissionRanking2023 ?? '-'}</TableCell>{/* Adjusted padding */}
                         <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.admissionScore2022 ?? '-'}</TableCell>{/* Adjusted padding */}
                        <TableCell className="text-right px-2 py-2 sm:px-4 sm:py-4">{major.admissionRanking2022 ?? '-'}</TableCell>{/* Adjusted padding */}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        {/* Adjusted colSpan */}
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
