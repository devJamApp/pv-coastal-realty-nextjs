import { getFeatured } from "../mls"
import Link from "next/link"
import FeaturedCarousel from "./FeaturedCarousel"

const Featured = async () => {

  const properties = await getFeatured(8)

  return (
    <div id="featured-properties" className="flex flex-col px-8 py-16">
      <div className="flex flex-row pb-2 border-b space-x-4">
        <h2 className="text-4xl font-bold">
          Featured Properties
        </h2>
        <Link 
          href="/featured-properties"
          className="self-end hover:underline"
        >
          View All
        </Link>
      </div>
      <FeaturedCarousel properties={properties} />
    </div>
  )
}

export default Featured