import Banner from "./components/Banner";
import FeaturedSection from "./components/FeaturedSection";
import HomepageProperty from "./components/HomepageProperty";
import TopLocations from "./components/TopLocation";

export default function Home() {
  return (
    <div>
      <Banner />
      <HomepageProperty />
      <TopLocations/>
      <FeaturedSection/>
    </div>
  );
}
