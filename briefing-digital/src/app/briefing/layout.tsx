import { ResumePrompt } from "@/components/briefing/ResumePrompt";
import { AutosaveToast } from "@/components/briefing/AutosaveToast";
import { BriefingHeader } from "@/components/briefing/BriefingHeader";

export default function BriefingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <BriefingHeader />
      <main className="flex flex-1 items-start justify-center px-5 pt-10 pb-32 md:px-10 md:pt-16">
        <div className="w-full max-w-[720px]">{children}</div>
      </main>
      <ResumePrompt />
      <AutosaveToast />
    </div>
  );
}
