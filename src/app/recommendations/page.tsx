
'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Major, getMajorRecommendations, MajorRecommendationFilter } from '@/services/major-recommendation';
// Removed AI import: import { generatePersonalizedRecommendations, GeneratePersonalizedRecommendationsInput } from '@/ai/flows/generate-personalized-recommendations';
import { RecommendationTable } from '@/components/recommendation-table';
import { RecommendationFilters } from '@/components/recommendation-filters';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Info } from 'lucide-react'; // Added Info icon
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

function RecommendationsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [majors, setMajors] = useState<Major[]>([]);
  const [filteredMajors, setFilteredMajors] = useState<Major[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Removed AI reasoning state: const [reasoning, setReasoning] = useState<string | null>(null);
  const [initialFilters, setInitialFilters] = useState<MajorRecommendationFilter | null>(null);

  // Memoize parsed search parameters
  const parsedParams = useMemo(() => {
    const gaokaoScore = searchParams.get('gaokaoScore');
    const provinceRanking = searchParams.get('provinceRanking');
    const selectedSubjects = searchParams.get('selectedSubjects')?.split(',') || [];
    const intendedRegions = searchParams.get('intendedRegions')?.split(',') || [];
    const intendedMajorCategories = searchParams.get('intendedMajorCategories')?.split(',') || [];
    const excludedRegions = searchParams.get('excludedRegions')?.split(',') || [];
    const excludedMajorCategories = searchParams.get('excludedMajorCategories')?.split(',') || [];
    return {
      gaokaoScore,
      provinceRanking,
      selectedSubjects,
      intendedRegions,
      intendedMajorCategories,
      excludedRegions,
      excludedMajorCategories,
    };
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      // Removed: setReasoning(null);

      const {
        gaokaoScore,
        provinceRanking,
        selectedSubjects,
        intendedRegions,
        intendedMajorCategories,
        // excludedRegions and excludedMajorCategories are read in parsedParams but not used for initial fetch filter
      } = parsedParams;


      // Basic validation still useful
      if (!gaokaoScore || !provinceRanking) {
        setError('缺少考生分数或排名信息。');
        setIsLoading(false);
        return;
      }
       if (selectedSubjects.length !== 3) { // Validate subject count
           setError('必须选择 3 个选考科目。');
           setIsLoading(false);
           return;
       }

      // Removed AI input definition

      // Set initial filters based on intended regions/categories from the form
      const initialFilterData: MajorRecommendationFilter = {
        regions: intendedRegions.length > 0 ? intendedRegions : undefined,
        majorCategories: intendedMajorCategories.length > 0 ? intendedMajorCategories : undefined,
        // Initialize other filters based on default values or leave undefined
      };
      setInitialFilters(initialFilterData);


      try {
        // Use the mock service directly
        // Fetch initial list based ONLY on form intentions (regions/categories)
        // Further filtering (tuition, tier, etc.) is done client-side via RecommendationFilters
        const recommendedMajors = await getMajorRecommendations({
            regions: initialFilterData.regions,
            majorCategories: initialFilterData.majorCategories,
        });

        // Client-side subject compatibility check (Placeholder)
         const compatibleMockMajors = recommendedMajors.filter(major =>
             // Placeholder: Implement checkSubjectCompatibility(selectedSubjects, major.subjectRequirements) if needed
             // For now, assume all fetched majors are compatible or the requirements are just informational
             true // Example: checkSubjectCompatibility(selectedSubjects, major.subjectRequirements)
         );

        setMajors(compatibleMockMajors);
        setFilteredMajors(compatibleMockMajors); // Initially show all recommendations based on initial filter

      } catch (err) {
        console.error('获取推荐失败:', err);
        setError(`获取专业推荐时出错: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [parsedParams]); // Depend on memoized params

  const handleFilterChange = (filters: MajorRecommendationFilter) => {
      // Client-side filtering based on all filter criteria from RecommendationFilters component
      // Start with the *original* set of majors fetched based on initial form intentions
      let tempMajors = [...majors];

      // Apply filters from the RecommendationFilters component
      if (filters.regions && filters.regions.length > 0) {
          tempMajors = tempMajors.filter(major => major.region && filters.regions?.includes(major.region));
      }
      if (filters.majorCategories && filters.majorCategories.length > 0) {
           tempMajors = tempMajors.filter(major => major.majorCategory && filters.majorCategories?.includes(major.majorCategory));
      }
      if (filters.schoolingLength && filters.schoolingLength !== '全部') {
          tempMajors = tempMajors.filter(major => major.schoolingLength === filters.schoolingLength);
      }
       if (filters.tuitionRange && filters.tuitionRange !== '全部') {
           tempMajors = tempMajors.filter(major => {
              if (major.tuition === undefined || major.tuition === null) return false;
               switch (filters.tuitionRange) {
                   case '5000元以下': return major.tuition < 5000;
                   case '5000-10000元': return major.tuition >= 5000 && major.tuition <= 10000;
                   case '10000-20000元': return major.tuition > 10000 && major.tuition <= 20000;
                   case '20000元以上': return major.tuition > 20000;
                   default: return true;
               }
           });
       }
       if (filters.universityTier && filters.universityTier !== '全部') {
          tempMajors = tempMajors.filter(major => major.universityTier === filters.universityTier);
       }
       // Client-side subject compatibility check (if needed based on filters)
       // This part depends on how `checkSubjectCompatibility` would work if implemented
       // const { selectedSubjects } = parsedParams; // Get subjects
       // tempMajors = tempMajors.filter(major => checkSubjectCompatibility(selectedSubjects, major.subjectRequirements));


      setFilteredMajors(tempMajors);
  };

  // Construct the dynamic alert message
  const alertDescription = useMemo(() => {
    const {
      gaokaoScore,
      provinceRanking,
      selectedSubjects,
      intendedRegions,
      intendedMajorCategories,
      excludedRegions,
      excludedMajorCategories,
    } = parsedParams;

    let message = `根据考生${gaokaoScore ?? '未知'}分、全省排名${provinceRanking ?? '未知'}`;

    if (selectedSubjects.length > 0) {
      message += `，选考科目为 ${selectedSubjects.join('、')}`;
    } else {
      message += '，未指定选考科目';
    }

    if (intendedRegions.length > 0) {
      message += `，意向地区为 ${intendedRegions.join('、')}`;
    } else {
       message += '，未指定意向地区';
    }

    if (intendedMajorCategories.length > 0) {
      message += `，意向专业类别为 ${intendedMajorCategories.join('、')}`;
    } else {
        message += '，未指定意向专业类别';
    }

    const exclusions = [];
    if (excludedRegions.length > 0) {
        exclusions.push(`地区 ${excludedRegions.join('、')}`);
    }
    if (excludedMajorCategories.length > 0) {
         exclusions.push(`专业类别 ${excludedMajorCategories.join('、')}`);
    }

    if (exclusions.length > 0) {
        message += `，排除了 ${exclusions.join(' 和 ')}`;
    }

    message += ' 等信息，进行如下推荐。同时，您可以使用下方的筛选栏进一步精确查找。';

    return message;
  }, [parsedParams]);


  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/4" />
       {/* Removed reasoning skeleton */}
      <Skeleton className="h-10 w-full" />
      <div className="border rounded-lg overflow-hidden">
        <Skeleton className="h-12 w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full border-t" />
        ))}
      </div>
    </div>
  );

  return (
    <main className="container mx-auto p-4 sm:p-6"> {/* Adjusted padding */}
      <Button variant="outline" size="sm" onClick={() => router.push('/')} className="mb-4 sm:mb-6 group"> {/* Adjusted margin */}
         <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
         返回
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-primary">专业推荐结果</h1>

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <Alert variant="destructive">
          <AlertTitle>错误</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          {/* Dynamic Info Alert */}
          <Alert className="mb-4 sm:mb-6 bg-secondary border-secondary-foreground/20">
               <Info className="h-4 w-4 !left-4 !top-4 text-secondary-foreground/80" /> {/* Use Info icon */}
              <AlertTitle className="text-secondary-foreground font-semibold">推荐依据</AlertTitle>
              <AlertDescription className="text-secondary-foreground/80">
                {alertDescription}
              </AlertDescription>
          </Alert>

          <RecommendationFilters
            onFilterChange={handleFilterChange}
            initialFilters={initialFilters || {}} // Pass initial filters derived from form
            className="mb-4 sm:mb-6 p-3 sm:p-4 border rounded-lg shadow-sm bg-card" /* Adjusted margin & padding */
          />
          <RecommendationTable majors={filteredMajors} />
        </>
      )}
    </main>
  );
}


export default function RecommendationsPage() {
  return (
    // Wrap with Suspense for useSearchParams hook
    <Suspense fallback={<RecommendationsLoading />}>
       <RecommendationsPageContent />
    </Suspense>
  );
}

function RecommendationsLoading() {
  // Basic loading indicator for Suspense boundary
  return (
      <main className="container mx-auto p-4 sm:p-6 md:p-8 flex justify-center items-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </main>
  )
}

