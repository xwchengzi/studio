
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Major, getMajorRecommendations, MajorRecommendationFilter } from '@/services/major-recommendation';
import { generatePersonalizedRecommendations, GeneratePersonalizedRecommendationsInput } from '@/ai/flows/generate-personalized-recommendations';
import { RecommendationTable } from '@/components/recommendation-table';
import { RecommendationFilters } from '@/components/recommendation-filters';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

function RecommendationsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [majors, setMajors] = useState<Major[]>([]);
  const [filteredMajors, setFilteredMajors] = useState<Major[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState<string | null>(null);
  const [initialFilters, setInitialFilters] = useState<MajorRecommendationFilter | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setReasoning(null);

      const gaokaoScore = searchParams.get('gaokaoScore');
      const provinceRanking = searchParams.get('provinceRanking');
      const selectedSubjects = searchParams.get('selectedSubjects')?.split(',') || []; // Read selected subjects
      const intendedRegions = searchParams.get('intendedRegions')?.split(',') || [];
      const intendedMajorCategories = searchParams.get('intendedMajorCategories')?.split(',') || [];
      const excludedRegions = searchParams.get('excludedRegions')?.split(',') || [];
      const excludedMajorCategories = searchParams.get('excludedMajorCategories')?.split(',') || [];

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


      const input: GeneratePersonalizedRecommendationsInput = {
        gaokaoScore: parseInt(gaokaoScore, 10),
        provinceRanking: parseInt(provinceRanking, 10),
        selectedSubjects: selectedSubjects, // Pass selected subjects to AI input
        intendedRegions: intendedRegions.length > 0 ? intendedRegions : undefined,
        intendedMajorCategories: intendedMajorCategories.length > 0 ? intendedMajorCategories : undefined,
        excludedRegions: excludedRegions.length > 0 ? excludedRegions : undefined,
        excludedMajorCategories: excludedMajorCategories.length > 0 ? excludedMajorCategories : undefined,
      };

      // Set initial filters based on intended regions/categories
      setInitialFilters({
        regions: intendedRegions.length > 0 ? intendedRegions : undefined,
        majorCategories: intendedMajorCategories.length > 0 ? intendedMajorCategories : undefined,
      });


      try {
        // Option 1: Use AI for initial recommendations (if desired)
         const aiResult = await generatePersonalizedRecommendations(input);
         // Assuming aiResult.recommendedMajors is structured similarly to Major[]
         // You might need to adapt this based on the actual AI output structure.
         // Ensure the AI output matches the `Major` interface or map it accordingly.
         // Filter AI results based on subject requirements (client-side for now, AI should handle this ideally)
         const compatibleMajors = aiResult.recommendedMajors.filter(major =>
             // Implement logic to check if major.subjectRequirements is compatible with input.selectedSubjects
             // This requires adding 'subjectRequirements' to the Major interface and data
             // For now, assume all AI recommendations are compatible or skip filtering
             true // Placeholder: Assume compatibility for now
         );
         setMajors(compatibleMajors);
         setFilteredMajors(compatibleMajors);
         setReasoning(aiResult.reasoning);

        // Option 2: Use the mock service directly for now (Commented out as AI is primary)
        /*
        const filter: MajorRecommendationFilter = {
          regions: input.intendedRegions,
          majorCategories: input.intendedMajorCategories,
          // Other filters will be applied client-side for now
        };
        const recommendedMajors = await getMajorRecommendations(filter);
         // Filter mock results based on subject requirements
         const compatibleMockMajors = recommendedMajors.filter(major =>
             // Implement logic as above, using mock data's subject requirements
             true // Placeholder
         );
        setMajors(compatibleMockMajors);
        setFilteredMajors(compatibleMockMajors); // Initially show all recommendations
        setReasoning("以下是根据您的初步意向和选考科目筛选的专业列表。您可以使用筛选栏进一步细化结果。"); // Updated Mock reasoning
        */

      } catch (err) {
        console.error('获取推荐失败:', err);
        setError(`获取专业推荐时出错: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleFilterChange = (filters: MajorRecommendationFilter) => {
      // Client-side filtering based on all filter criteria
      let tempMajors = [...majors]; // Start with AI/mock recommendations already filtered by subjects

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
        // Add filtering based on subject requirements if needed client-side (though ideally done earlier)
        // e.g., if filter includes subject criteria

      setFilteredMajors(tempMajors);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/4" />
       <Skeleton className="h-20 w-full" /> {/* Placeholder for reasoning */}
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
          {reasoning && (
            <Alert className="mb-4 sm:mb-6 bg-secondary border-secondary-foreground/20"> {/* Adjusted margin */}
              <AlertTitle className="text-secondary-foreground font-semibold">智能分析</AlertTitle>
              <AlertDescription className="text-secondary-foreground/80">{reasoning}</AlertDescription>
            </Alert>
          )}
          <RecommendationFilters
            onFilterChange={handleFilterChange}
            initialFilters={initialFilters || {}} // Pass initial filters
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
