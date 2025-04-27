
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
  gaokaoScore: z.coerce
    .number({ invalid_type_error: '请输入有效分数' })
    .min(0, '分数不能为负')
    .max(750, '分数不能超过750')
    .optional(), // Make optional initially
  provinceRanking: z.coerce
    .number({ invalid_type_error: '请输入有效排名' })
    .int('排名必须是整数')
    .min(1, '排名必须大于0')
    .optional(), // Make optional initially
  selectedSubjects: z.array(z.string()).length(3, '必须选择 3 个科目'),
  intendedRegions: z.array(z.string()).optional(),
  intendedMajorCategories: z.array(z.string()).optional(),
  excludedRegions: z.array(z.string()).optional(),
  excludedMajorCategories: z.array(z.string()).optional(),
});


type FormData = z.infer<typeof formSchema>;

// Define badge types for conditional styling
type BadgeType = 'default' | 'subject' | 'excluded';


export function StudentInfoForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gaokaoScore: undefined, // Use undefined for placeholders to work correctly
      provinceRanking: undefined, // Use undefined for placeholders to work correctly
      selectedSubjects: [],
      intendedRegions: [],
      intendedMajorCategories: [],
      excludedRegions: [],
      excludedMajorCategories: [],
    },
  });

  function onSubmit(values: FormData) {
     // Ensure required fields have values before submitting, using default placeholders if empty
     const submissionValues = {
       ...values,
       // Use placeholder if value is undefined, otherwise use the entered value
       gaokaoScore: values.gaokaoScore === undefined ? 500 : values.gaokaoScore,
       provinceRanking: values.provinceRanking === undefined ? 10000 : values.provinceRanking,
     };

    console.log('Form submitted:', submissionValues);
    toast({
      title: '正在提交信息...',
      description: '正在为您生成推荐，请稍候。',
    });

    // Construct query params
    const params = new URLSearchParams();
    params.set('gaokaoScore', submissionValues.gaokaoScore.toString());
    params.set('provinceRanking', submissionValues.provinceRanking.toString());
    if (submissionValues.selectedSubjects && submissionValues.selectedSubjects.length > 0) {
        params.set('selectedSubjects', submissionValues.selectedSubjects.join(','));
    }
    if (submissionValues.intendedRegions && submissionValues.intendedRegions.length > 0) {
      params.set('intendedRegions', submissionValues.intendedRegions.join(','));
    }
    if (submissionValues.intendedMajorCategories && submissionValues.intendedMajorCategories.length > 0) {
      params.set('intendedMajorCategories', submissionValues.intendedMajorCategories.join(','));
    }
    if (submissionValues.excludedRegions && submissionValues.excludedRegions.length > 0) {
      params.set('excludedRegions', submissionValues.excludedRegions.join(','));
    }
     if (submissionValues.excludedMajorCategories && submissionValues.excludedMajorCategories.length > 0) {
      params.set('excludedMajorCategories', submissionValues.excludedMajorCategories.join(','));
    }

    router.push(`/recommendations?${params.toString()}`);
  }

  // Custom MultiSelect Component using Popover
  const MultiSelectField = ({
      field,
      label,
      options,
      maxSelection,
      badgeType = 'default' // Default badge type
    }: {
      field: any;
      label: string;
      options: string[];
      maxSelection?: number;
      badgeType?: BadgeType; // Added prop for badge type
    }) => {
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
              return;
          }
          newValues = [...selectedValues, option];
      }
      field.onChange(newValues);
      // Keep popover open if within maxSelection limit or removing an item
       if (!maxSelection || newValues.length < maxSelection || selectedValues.includes(option)) {
            // Don't automatically close the popover here to allow multiple selections
           // setIsOpen(true); // Keep it open implicitly by not setting it to false
       } else {
           setIsOpen(false); // Close only when max selection is hit
       }
    };

    const removeValue = (e: React.MouseEvent | React.KeyboardEvent, valueToRemove: string) => {
        e.stopPropagation();
        e.preventDefault();
        const newValues = selectedValues.filter((v: string) => v !== valueToRemove);
        field.onChange(newValues);
       // setIsOpen(true); // Keep open after removing - Removed this, let user control closing
    }

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
                  "w-full justify-between font-normal h-auto min-h-10 px-3 py-2",
                  selectedValues.length === 0 && "text-muted-foreground"
                )}
              >
                 <div className="flex flex-wrap gap-1 items-center flex-grow mr-1">
                    {selectedValues.length > 0 ? (
                       selectedValues.map((value: string) => (
                            <Badge
                              key={value}
                              // Apply conditional styling directly using cn and Tailwind utilities
                              className={cn(
                                "flex items-center gap-1 pr-1 text-xs sm:text-sm whitespace-nowrap border-transparent", // Base badge styles
                                badgeType === 'default' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80', // Default (intended)
                                badgeType === 'subject' && 'bg-[hsl(210_60%_95%)] text-[hsl(210_80%_30%)] hover:bg-[hsl(210_60%_90%)] dark:bg-[hsl(210_50%_30%)] dark:text-[hsl(210_40%_95%)] dark:hover:bg-[hsl(210_50%_35%)]', // Very Light Blue
                                badgeType === 'excluded' && 'bg-[hsl(0_80%_95%)] text-[hsl(0_80%_40%)] hover:bg-[hsl(0_80%_90%)] dark:bg-[hsl(0_80%_20%)] dark:text-[hsl(0_80%_90%)] dark:hover:bg-[hsl(0_80%_25%)]' // Light Pink
                              )}
                             >
                                {value}
                                <span
                                    role="button"
                                    tabIndex={0}
                                    onMouseDown={(e) => { e.preventDefault(); }} // Prevent focus loss on mouse down
                                    onClick={(e) => removeValue(e, value)} // Handle removal on click
                                    onKeyDown={(e) => handleKeyDownRemove(e, value)}
                                    className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer" // Adjusted hover for better visibility on custom bg
                                    aria-label={`移除 ${value}`}
                                >
                                    <X className="h-3 w-3" />
                                </span>
                            </Badge>
                       ))
                    ) : (
                        <span className="truncate">请选择{label}</span>
                    )}
                 </div>
                 <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent
              className="w-[--radix-popover-trigger-width] max-w-[calc(100vw-2rem)] p-0"
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
          >
             <ScrollArea className="h-60">
                <div className="p-2">
                  {options.map((option) => (
                    <div
                      key={option}
                      onMouseDown={(e) => e.preventDefault()} // Prevents focus loss and popover closure
                      onClick={() => handleSelect(option)} // Handle selection on click
                      className={cn(
                        "flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer",
                        (maxSelection && selectedValues.length >= maxSelection && !selectedValues.includes(option)) && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Checkbox
                        id={`${field.name}-${option}`}
                        checked={selectedValues.includes(option)}
                        aria-labelledby={`${field.name}-${option}-label`}
                        disabled={maxSelection && selectedValues.length >= maxSelection && !selectedValues.includes(option)}
                        tabIndex={-1}
                      />
                      <label
                        id={`${field.name}-${option}-label`}
                        className={cn(
                          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer select-none",
                          (maxSelection && selectedValues.length >= maxSelection && !selectedValues.includes(option)) && "cursor-not-allowed"
                          )}
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
                    {/* Input uses value={field.value ?? ''} to handle undefined correctly */}
                    <Input type="number" placeholder="例如: 500" {...field} value={field.value ?? ''} />
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
                     {/* Input uses value={field.value ?? ''} to handle undefined correctly */}
                    <Input type="number" placeholder="例如: 10000" {...field} value={field.value ?? ''} />
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
                  <MultiSelectField
                      field={field}
                      label="选考科目"
                      options={SUBJECTS}
                      maxSelection={3}
                      badgeType="subject" // Set badge type for subjects
                  />
              )}
          />

         <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <FormField
                control={form.control}
                name="intendedRegions"
                render={({ field }) => (
                    <MultiSelectField field={field} label="意向地区" options={REGIONS} badgeType="default" />
                )}
            />
             <FormField
                control={form.control}
                name="intendedMajorCategories"
                render={({ field }) => (
                    <MultiSelectField field={field} label="意向专业" options={MAJOR_CATEGORIES} badgeType="default" />
                )}
            />
        </div>

         <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="excludedRegions"
                render={({ field }) => (
                    <MultiSelectField field={field} label="排除地区" options={REGIONS} badgeType="excluded" />
                )}
            />
            <FormField
                control={form.control}
                name="excludedMajorCategories"
                render={({ field }) => (
                     <MultiSelectField field={field} label="排除专业" options={MAJOR_CATEGORIES} badgeType="excluded" />
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

    