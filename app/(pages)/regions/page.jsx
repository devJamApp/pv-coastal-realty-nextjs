import Banner from "@/app/components/Banner"
import { regions } from "@/data"
import { MdLocationPin } from 'react-icons/md'
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify"
import Contact from "@/app/components/Contact"

const Page = () => {

  return (
    <>
      <Banner title="Regions" />
      <div className="flex flex-col p-8">
        <h2 className="text-4xl font-bold pb-2 border-b">
          Browse Properties By Region
        </h2>
        <ul className="flex flex-col space-y-12 py-8">
          {regions.map((region, i) => {
            return (
              <li key={i} className="flex flex-row space-x-8">
                    <div className="relative w-1/2">
                    <Image
                        src={region.imageUrl} 
                        fill={true}
                        className="rounded-l-md object-cover"
                    />
                    </div>
                <div className="flex flex-col w-1/2 space-y-2">
                  <div className="flex flex-col grow">
                      <h3 className="font-medium text-4xl border-b pb-2 mb-2">
                        {region.title}
                      </h3>
                        <p>
                            {region.description}
                        </p>
                    </div>
                    <div className="py-1 space-y-2">
                    <span className="font-medium">
                      Choose A Zone To View Properties:
                    </span>
                      <ul>
                        {region.zones.map((zone) => {
                          return (
                            <li 
                              key={zone.id}
                              className="flex flex-row items-center space-x-2"
                            >
                              <MdLocationPin className="text-lg text-sky-500" />
                              <Link
                                href={`/regions/${slugify(region.title, { lower: true })}/zones/${slugify(zone.title, { lower: true })}`}
                                className="hover:text-sky-600 hover:font-medium"
                              >
                                {zone.title}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <Link href={`/regions/${slugify(region.title, { lower: true })}`} className="button">
                    Properties in {region.title}
                  </Link>
                  </div>         
              </li>
            )
          })}
        </ul>
      </div>
        <Contact />
    </>
  )

}

export default Page