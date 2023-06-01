import Link from "next/link"
import Image from "next/image"
import { IoLogoInstagram, IoLogoFacebook, IoChatboxEllipsesOutline } from 'react-icons/io5'
import { navMenu } from "@/data"

const Footer = () => {
  return (
    <footer>
      <div className="relative bg-zinc-100 p-8 rounded-t-md shadow-lg flex flex-row items-center">
        <div className="flex flex-col items-center space-y-4">
        <Link 
            href="/" 
            className="relative mr-auto my-auto"
        >
            <Image 
                src="/pv-coastal-realty-logo.png"
                alt="PV Coastal Realty - Discover Your Paradise"
                width={160}
                height={160}
                className="scale-75 md:scale-100"
            />
        </Link>
        <div className="flex flex-row items-center space-x-3 text-3xl text-sky-600">
            <a 
                title="Facebook"
                href="https://www.facebook.com/pvcoastalrealty" 
                target="_blank" 
                referrerPolicy="no-referrer"
            >
                <IoLogoFacebook
                 className="hover:scale-105 hover:text-sky-400 drop-shadow-lg"
                />
            </a>
            <a 
                title="Instagram"
                href="https://www.instagram.com/pvcoastalrealty/" 
                target="_blank" 
                referrerPolicy="no-referrer"
            >
                <IoLogoInstagram
                 className="hover:scale-105 hover:text-sky-400 drop-shadow-lg"
                />
            </a>
            <Link
                title="Contact"
                href="/contact"
            >
                <IoChatboxEllipsesOutline
                    className="hover:scale-105 hover:text-sky-400 drop-shadow-lg"
                />
            </Link>
        </div>
        </div>
        <ul className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-row space-x-6 text-zinc-900 text-xl font-medium mx-auto">
            {navMenu.map((item, i) => {
                return (   
                <li 
                    key={i}
                    tabIndex={i}
                >
                    <Link href={item.path} className="hover:text-sky-500 transition-colors">
                        {item.title}
                    </Link>      
                </li>
                )
            })}
        </ul>
        <div className="flex flex-row items-center ml-auto">
        <a href="/">
              <Image 
                  loading="lazy"
                  src="/point-2-homes-logo.png"
                  alt="Point 2 Homes"
                  width={120}
                  height={120}
              />
          </a>
          <a href="/">
              <Image 
                  loading="lazy"
                  src="/realtor-logo.png"
                  alt="Realtor"
                  width={120}
                  height={120}
              />
          </a>
          <a href="/">
              <Image 
                  loading="lazy"
                  src="/logo-mls-vallarta.svg"
                  alt="MLS Vallarta"
                  width={100}
                  height={100}
              />
          </a>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-2 justify-center bg-sky-900 p-4 text-zinc-50 ">
        <span>
          Copyright © 2023 PV Coastal Realty.
        </span>
        <a 
          href="https://www.devjam.app/" 
          target="_blank" 
          referrerPolicy="no-referrer"
          className="hover:brightness-125 hover:text-sky-200 font-medium"
        >
          Powered by devJam.
        </a>
      </div>
    </footer>
  )
}

export default Footer