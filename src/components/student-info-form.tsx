
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
  gaokaoScore: z.coerce.number().min(0, '分数不能为负').max(750, '分数不能超过750').optional().or(z.literal('')), // Allow empty string initially
  provinceRanking: z.coerce.number().int('排名必须是整数').min(1, '排名必须大于0').optional().or(z.literal('')), // Allow empty string initially
  selectedSubjects: z.array(z.string()).length(3, '必须选择 3 个科目'), // Added field for selected subjects
  intendedRegions: z.array(z.string()).optional(),
  intendedMajorCategories: z.array(z.string()).optional(),
  excludedRegions: z.array(z.string()).optional(),
  excludedMajorCategories: z.array(z.string()).optional(),
}).refine(data => data.gaokaoScore !== '', { // Ensure gaokaoScore is not submitted as empty string
    message: "高考分数不能为空",
    path: ["gaokaoScore"],
}).refine(data => data.provinceRanking !== '', { // Ensure provinceRanking is not submitted as empty string
    message: "所在位次不能为空",
    path: ["provinceRanking"],
});


type FormData = z.infer<typeof formSchema>;

export function StudentInfoForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gaokaoScore: 500, // Default score to 500
      provinceRanking: 10000, // Default ranking to 10000
      selectedSubjects: [], // Default value for selected subjects
      intendedRegions: [],
      intendedMajorCategories: [],
      excludedRegions: [],
      excludedMajorCategories: [],
    },
  });

  function onSubmit(values: FormData) {
    // Ensure default values are used if fields were cleared and submitted
    const finalValues = {
        ...values,
        gaokaoScore: values.gaokaoScore === '' ? 500 : Number(values.gaokaoScore),
        provinceRanking: values.provinceRanking === '' ? 10000 : Number(values.provinceRanking),
    };


    console.log('Form submitted:', finalValues);
    toast({
      title: '正在提交信息...',
      description: '正在为您生成推荐，请稍候。',
    });

    // Construct query params
    const params = new URLSearchParams();
    params.set('gaokaoScore', finalValues.gaokaoScore.toString());
    params.set('provinceRanking', finalValues.provinceRanking.toString());
    if (finalValues.selectedSubjects && finalValues.selectedSubjects.length > 0) {
        params.set('selectedSubjects', finalValues.selectedSubjects.join(',')); // Add selected subjects
    }
    if (finalValues.intendedRegions && finalValues.intendedRegions.length > 0) {
      params.set('intendedRegions', finalValues.intendedRegions.join(','));
    }
    if (finalValues.intendedMajorCategories && finalValues.intendedMajorCategories.length > 0) {
      params.set('intendedMajorCategories', finalValues.intendedMajorCategories.join(','));
    }
    if (finalValues.excludedRegions && finalValues.excludedRegions.length > 0) {
      params.set('excludedRegions', finalValues.excludedRegions.join(','));
    }
     if (finalValues.excludedMajorCategories && finalValues.excludedMajorCategories.length > 0) {
      params.set('excludedMajorCategories', finalValues.excludedMajorCategories.join(','));
    }

    router.push(`/recommendations?${params.toString()}`);
  }

  // Custom MultiSelect Component using Popover
  const MultiSelectField = ({ field, label, options, maxSelection }: { field: any; label: string; options: string[], maxSelection?: number }) => {
    const selectedValues = field.value || [];
    const [isOpen, setIsOpen] = React.useState(false);

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
       // Keep popover open after selection
      // setIsOpen(true); // This line might be causing issues, let's remove it for now. Popover should handle its state.
    };

    const removeValue = (e: React.MouseEvent | React.KeyboardEvent, valueToRemove: string) => {
        e.stopPropagation(); // Prevent popover from closing
        e.preventDefault(); // Prevent default behavior
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
        <FormLabel>{label}</FormLabel>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={isOpen}
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
                                {/* Changed div to span for semantic correctness and accessibility */}
                                <span
                                    role="button"
                                    tabIndex={0} // Make it focusable
                                    onMouseDown={(e) => { e.preventDefault(); removeValue(e, value); }} // Prevent focus loss and handle removal
                                    onClick={(e) => e.stopPropagation()} // Prevent button click from toggling popover if inside
                                    onKeyDown={(e) => handleKeyDownRemove(e, value)}
                                    className="rounded-full p-0.5 hover:bg-muted-foreground/20 focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                                    aria-label={`移除 ${value}`}
                                >
                                    <X className="h-3 w-3" />
                                </span>
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
          <PopoverContent
              className="w-[--radix-popover-trigger-width] max-w-[calc(100vw-2rem)] p-0"
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()} // Prevent focus hijack
              // onInteractOutside={(e) => {
              // // Allow interaction within the trigger button itself
              // if (e.target instanceof Element && e.target.closest('[role="combobox"]')) {
              //   e.preventDefault();
              // }
              // // Allow interaction with checkbox items
              // // No explicit prevention needed here, default behavior is usually okay
              // }}
          >
             <ScrollArea className="h-60">
                <div className="p-2">
                  {options.map((option) => (
                    <div
                      key={option}
                      onMouseDown={(e) => e.preventDefault()} // Prevents popover close on item click start
                      onClick={() => handleSelect(option)} // Handle selection on click complete
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                    >
                      <Checkbox
                        id={`${field.name}-${option}`}
                        checked={selectedValues.includes(option)}
                        // Checkbox state is controlled by parent div click, no need for onCheckedChange here
                        aria-labelledby={`${field.name}-${option}-label`}
                        disabled={maxSelection && selectedValues.length >= maxSelection && !selectedValues.includes(option)} // Disable if max reached and not selected
                        tabIndex={-1} // Make checkbox non-focusable, parent div handles interaction
                      />
                      <label
                        id={`${field.name}-${option}-label`}
                        // htmlFor removed as Checkbox is not directly interactive via label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer select-none" // Added select-none
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
                     {/* Use field.value directly, handle potential empty string */}
                    <Input type="number" placeholder="请输入您的分数" {...field} value={field.value ?? ''} />
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
                <FormLabel>所在位次</FormLabel>
                <FormControl>
                    {/* Use field.value directly, handle potential empty string */}
                    <Input type="number" placeholder="请输入您的排名" {...field} value={field.value ?? ''} />
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
                    <MultiSelectField field={field} label="意向专业" options={MAJOR_CATEGORIES} />
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
                     <MultiSelectField field={field} label="排除专业" options={MAJOR_CATEGORIES} />
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
