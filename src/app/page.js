import Banner from "@/components/Banner";
import BookMarquee from "@/components/BookMarquee";
import BrowseByGenre from "@/components/BrowseByGenre";
import FeaturedBooks from "@/components/FeaturedBooks";
import PlatformStats from "@/components/PlatformStats";
import TopWriters from "@/components/TopWriters";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
   <main className="min-h-screen bg-[#06090F] selection:bg-[#E5BA73] selection:text-black">
     <Banner/>
     <HowItWorks/>
     {/* <BookMarquee/> */}
     <FeaturedBooks/>
     <TopWriters/>
     <PlatformStats/>
     <BrowseByGenre/>
   </main>
  );
}
