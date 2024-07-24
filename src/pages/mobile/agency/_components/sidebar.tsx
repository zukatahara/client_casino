import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react'
interface SidebarItem {
    label: string | ReactNode;
    value: number;
}

interface SidebarAgencyProps {
    items: SidebarItem[];
    setTab: React.Dispatch<React.SetStateAction<any>>;
}

const SidebarAgency = ({ items, setTab }: SidebarAgencyProps) => {
    const hostname = window.location.hostname;
    return (
        <div className='px-5'>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.value}
                        className={`text-[14px] h-[58px] line-[58px] text-[#fff] font-[400] cursor-pointer shadow-[inset_0_-0.5px_0_0_rgba(144,162,220,.29)] hover:bg-[#4a69ff] hover:text-white 
                        `}
                        onClick={() => {
                            setTab(item.value)
                            if (item.value === 2) window.open(`https://agency.${hostname}`, '_blank')
                        }}
                    >
                        <div className='h-full flex justify-between items-center '>
                            {item.label}
                            <ChevronRight size={17} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SidebarAgency