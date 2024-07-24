import { ReactNode } from 'react';
interface SidebarItem {
    label: string | ReactNode;
    value: number;
}

interface SidebarAgencyProps {
    items: SidebarItem[];
    tab: number;
    setTab: React.Dispatch<React.SetStateAction<number>>;
}

const SidebarAgency = ({ items, tab, setTab }: SidebarAgencyProps) => {
    const hostname = window.location.hostname;

    return (
        <div >
            <ul>
                {items.map((item) => (
                    <li
                        key={item.value}
                        className={`text-[14px] h-[58px] line-[58px] text-[#8491a5] font-[400] cursor-pointer shadow-[inset_0_-0.5px_0_0_rgba(144,162,220,.29)] hover:bg-[#4a69ff] hover:text-white ${item.value === 0 ? 'rounded-t-lg' : item.value === 2 ? 'rounded-b-lg' : ''}
                         ${item.value === tab ? 'bg-[#4a69ff] text-[#fff]' : ''}`}
                        onClick={() => {
                            setTab(item.value)
                            if (item.value === 1) window.open(`https://agency.${hostname}`, '_blank')
                        }}
                    >
                        <div className='h-full flex items-center mx-5'>
                            {item.label}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SidebarAgency