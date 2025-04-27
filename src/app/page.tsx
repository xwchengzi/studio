import { StudentInfoForm } from '@/components/student-info-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 bg-gradient-to-br from-background to-accent/20">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-primary">
          浙志愿
        </h1>
        <StudentInfoForm />
      </div>
    </main>
  );
}
