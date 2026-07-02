import Banner from "@/components/Banner";
import BookMarquee from "@/components/BookMarquee";
import BrowseByGenre from "@/components/BrowseByGenre";
import FeaturedBooks from "@/components/FeaturedBooks";
import PlatformStats from "@/components/PlatformStats";
import TopWriters from "@/components/TopWriters";



export default function Home() {
  return (
   <div>
     <Banner/>
     <BookMarquee/>
     <FeaturedBooks/>
     <TopWriters/>
     <PlatformStats/>
     <BrowseByGenre/>
   </div>
  );
}
