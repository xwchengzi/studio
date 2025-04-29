

'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Major, getMajorDetails } from '@/services/major-recommendation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Loader2, Building, GraduationCap, MapPin, BookOpen, CalendarDays, Wallet, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils'; // Import cn

function MajorDetailsPageContent() {
    const params = useParams();
    const router = useRouter();
    const [majorDetails, setMajorDetails] = useState<Major | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const universityName = params.university ? decodeURIComponent(params.university as string) : '';
    const majorCode = params.majorCode ? decodeURIComponent(params.majorCode as string) : '';

    useEffect(() => {
        const fetchDetails = async () => {
            if (!universityName || !majorCode) {
                setError('无效的院校或专业代码。');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const details = await getMajorDetails(majorCode, universityName);
                if (details) {
                    setMajorDetails(details);
                } else {
                    setError(`未找到院校 "${universityName}" 的专业代码为 "${majorCode}" 的详细信息。`);
                }
            } catch (err) {
                console.error('获取专业详情失败:', err);
                setError(`获取专业详情时出错: ${err instanceof Error ? err.message : String(err)}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [universityName, majorCode]);

    const DetailItem = ({ icon: Icon, label, value, valueClassName }: { icon: React.ElementType, label: string, value?: string | number | boolean | null, valueClassName?: string }) => {
        let displayValue: React.ReactNode = '-';
        if (value !== null && value !== undefined) {
            if (typeof value === 'boolean') {
                displayValue = value ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />;
            } else {
                displayValue = value.toString();
            }
        }

        return (
            <div className="flex items-start space-x-2 text-sm">
                <Icon className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="font-medium text-muted-foreground min-w-[60px]">{label}:</span>
                <span className={cn("text-foreground", valueClassName)}>{displayValue}</span>
            </div>
        );
    };

     const AdmissionDataRow = ({ year, score, ranking }: { year: number | string, score: number | null, ranking: number | null }) => (
        <div className="grid grid-cols-3 gap-2 text-sm py-1 border-b last:border-b-0">
            <div className="text-muted-foreground">{year}{typeof year === 'number' ? '年' : ''}</div>
            <div className="text-right">{score ?? '-'}</div>
            <div className="text-right">{ranking ?? '-'}</div>
        </div>
    );


    const LoadingSkeleton = () => (
        <div className="space-y-6">
            <Skeleton className="h-8 w-1/4 mb-6" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                     <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                     <Skeleton className="h-4 w-2/3" />
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                     <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-3">
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     {/* Remove skeleton rows for older years */}
                </CardContent>
            </Card>
        </div>
    );

    if (isLoading) {
        return (
             <main className="container mx-auto p-4 sm:p-6">
                <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-4 sm:mb-6 group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    返回
                </Button>
                <LoadingSkeleton />
             </main>
        );
    }

    if (error) {
        return (
            <main className="container mx-auto p-4 sm:p-6">
                 <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-4 sm:mb-6 group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    返回
                </Button>
                <Alert variant="destructive">
                    <AlertTitle>错误</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </main>
        );
    }

    if (!majorDetails) {
        // Should ideally be caught by the error state, but as a fallback
         return (
             <main className="container mx-auto p-4 sm:p-6">
                  <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-4 sm:mb-6 group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    返回
                 </Button>
                 <p>未找到专业信息。</p>
             </main>
        );
    }

    const is985 = majorDetails.universityTier === '985';
    const is211 = majorDetails.universityTier === '211' || is985; // 985 are also 211
    const isDoubleFirstClass = majorDetails.universityTier === '双一流' || is985 || is211; // 985/211 are usually Double First Class


    return (
        <main className="container mx-auto p-4 sm:p-6">
            <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-4 sm:mb-6 group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                返回推荐列表
            </Button>

             <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-primary">{majorDetails.university} - {majorDetails.majorName}</h1>
            <p className="text-sm text-muted-foreground mb-6">专业代码: {majorDetails.majorCode}</p>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* University Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Building className="h-5 w-5 text-primary" />
                            院校信息
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <div className="flex flex-wrap gap-2 mb-3">
                            {is985 && <Badge variant="outline" className="border-blue-500 text-blue-700 bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:bg-blue-900/30">985</Badge>}
                            {is211 && <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50 dark:border-green-400 dark:text-green-300 dark:bg-green-900/30">211</Badge>}
                            {isDoubleFirstClass && <Badge variant="outline" className="border-purple-500 text-purple-700 bg-purple-50 dark:border-purple-400 dark:text-purple-300 dark:bg-purple-900/30">双一流</Badge>}
                            {majorDetails.universityTier && !['985', '211', '双一流'].includes(majorDetails.universityTier) && (
                                <Badge variant="secondary">{majorDetails.universityTier}</Badge>
                             )}
                        </div>
                        <DetailItem icon={GraduationCap} label="院校层次" value={majorDetails.universityLevel} />
                        <DetailItem icon={Building} label="办学性质" value={majorDetails.universityType} />
                        <DetailItem icon={MapPin} label="所在地区" value={majorDetails.region} />
                         <DetailItem icon={MapPin} label="所在省份" value={majorDetails.province} />
                    </CardContent>
                </Card>

                 {/* Major Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                             <BookOpen className="h-5 w-5 text-primary" />
                             专业信息
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <DetailItem icon={BookOpen} label="专业名称" value={majorDetails.majorName} />
                        <DetailItem icon={BookOpen} label="专业代码" value={majorDetails.majorCode} />
                         <DetailItem icon={GraduationCap} label="保研情况" value={majorDetails.hasPostgraduateRecommendation ? '有' : '暂无信息'} />
                        <DetailItem icon={CalendarDays} label="学制" value={majorDetails.schoolingLength} />
                        <DetailItem icon={Wallet} label="学费(年)" value={majorDetails.tuition ? `${majorDetails.tuition}元` : '暂无信息'} />
                        <DetailItem icon={GraduationCap} label="选科要求" value={majorDetails.subjectRequirements ?? '不详'} valueClassName="whitespace-pre-wrap"/>
                    </CardContent>
                </Card>

                {/* Admission Data Card */}
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            历年录取数据 (浙江)
                        </CardTitle>
                    </CardHeader>
                     <CardContent>
                        <div className="grid grid-cols-3 gap-2 text-sm font-medium mb-2 px-1">
                            <div>年份</div>
                            <div className="text-right">录取分数</div>
                             <div className="text-right">录取位次</div>
                        </div>
                         <Separator className="mb-2"/>
                        <AdmissionDataRow year={2024} score={majorDetails.admissionScore2024} ranking={majorDetails.admissionRanking2024} />
                        <AdmissionDataRow year={2023} score={majorDetails.admissionScore2023} ranking={majorDetails.admissionRanking2023} />
                        <AdmissionDataRow year={2022} score={majorDetails.admissionScore2022} ranking={majorDetails.admissionRanking2022} />
                        {/* Remove admission data rows for 2017-2021 */}
                        {/* <AdmissionDataRow year={2021} score={majorDetails.admissionScore2021} ranking={majorDetails.admissionRanking2021} />
                        <AdmissionDataRow year={2020} score={majorDetails.admissionScore2020} ranking={majorDetails.admissionRanking2020} />
                        <AdmissionDataRow year={2019} score={majorDetails.admissionScore2019} ranking={majorDetails.admissionRanking2019} />
                        <AdmissionDataRow year={2018} score={majorDetails.admissionScore2018} ranking={majorDetails.admissionRanking2018} />
                        <AdmissionDataRow year={2017} score={majorDetails.admissionScore2017} ranking={majorDetails.admissionRanking2017} /> */}
                        <Separator className="mt-2 mb-2"/>
                         <AdmissionDataRow year="2025预估" score={null} ranking={majorDetails.estimatedRanking2025} />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}


export default function MajorDetailsPage() {
    // Wrap with Suspense because useParams() might suspend
    return (
        <Suspense fallback={<MajorDetailsLoading />}>
            <MajorDetailsPageContent />
        </Suspense>
    );
}

function MajorDetailsLoading() {
    // Basic loading indicator for Suspense boundary
    return (
        <main className="container mx-auto p-4 sm:p-6 md:p-8 flex justify-center items-center min-h-screen">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </main>
    );
}
