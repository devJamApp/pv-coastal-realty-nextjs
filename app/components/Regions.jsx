import { popularRegions } from "@/data"
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify"

const Regions = () => {

  return (
    <div className="flex flex-col px-8">
      <div className="flex flex-row pb-2 border-b space-x-4">
        <h2 className="text-4xl font-bold">
          Popular Areas
        </h2>
        <Link 
          href="/regions"
          className="self-end hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-col py-8 space-y-8 xl:space-y-16">
        {popularRegions.map((region, i) => {
          return (
            <div key={region.id} className="flex flex-row space-x-8 h-[400px]">
                <div className="relative w-1/2">
                <Image 
                    src={region.imageUrl} 
                    fill={true}
                    className="rounded-l-md object-cover"
                    alt={`PV Coastal Realty: ${region.title} Region`}
                />
                </div>
            <div className="flex flex-col w-1/2">
              <div className="flex flex-col grow">
                  <h3 className="font-medium text-4xl border-b pb-2">
                    {region.title}
                  </h3>
                    <p className="my-auto text-lg">
                        {region.description}
                    </p>
                </div>
                <Link 
                href={`/regions/${slugify(region.region, { lower: true })}/zones/${slugify(region.title, { lower: true })}`}
                className="button"
              >
                Properties in {region.title}
              </Link>
              </div>         
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Regions