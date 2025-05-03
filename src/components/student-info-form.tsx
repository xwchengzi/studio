
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
    .number({ invalid_type_error: '请输入有效分数', required_error: '高考分数不能为空' })
    .min(0, '分数不能为负')
    .max(750, '分数不能超过750'),
  provinceRanking: z.coerce
    .number({ invalid_type_error: '请输入有效排名', required_error: '所在位次不能为空' })
    .int('排名必须是整数')
    .min(1, '排名必须大于0'),
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
      gaokaoScore: undefined, // Use undefined for controlled component with placeholder
      provinceRanking: undefined, // Use undefined for controlled component with placeholder
      selectedSubjects: [],
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
        params.set('selectedSubjects', values.selectedSubjects.join(','));
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
              return; // Exit if max selection reached
          }
          newValues = [...selectedValues, option];
      }
      field.onChange(newValues);
      // No explicit control of 'isOpen' needed here, relying on preventDefault below
    };

    const removeValue = (e: React.MouseEvent | React.KeyboardEvent, valueToRemove: string) => {
        e.stopPropagation(); // Prevent trigger click
        e.preventDefault(); // Prevent trigger click/focus behavior
        const newValues = selectedValues.filter((v: string) => v !== valueToRemove);
        field.onChange(newValues);
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
              {/* The outer button that triggers the popover */}
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
                                "flex items-center gap-1 pr-1 text-xs sm:text-sm whitespace-nowrap border-transparent cursor-default", // Base badge styles, make non-interactive visually
                                badgeType === 'default' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80', // Default (intended)
                                badgeType === 'subject' && 'bg-[hsl(210_60%_95%)] text-[hsl(210_80%_30%)] hover:bg-[hsl(210_60%_90%)] dark:bg-[hsl(210_50%_30%)] dark:text-[hsl(210_40%_95%)] dark:hover:bg-[hsl(210_50%_35%)]', // Very Light Blue
                                badgeType === 'excluded' && 'bg-[hsl(0_80%_95%)] text-[hsl(0_80%_40%)] hover:bg-[hsl(0_80%_90%)] dark:bg-[hsl(0_80%_20%)] dark:text-[hsl(0_80%_90%)] dark:hover:bg-[hsl(0_80%_25%)]' // Light Pink/Red
                              )}
                             >
                                {value}
                                {/* Use a span instead of button for the remove icon */}
                                <span
                                    role="button" // Keep role for accessibility
                                    tabIndex={0} // Make it focusable
                                    onMouseDown={(e) => {
                                        // Prevent popover close AND badge click propagation
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={(e) => removeValue(e, value)} // Handle removal on click
                                    onKeyDown={(e) => handleKeyDownRemove(e, value)} // Handle removal with keyboard
                                    className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer" // Adjusted hover
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
              // Prevent focus from immediately moving back to the trigger, helps keep popover open
              onOpenAutoFocus={(e) => e.preventDefault()}
          >
             <ScrollArea className="h-60">
                <div className="p-2">
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option);
                    const isDisabled = maxSelection && selectedValues.length >= maxSelection && !isSelected;
                    return (
                      // This div represents a selectable item container
                      <div
                        key={option}
                        className={cn(
                          "flex items-center space-x-2 p-2 rounded-md",
                          isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-accent cursor-pointer"
                        )}
                        // Important: Prevent default mouse down behavior on the container
                        // This stops the popover trigger from losing focus and closing
                        onMouseDown={(e) => {
                           if (!isDisabled) {
                             e.preventDefault();
                           }
                        }}
                        // Handle the actual selection logic on click
                        onClick={() => {
                           if (!isDisabled) {
                             handleSelect(option);
                           }
                        }}
                      >
                        <Checkbox
                          id={`${field.name}-${option}`}
                          checked={isSelected}
                          disabled={isDisabled}
                          aria-labelledby={`${field.name}-${option}-label`}
                          tabIndex={-1} // Make checkbox non-focusable, rely on parent div click
                          className="pointer-events-none" // Ensure checkbox doesn't interfere with div's click
                        />
                        <label
                          id={`${field.name}-${option}-label`}
                          htmlFor={`${field.name}-${option}`} // Associate label with checkbox for accessibility
                          className={cn(
                            "text-sm font-medium leading-none flex-1 select-none", // Added select-none
                            isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                          )}
                          // Prevent default mouse down on label too, just in case
                          onMouseDown={(e) => {
                             if (!isDisabled) {
                               e.preventDefault();
                             }
                          }}
                        >
                          {option}
                        </label>
                      </div>
                    );
                  })}
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
