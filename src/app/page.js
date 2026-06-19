import Banner from "@/components/Banner";
import FeaturedBooks from "@/components/FeaturedBooks";
import TopWriters from "@/components/TopWriters";
import Image from "next/image";

export default function Home() {
  return (
   <div>
     <Banner/>
     <FeaturedBooks/>
     <TopWriters/>
   </div>
  );
}
