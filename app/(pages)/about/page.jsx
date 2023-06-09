import Banner from "@/app/components/Banner"
import Contact from "@/app/components/Contact"
import { agents } from "@/data"
import Image from "next/image"

const Page = () => {
  return (
    <>
    <Banner title="About Us"/>
    <div className="flex flex-col space-y-8 p-4 md:p-8 lg:py-16">
      <h2 className="text-4xl font-bold pb-2 border-b">
          About Us
      </h2>
      <p>
        PV Coastal Realty description
      </p>
      <h3 className="pb-2 border-b">
        Our Agents
      </h3>
      <ul className="flex flex-col space-y-4">
        {agents.map((agent, i) => {
          return (
            <li 
              className="flex flex-col md:flex-row items-center"
              key={i}
            >
              <div className="relative rounded-full w-[200px] h-[200px]">
                <Image
                  className="object-fit"
                  src={agent.imageUrl ? agent.imageUrl : './avatar.webp'}
                  alt={`PV Coastal Realty: Meet Agent ${agent.name}`}
                  fill={true}
                />
              </div>
              <div className="flex flex-col">
                <h3>
                  {agent.name}
                </h3>
                <p>
                  {agent.description}
                </p>
                <button className="button">
                  Contact {agent.name} Today!
                </button>
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