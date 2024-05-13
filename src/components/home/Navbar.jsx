import { useNavigate } from "react-router-dom";
import { useState, Fragment } from "react";
import { Bars3CenterLeftIcon, LockOpenIcon, XMarkIcon, UserCircleIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, TrophyIcon, ArrowRightStartOnRectangleIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react'





export default function Navbar() {

    const navigate = useNavigate()


    const [open, setOpen] = useState(false)

    const navigation = [
        { name: 'Acasa', key: "acasa", path: "/", icon: <HomeIcon />, id: "1" },
        { name: 'Cauta', key: "cauta", path: '/cauta', icon: <MagnifyingGlassIcon />, id: "2" },
        { name: 'Postare noua', key: "postare-noua", path: '/postare-noua', icon: <PlusCircleIcon />, id: "3" },
        { name: 'Clasament', key: "clasament", path: '/clasament', icon: <TrophyIcon />, id: "4" },
        { name: 'Autentificare', key: "autentificare", path: '/autentificare', icon: <ArrowRightStartOnRectangleIcon />, id: "5" },
        { name: 'Inregistrare', key: "inregistrare", path: '/inregistrare', icon: <UserPlusIcon />, id: "6" },
    ]

    const quickLinks = [
        { name: 'Autentificare', key: "autentificare-quick", path: '/autentificare', icon: <ArrowRightStartOnRectangleIcon />, id: "7" },
        { name: 'Inregistrare', key: "inregistrare-quick", path: '/inregistrare', icon: <UserPlusIcon />, id: "8" },
        { name: 'Resetare parola', key: "resetare-parola", path: '/resetare-parola', icon: <LockOpenIcon />, id: "9" },
    ]


    const about = [
        { name: 'Noi', key: "despre-noi", path: '/despre-noi', icon: <ArrowRightStartOnRectangleIcon />, id: "10" },
        { name: 'Regulament', key: "regulament", path: '/regulament', icon: <UserPlusIcon />, id: "11" },
        { name: 'Intrebari frecvente', key: "intrebari-frecvente", path: '/intrebari-frecvente', icon: <UserPlusIcon />, id: "12" },
        { name: 'Termeni si conditii', key: "termeni-conditii", path: '/termeni-conditii', icon: <UserPlusIcon />, id: "13" },
        { name: 'Politica de confidentialitate', key: "politica-confidentialitate", path: '/politica-confidentialitate', icon: <UserPlusIcon />, id: "14" },
        { name: 'Politica cookies', key: "politica-cookies", path: '/politica-cookies', icon: <UserPlusIcon />, id: "15" },
    ]



    return (
        <div className="">
            <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-screen bg-[#5A3AF8] transition-transform sm:-translate-x-full" aria-label="Sidebar">
                <div className=" bg-black bg-opacity-30 py-5 px-5 sm:hidden">
                    <div className="flex justify-between items-center">
                        <button onClick={() => { setOpen(true) }} className="text-slate-200 hover:text-white flex items-center gap-4 font-semibold">
                            <Bars3CenterLeftIcon className="h-7" />
                        </button>
                        <button onClick={() => { navigate("/autentificare") }} className="text-slate-200 hover:text-white flex items-center gap-4 font-semibold">
                            <UserCircleIcon className="h-7" />
                        </button>
                    </div>
                </div>
            </aside>


            <aside id="separator-sidebar" className="fixed bottom-0 left-0 z-40 w-screen bg-[#5A3AF8] transition-transform sm:-translate-x-full" aria-label="Sidebar">
                <div className=" px-3 overflow-y-auto bg-black bg-opacity-30 py-5  sm:hidden">
                    <div className="flex justify-between items-center px-12">
                        {
                            navigation.map((item) => {
                                if (item.key !== "autentificare" && item.key !== "inregistrare") {
                                    return (
                                        <button onClick={() => { navigate(`${item.path}`) }} key={item.id} className=" flex justify-start items-center gap-4 text-slate-200 hover:text-white font-semibold">
                                            <div className="w-7 ">{item.icon}</div>
                                        </button>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </aside>



            <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 sm:w-14 lg:w-72 bg-[#5A3AF8] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="hidden lg:block h-20 "></div>
                <div className="h-full px-3 py-10 overflow-y-auto  flex flex-col justify-between">
                    <ul className="space-y-2 font-medium flex flex-col gap-4 ">
                        {
                            navigation.map((item) => (
                                <li key={item.id} className="w-full ">
                                    <button onClick={() => { navigate(`${item.path}`) }} className=" flex justify-start items-center gap-4 text-slate-200 hover:text-white font-semibold">
                                        <div className="w-7 ">{item.icon}</div>
                                        <p className="hidden lg:block">{item.name}</p>
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                    <div className=" flex items-end ">
                        <div className="w-full flex flex-col justify-end items-start gap-10 mb-20">
                            <button onClick={() => { setOpen(true) }} className="text-slate-200 hover:text-white flex items-center gap-4 font-semibold">
                                <Bars3CenterLeftIcon className="h-7" />
                                <p className="hidden lg:block">Alte resurse</p>
                            </button>
                            <p className="text-xs text-white hidden lg:block">@2024 INSECRET</p>
                        </div>
                    </div>
                </div>
            </aside>


            <Transition.Root show={open} as={Fragment}>
                <Dialog className="relative z-50 " onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden ">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 ">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto  w-screen sm:max-w-sm">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute z-50 top-6">
                                                <button
                                                    type="button"
                                                    className="relative rounded-md bg-red-600 text-white focus:outline-none -ml-6"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="absolute -inset-2.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex text-slate-400  relative h-full flex-col gap-5 overflow-y-scroll bg-slate-950 py-20 px-10 sm:py-20  shadow-xl">
                                            <div className="">
                                                <h1 className="font-bold text-white">Quick links</h1>
                                                <div className="w-full flex flex-col py-2 gap-2 sm:gap-4">
                                                    {
                                                        quickLinks.map((item) => (
                                                            <button onClick={() => { navigate(`${item.path}`); setOpen(false) }} key={item.id} className="hover:text-white font-semibold flex gap-4 items-center ">
                                                                <span className="w-5 sm:w-7">{item.icon}</span>
                                                                <span>{item.name}</span>
                                                            </button>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="">
                                                <h1 className="font-bold text-white">Despre</h1>
                                                <div className="w-full flex flex-col py-2 gap-2 sm:gap-4 text-sm">
                                                    {
                                                        about.map((item) => (
                                                            <button onClick={() => { navigate(`${item.path}`) }} key={item.id} className="hover:text-white font-semibold flex gap-4 items-center ">
                                                                <span>{item.name}</span>
                                                            </button>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <p className="text-xs text-white absolute bottom-10 left-10">@2024 INSECRET</p>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


        </div>
    )
}