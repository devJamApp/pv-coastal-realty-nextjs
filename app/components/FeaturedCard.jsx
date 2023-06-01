import Image from "next/image"
import { MdLocationPin } from 'react-icons/md'
import FeaturesList from "./FeaturesList"
import Link from "next/link"

const FeaturedCard = ({ property }) => {

  return (
    <div id={property.id} className="carousel-item w-full flex flex-row space-x-8 py-8" >
      <div className="flex flex-col grow w-1/2">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-2">
            <h3 className="font-medium text-3xl">
              {property.title}
            </h3>
            <span className="text-2xl self-end text-neutral-500">
              {property.price.current}
            </span>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <MdLocationPin className="text-sky-600 text-2xl" />
            <span className="text-lg">
              {property.address.city}, {property.address.state}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-2 my-auto">
          {property.description.en}
        </div>
        { property.features &&
          <div className="flex flex-col my-auto space-y-2">
            <span className="text-2xl">Features</span>
            <FeaturesList features={property.features} />
          </div>
        }
        <Link 
          href={`/properties/${property.id}`} 
          className="button"
        >
            View Property
        </Link>
      </div>
      <div className="relative w-1/2 min-h-[500px]">
        <Image 
          src={property.images[0].url} 
          fill={true}
          className="rounded-r-md object-cover"
          alt={property.images[0].alt}
          placeholder="blur"
          blurDataURL={property.images[0].placeholder}
        />
      </div>
    </div> 
  )
}

export default FeaturedCard