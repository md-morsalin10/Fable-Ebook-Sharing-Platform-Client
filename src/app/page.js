import Banner from "@/components/Banner";
import BookMarquee from "@/components/BookMarquee";
import BrowseByGenre from "@/components/BrowseByGenre";
import FeaturedBooks from "@/components/FeaturedBooks";
import TopWriters from "@/components/TopWriters";
import { Book } from "lucide";


export default function Home() {
  return (
   <div>
     <Banner/>
     <BookMarquee/>
     <FeaturedBooks/>
     <TopWriters/>
     <BrowseByGenre/>
   </div>
  );
}
