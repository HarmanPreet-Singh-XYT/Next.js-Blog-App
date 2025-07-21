'use client'
import { useRouter } from "next/navigation";
import { LoginMenu } from "../login";


export default function Navbar({currentSection}:{currentSection:string}) {
    const scrollToSection = (section:string) => {
        document.getElementById(section)!.scrollIntoView({ behavior: "smooth" });
      };
    const router = useRouter();
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-gray-800/40 backdrop-blur-md rounded-full shadow-lg border border-gray-700 z-50">
      <ul className="flex space-x-6 text-white text-sm font-semibold">
        <li className="my-auto">
          <button onClick={() => router.push('https://harmanita.com')} className={`hover:text-[#4ade80] transition ${currentSection === 'home' ? 'text-emerald-400' : ''}`}>
            Home
          </button>
        </li>
        <li className="my-auto">
          <button onClick={() => router.push('/')} className={`hover:text-[#4ade80] transition ${currentSection === 'blog' ? 'text-emerald-400' : ''}`}>
            Blog
          </button>
        </li>
        <li className="my-auto">
          <button onClick={() => router.push('https://harmanita.com/services')} className={`hover:text-[#4ade80] transition ${currentSection === 'services' ? 'text-emerald-400' : ''}`}>
            Services
          </button>
        </li>
        <li className="my-auto">
          <button onClick={() => router.push('https://harmanita.com/contact-us')} className={`hover:text-[#4ade80] transition ${currentSection === 'contact' ? 'text-emerald-400' : ''}`}>
            Contact
          </button>
        </li>
        <li>
          <LoginMenu/>
        </li>
      </ul>
    </nav>
  );
}