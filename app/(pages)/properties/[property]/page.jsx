import Banner from "@/app/components/Banner"
import { getProperty } from "@/app/mls"
import ImageGallery from "@/app/components/ImageGallery"
import { MdOutlineHomeWork, MdLocationPin } from 'react-icons/md'
import FeaturesList from "@/app/components/FeaturesList"
import Mapbox from "@/app/components/Map"
import Link from "next/link"
import Contact from "@/app/components/Contact"

//process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

const Page = async ({ params : { property: id }}) => {

  const property = await getProperty(id)

  return (
    <>
      <Banner title={property?.title} image={property.images[0]?.url} />
      <div className="flex flex-col mx-auto p-4 md:p-8 xl:px-0 xl:py-16 max-w-screen-xl space-y-8 xl:space-y-16">
        <div className="flex flex-row space-x-8 2xl:space-x-16">
          <div className="w-1/2" title="Property Images">
            <ImageGallery images={property.images} />
          </div>
          <div className="flex flex-col w-1/2 space-y-3">
            <div className="flex flex-row pb-2 border-b space-x-4">
              <h2 className="font-bold text-4xl" title="Property Name">
                {property?.title}
              </h2>
              <span className="text-neutral-500/80 text-3xl self-end" title="Price">
                {property?.price?.current}
              </span>
              <span className="self-end">MLV# {property.mlvId}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row items-center space-x-3">
                <MdLocationPin className="text-2xl text-sky-600"/>
                <a 
                  title="Open in Google Maps"
                  href={`https://www.google.com/maps/search/${property.address?.street?.replace(' ','+')},+${property.address?.city?.replace(' ','+')},+${property.address?.state?.replace(' ','+')}+/@${property.address?.coordinates?.lat},${property.address?.coordinates?.lon}?entry=ttu`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-lg hover:underline"
                >
                  {property.address.street}, {property.address.city}, {property.address.state}
                </a>
              </div>
              <div className="flex flex-col text-lg my-6">
                {property?.type?.en &&
                  <div className="flex flex-row items-center space-x-2" title="Property Type">
                    <MdOutlineHomeWork className="text-2xl" />
                    <span>
                      {property.type.en}
                    </span>
                  </div>
                }
                {property?.features && 
                  <FeaturesList features={property.features} />
                }
              </div>
            </div>
            <p className="text-lg grow" title="Property Description">
              {property.description.en}
            </p>
            <Link href="/contact" className="button">
            Contact PV Coastal Realty To Learn More
          </Link>
          </div>

        </div>
        <div className="flex flex-col space-y-8">
          <div className="w-full h-[500px]">
              <Mapbox 
                title={property.title}
                coordinates={{lat: property.address?.coordinates?.lat, lng: property.address?.coordinates?.lon}} 
                zoom={13} 
              />
          </div>

                <p className="italic text-sm">
                  The listings on this site are part of MLSVallarta’s database and not necessarily the listings of the website owner. They are displayed courtesy of the MLSVallarta API and information provided is deemed to be reliable but not guaranteed.
                </p>
  
        </div>
      </div>
      <Contact />
    </>
  )
}

export default Page