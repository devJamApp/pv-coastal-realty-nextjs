import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative h-screen">
        
        <Image 
          priority
          loading="eager"
          src="/vallarta-hero.webp"
          fill={true}
          className="object-cover z-10"
          alt="PV Coastal Realty: Discover Your Paradise"
          placeholder="blur"
          blurDataURL="/vallarta-hero.webp"
        />
        <div className="absolute top-0 left-0 z-20 bg-gradient-to-b from-transparent via-zinc-900/70 to-transparent h-full w-full" />
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30">
          <div className="flex flex-col items-center space-y-10 max-w-3xl">
              <h1 className="text-6xl font-medium bg-clip-text text-transparent bg-gradient-to-t from-blue-400 via-blue-400 to-blue-500 drop-shadow-lg brightness-125">
              Discover Your Paradise
              </h1>
              <p className="text-center text-zinc-50 text-2xl font-medium">
              Welcome to magical Puerto Vallarta, where dreams are realized and memories are made. 
              </p>
              <a 
                href="#featured-properties"
                role="button"
                className="text-xl font-medium text-zinc-50 px-6 py-4 rounded-md w-fit bg-gradient-to-t from-emerald-300/10 to-sky-500/20 hover:brightness-125 transition-all shadow-lg"
              >
                Find Your Dream Home Today
              </a>
          </div>
        </div>
    </div>
  )
}

export default Hero