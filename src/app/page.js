import Banner from "@/components/Banner";
import BrowseByGenre from "@/components/BrowseByGenre";
import FeaturedBooks from "@/components/FeaturedBooks";
import TopWriters from "@/components/TopWriters";
import Image from "next/image";

export default function Home() {
  return (
   <div>
     <Banner/>
     <FeaturedBooks/>
     <TopWriters/>
     <BrowseByGenre/>
   </div>
  );
}
