import { FaReact } from 'react-icons/fa';
import { TbBrandNextjs } from 'react-icons/tb';
import { SiTailwindcss } from 'react-icons/si';
import { SiAxios } from 'react-icons/si';
import { SiThemoviedatabase } from 'react-icons/si';
import { SiTypescript } from 'react-icons/si';
import { FaSuperpowers } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className='footer border-slate-500 text-center mt-20'>
            <p className='mb-2'>
                Copyright &#169; 2023 Under MIT Licence
            </p>
            <div className='flex justify-center items-center gap-2'>
                <FaReact className='text-xl text-blue-400' />
                <TbBrandNextjs className='text-xl text-slate-200' />
                <SiTailwindcss className='text-xl text-blue-400' />
                <SiTypescript className='text-xl text-blue-400' />
                <FaSuperpowers className="text-xl text-red-400" />
                <SiThemoviedatabase className='text-xl text-green-400' />
            </div>
            <p className='text-sm mt-1'>&lt; Developed using Next.js, Tailwind CSS, TypeScript, Jikan REST API and the TMDB API /&gt;</p>
        </div>
    )
}