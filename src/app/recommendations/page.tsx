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
      const intendedRegions = searchParams.get('intendedRegions')?.split(',') || [];
      const intendedMajorCategories = searchParams.get('intendedMajorCategories')?.split(',') || [];
      const excludedRegions = searchParams.get('excludedRegions')?.split(',') || [];
      const excludedMajorCategories = searchParams.get('excludedMajorCategories')?.split(',') || [];

      if (!gaokaoScore || !provinceRanking) {
        setError('缺少考生分数或排名信息。');
        setIsLoading(false);
        return;
      }

      const input: GeneratePersonalizedRecommendationsInput = {
        gaokaoScore: parseInt(gaokaoScore, 10),
        provinceRanking: parseInt(provinceRanking, 10),
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
         // const recommendedMajors = aiResult.recommendedMajors as Major[];
         // setMajors(recommendedMajors);
         // setFilteredMajors(recommendedMajors);
         // setReasoning(aiResult.reasoning);

        // Option 2: Use the mock service directly for now
        const filter: MajorRecommendationFilter = {
          regions: input.intendedRegions,
          majorCategories: input.intendedMajorCategories,
          // Other filters will be applied client-side for now
        };
        const recommendedMajors = await getMajorRecommendations(filter);
        setMajors(recommendedMajors);
        setFilteredMajors(recommendedMajors); // Initially show all recommendations
        setReasoning("以下是根据您的初步意向筛选的专业列表。您可以使用筛选栏进一步细化结果。"); // Mock reasoning


      } catch (err) {
        console.error('获取推荐失败:', err);
        setError('获取专业推荐时出错，请稍后重试。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleFilterChange = (filters: MajorRecommendationFilter) => {
      // Client-side filtering based on all filter criteria
      let tempMajors = [...majors];

      if (filters.regions && filters.regions.length > 0) {
          // Assuming university data includes region, which is missing in the mock.
          // This part needs adjustment once real data/API is available.
          // For now, let's simulate filtering by university name as a placeholder.
          // tempMajors = tempMajors.filter(major => filters.regions?.some(region => major.university.includes(region)));
          // Since no region info in mock, we skip this filter for now or use a placeholder logic
           console.warn("Region filtering not fully implemented with mock data.");
      }
      if (filters.majorCategories && filters.majorCategories.length > 0) {
          // Assuming major data includes category, which is missing in the mock.
           // This part needs adjustment once real data/API is available.
           // For now, let's simulate filtering by major name as a placeholder.
          // tempMajors = tempMajors.filter(major => filters.majorCategories?.some(cat => major.majorName.includes(cat)));
           console.warn("Major Category filtering not fully implemented with mock data.");
      }
      if (filters.schoolingLength) {
           // No schoolingLength in mock data
           console.warn("Schooling Length filtering not implemented with mock data.");
      }
       if (filters.tuitionRange) {
           // No tuitionRange in mock data
            console.warn("Tuition Range filtering not implemented with mock data.");
       }
       if (filters.universityTier) {
           // No universityTier in mock data
           console.warn("University Tier filtering not implemented with mock data.");
       }


      setFilteredMajors(tempMajors);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/4" />
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
    <main className="container mx-auto p-4 sm:p-6 md:p-8">
      <Button variant="outline" size="sm" onClick={() => router.push('/')} className="mb-6 group">
         <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
         返回
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-primary">专业推荐结果</h1>

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
            <Alert className="mb-6 bg-secondary border-secondary-foreground/20">
              <AlertTitle className="text-secondary-foreground font-semibold">智能分析</AlertTitle>
              <AlertDescription className="text-secondary-foreground/80">{reasoning}</AlertDescription>
            </Alert>
          )}
          <RecommendationFilters
            onFilterChange={handleFilterChange}
            initialFilters={initialFilters || {}} // Pass initial filters
            className="mb-6 p-4 border rounded-lg shadow-sm bg-card"
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
