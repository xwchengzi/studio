
'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data - replace with actual data fetching if needed
const REGIONS = ['北京', '上海', '广东', '浙江', '江苏', '四川', '湖北', '陕西', '山东', '河南'];
const MAJOR_CATEGORIES = [
  '哲学', '经济学', '法学', '教育学', '文学', '历史学', '理学', '工学', '农学', '医学', '军事学', '管理学', '艺术学'
];
const SUBJECTS = ['政治', '历史', '地理', '物理', '化学', '生物', '技术'];

const formSchema = z.object({
  gaokaoScore: z.coerce.number().min(0, '分数不能为负').max(750, '分数不能超过750'),
  provinceRanking: z.coerce.number().int('排名必须是整数').min(1, '排名必须大于0'),
  selectedSubjects: z.array(z.string()).length(3, '必须选择 3 个科目'), // Added field for selected subjects
  intendedRegions: z.array(z.string()).optional(),
  intendedMajorCategories: z.array(z.string()).optional(),
  excludedRegions: z.array(z.string()).optional(),
  excludedMajorCategories: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

export function StudentInfoForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gaokaoScore: '' as unknown as number, // Initialize with empty string
      provinceRanking: '' as unknown as number, // Initialize with empty string
      selectedSubjects: [], // Default value for selected subjects
      intendedRegions: [],
      intendedMajorCategories: [],
      excludedRegions: [],
      excludedMajorCategories: [],
    },
  });

  function onSubmit(values: FormData) {
    console.log('Form submitted:', values);
    toast({
      title: '正在提交信息...',
      description: '正在为您生成推荐，请稍候。',
    });

    // Construct query params
    const params = new URLSearchParams();
    params.set('gaokaoScore', values.gaokaoScore.toString());
    params.set('provinceRanking', values.provinceRanking.toString());
    if (values.selectedSubjects && values.selectedSubjects.length > 0) {
        params.set('selectedSubjects', values.selectedSubjects.join(',')); // Add selected subjects
    }
    if (values.intendedRegions && values.intendedRegions.length > 0) {
      params.set('intendedRegions', values.intendedRegions.join(','));
    }
    if (values.intendedMajorCategories && values.intendedMajorCategories.length > 0) {
      params.set('intendedMajorCategories', values.intendedMajorCategories.join(','));
    }
    if (values.excludedRegions && values.excludedRegions.length > 0) {
      params.set('excludedRegions', values.excludedRegions.join(','));
    }
     if (values.excludedMajorCategories && values.excludedMajorCategories.length > 0) {
      params.set('excludedMajorCategories', values.excludedMajorCategories.join(','));
    }

    router.push(`/recommendations?${params.toString()}`);
  }

  // Custom MultiSelect Component using Popover
  const MultiSelectField = ({ field, label, options, maxSelection }: { field: any; label: string; options: string[], maxSelection?: number }) => {
    const selectedValues = field.value || [];

    const handleSelect = (option: string) => {
      let newValues;
      if (selectedValues.includes(option)) {
          newValues = selectedValues.filter((v: string) => v !== option);
      } else {
          if (maxSelection && selectedValues.length >= maxSelection) {
             toast({
                 title: `最多只能选择 ${maxSelection} 项`,
                 variant: 'destructive',
                 duration: 3000,
             });
              return; // Prevent adding more than maxSelection
          }
          newValues = [...selectedValues, option];
      }
      field.onChange(newValues);
    };

    const removeValue = (e: React.MouseEvent | React.KeyboardEvent, valueToRemove: string) => {
        e.stopPropagation(); // Prevent popover from opening/closing if needed
        e.preventDefault(); // Prevent form submission if inside a form
        const newValues = selectedValues.filter((v: string) => v !== valueToRemove);
        field.onChange(newValues);
    }

    // Handle keyboard interaction for removing items
    const handleKeyDownRemove = (e: React.KeyboardEvent, valueToRemove: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            removeValue(e, valueToRemove);
        }
    };


    return (
      <FormItem>
        <FormLabel>{label} {maxSelection ? `(必须选择 ${maxSelection} 项)` : ''}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between font-normal h-auto min-h-10 px-3 py-2", // Use h-auto for wrapping
                  selectedValues.length === 0 && "text-muted-foreground"
                )}
              >
                 <div className="flex flex-wrap gap-1 items-center flex-grow mr-1"> {/* Use flex-grow and margin-right */}
                    {selectedValues.length > 0 ? (
                       selectedValues.map((value: string) => (
                            <Badge key={value} variant="secondary" className="flex items-center gap-1 pr-1 text-xs sm:text-sm whitespace-nowrap">
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
                        <span className="truncate">请选择{label}</span> // Placeholder when empty
                    )}
                 </div>
                 <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] max-w-[calc(100vw-2rem)] p-0" align="start">
             <ScrollArea className="h-60">
                <div className="p-2">
                  {options.map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                       // Let the checkbox handle the select logic, prevent div click from closing popover
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        id={`${field.name}-${option}`}
                        checked={selectedValues.includes(option)}
                        onCheckedChange={() => handleSelect(option)} // Use onCheckedChange for Checkbox
                        aria-labelledby={`${field.name}-${option}-label`}
                        disabled={maxSelection && selectedValues.length >= maxSelection && !selectedValues.includes(option)} // Disable if max reached and not selected
                      />
                      <label
                        id={`${field.name}-${option}-label`}
                        htmlFor={`${field.name}-${option}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                        // Click label to trigger checkbox
                        onClick={() => handleSelect(option)}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    );
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 sm:p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="gaokaoScore"
            render={({ field }) => (
                <FormItem>
                <FormLabel>高考分数</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="请输入您的分数" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="provinceRanking"
            render={({ field }) => (
                <FormItem>
                <FormLabel>全省排名位次</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="请输入您的排名" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

         <Separator />

          <FormField
              control={form.control}
              name="selectedSubjects"
              render={({ field }) => (
                  <MultiSelectField field={field} label="选考科目" options={SUBJECTS} maxSelection={3} />
              )}
          />

         <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <FormField
                control={form.control}
                name="intendedRegions"
                render={({ field }) => (
                    <MultiSelectField field={field} label="意向地区" options={REGIONS} />
                )}
            />
             <FormField
                control={form.control}
                name="intendedMajorCategories"
                render={({ field }) => (
                    <MultiSelectField field={field} label="意向专业类别" options={MAJOR_CATEGORIES} />
                )}
            />
        </div>

         <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="excludedRegions"
                render={({ field }) => (
                    <MultiSelectField field={field} label="排除地区" options={REGIONS} />
                )}
            />
            <FormField
                control={form.control}
                name="excludedMajorCategories"
                render={({ field }) => (
                     <MultiSelectField field={field} label="排除专业类别" options={MAJOR_CATEGORIES} />
                )}
            />
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? '正在推荐...' : '智能推荐'}
        </Button>
      </form>
    </Form>
  );
}
