import { StudentInfoForm } from '@/components/student-info-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 bg-gradient-to-br from-background to-accent/20">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-primary">
          <span>2025年高考志愿</span> {/* Updated heading */}
          {/* Updated font size class for the subtitle */}
          <span className="block text-xl sm:text-2xl font-normal text-muted-foreground mt-1">（浙江专版）</span>
        </h1>
        <StudentInfoForm />
      </div>
    </main>
  );
}

