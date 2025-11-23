import { Navbar } from "@/components/navbar";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { Feed } from "@/components/feed/feed";

export default function Home() {
  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 flex overflow-hidden pt-0 justify-center">
        <div className="w-full h-full max-w-[1300px] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">

          {/* LEFT SIDEBAR */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-3 h-full overflow-y-auto no-scrollbar border-r border-border/40 bg-card/30">
            <LeftSidebar />
          </div>

          {/* MAIN FEED */}
          <div className="col-span-1 lg:col-span-6 xl:col-span-6 h-full overflow-y-auto no-scrollbar bg-background/50 overscroll-contain">
            <div className="max-w-[650px] mx-auto py-6 px-4">
              <Feed />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="hidden xl:block xl:col-span-3 h-full overflow-y-auto no-scrollbar border-l border-border/40 bg-card/30">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

