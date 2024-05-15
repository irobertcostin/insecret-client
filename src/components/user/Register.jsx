import { ClipLoader } from "react-spinners"
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState, useRef } from 'react'
import { Listbox, Transition, Dialog } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import React, { useMemo } from 'react';
import UserService from "../../services/UserApi";




export default function Register() {

    const navigate = useNavigate()
    const userService = new UserService();

    const gen = [
        {
            id: 1,
            name: 'Masculin',
        },
        {
            id: 2,
            name: 'Feminin',
        },
        {
            id: 3,
            name: 'Non-binar',
        }
    ]

    const [selected, setSelected] = useState(gen[0])
    const [gender, setGender] = useState()
    const [loading, setLoading] = useState(false)
    const [regError, setRegError] = useState()
    const [regConfirmation, setRegConfirmation] = useState()
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    const [user, setUser] = useState({
        email: "",
        username: "",
        birthday: "",
        password: "",
        password: "",
        confirmedPassword: ""
    })






    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(String(email).toLowerCase());
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
        return passwordRegex.test(password);
    };

    const isOver16 = (birthdate) => {
        const today = new Date();
        const birthdateDate = new Date(birthdate);
        const age = today.getFullYear() - birthdateDate.getFullYear();
        const monthDifference = today.getMonth() - birthdateDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdateDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    const hasMinimumLetters = (str) => {
        const letterRegex = /^[a-zA-Z0-9]+$/;
        return letterRegex.test(str) && str.length >= 4;
    };






    const register = async () => {
        if (loading) {
            return
        }
        setRegError("")
        setLoading(true)
        let gen;
        if (!gender) {
            gen = selected.name;
        } else {
            gen = gender
        }
        let newItem = { ...user, gender: gen, avatar: "" }
        const attempt = await userService.register(newItem)
        if (attempt && attempt.error) {
            setRegError(attempt.message)
        } else {
            setRegConfirmation(attempt.message)
            setOpen(true)
        }
        setLoading(false)
    };

    const canSubmit = useMemo(() => {
        const isValid = Object.values(user).every(Boolean);
        const isValidEmailValue = isValidEmail(user.email);
        const isValidPasswordValue = isValidPassword(user.password);
        const isOver16Value = isOver16(user.birthday) >= 16;
        const passwordsMatch = user.password === user.confirmedPassword;
        return isValid && isValidEmailValue && isValidPasswordValue && isOver16Value && passwordsMatch;
    }, [user]);


    return (
        <div className="pt-10 pb-32 lg:pb-0 h-full flex justify-center items-center  relative">
            <div className="w-full px-4 max-w-sm sm:max-w-xl  lg:max-w-5xl ">
                <div className="sm:mx-auto sm:w-full sm:max-w-xl  lg:max-w-5xl ">
                    <h2 className="text-start text-5xl font-bold leading-9 tracking-tight text-white">
                        Inregistrare
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl lg:max-w-4xl ">
                    <div className="space-y-6 lg:grid lg:grid-cols-2 gap-10" >

                        <div className="">
                            <div className="mt-2">
                                <Listbox value={selected} onChange={setSelected}>
                                    {({ open }) => (
                                        <>
                                            <Listbox.Label className="block text-sm font-medium leading-6 text-white">Sex</Listbox.Label>
                                            <div className="relative mt-2">
                                                <Listbox.Button className="relative w-full outline-none border border-gray-500 cursor-default rounded-sm bg-slate-800 py-1.5 pl-3 pr-10 text-left text-white shadow-sm  ">
                                                    <span className="flex items-center">
                                                        <span className="ml-1 block truncate">{selected.name}</span>
                                                    </span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute  z-10 mt-1 max-h-56 w-full overflow-auto rounded-sm bg-slate-800 py-1 text-base shadow-lg ">
                                                        {gen.map((gender) => (
                                                            <Listbox.Option
                                                                key={gender.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'bg-indigo-600 text-white' : 'text-white',
                                                                        'relative cursor-default select-none py-2 pl-3 pr-9 '
                                                                    )
                                                                }
                                                                value={gender}
                                                                onClick={() => { setGender(gender.name) }}
                                                                defaultValue={selected}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                        <div className="flex items-center">
                                                                            <span
                                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-1 block truncate')}
                                                                            >
                                                                                {gender.name}
                                                                            </span>
                                                                        </div>

                                                                        {selected ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                )}
                                                                            >
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                            </div>
                        </div>

                        <div className="relative  h-full" >
                            <label htmlFor="email" className="block lg:-mt-[18px] text-sm font-medium leading-6 text-white">
                                Data nasterii
                            </label>


                            <div className="relative w-full  ">
                                <div className="relative mt-2">
                                    <div className="absolute inset-y-0 end-3 flex items-center ps-3.5 pointer-events-none ">
                                        <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <input
                                        onChange={(e) => {
                                            setUser({
                                                ...user,
                                                birthday: e.target.value
                                            });
                                        }}
                                        type="date" className="bg-slate-800  text-white text-sm rounded-sm  block w-full ps-10 p-2 py-[9px]" />
                                </div>
                            </div>
                            {user.birthday && (isOver16(user.birthday) < 16) && (
                                <div className="text-red-500 text-sm">Nu ai implinit varsta necesara</div>
                            )}
                        </div>


                        <div className="">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Exemplu: nick@gmail.com"
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            email: e.target.value
                                        });
                                    }}
                                    value={user.email}
                                    className="block w-full px-4 outline-0 rounded-sm py-1.5 text-white sm:text-sm sm:leading-6 bg-slate-800"
                                />
                            </div>
                            <div className="">
                                {user.email && !isValidEmail(user.email) && (
                                    <div className="text-red-500 text-sm">Format email invalid</div>
                                )}
                            </div>

                            <div>
                                {regError !== "" && (
                                    <div className="text-red-500 text-sm">{regError}</div>
                                )}
                            </div>
                        </div>


                        <div>
                            <div className="flex items-center justify-between ">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Nume utilizator
                                </label>
                                <div className="text-[8px] w-[50%] text-end">
                                    <p className="font-semibold text-slate-400 ">
                                        Min. 4 litere, fara caractere speciale
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    placeholder="Exemplu: NickNick"
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            username: e.target.value
                                        });
                                    }}
                                    value={user.username}
                                    className="block  w-full px-4  outline-0 rounded-sm py-1.5 text-white sm:text-sm sm:leading-6 bg-slate-800 "
                                />
                            </div>
                            <div>
                                {user.username && !hasMinimumLetters(user.username) && (
                                    <div className="text-red-500 text-sm">Nume utilizator invalid</div>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between ">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Parola
                                </label>
                                <div className="text-[8px] w-[50%] text-end">
                                    <p className="font-semibold text-slate-400 ">
                                        Min. 6 caractere, dintre care o cifra, o majuscula si un caracter special
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="Alege parola"
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            password: e.target.value
                                        });
                                    }}
                                    value={user.password}
                                    className="block w-full px-4 outline-0 rounded-sm py-1.5 text-white sm:text-sm sm:leading-6 bg-slate-800"
                                />
                            </div>
                            {user.password && !isValidPassword(user.password) && (
                                <div className="text-red-500 text-sm">Parola invalida</div>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between ">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Repeta parola
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmed-password"
                                    name="confirmed-password"
                                    type="password"
                                    autoComplete="confirmed-password"
                                    placeholder="Repeta parola"
                                    required
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            confirmedPassword: e.target.value
                                        });
                                    }}
                                    value={user.confirmedPassword}
                                    className="block w-full px-4 outline-0 rounded-sm py-1.5 text-white sm:text-sm sm:leading-6 bg-slate-800"
                                />
                            </div>
                            <div className="h-2">
                                {user.password !== user.confirmedPassword && (
                                    <div className="text-red-500 text-sm">Parola nu se potriveste</div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-2 lg:flex justify-center">
                            <button
                                onClick={register}
                                disabled={!canSubmit}
                                className={`${!canSubmit ? "bg-slate-500" : " bg-[#5A3AF8] hover:bg-[#7358fa] "} "flex w-full lg:max-w-md mt-10 justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white "`}
                            >
                                {
                                    loading ?
                                        <div className="text-white flex justify-center h-6">
                                            <ClipLoader color="white" size={"20px"} />
                                        </div>
                                        :
                                        <>Inregistreaza-te</>
                                }
                            </button>
                        </div>
                    </div>

                    <div className="w-full text-xs leading-3 text-white mt-10 flex flex-col gap-4">
                        <p className="">
                            Declar ca am implinit varsta de 14 ani si confirm ca am citit, inteles si acceptat integral <span onClick={() => { navigate('/politica-confidentialitate') }} className="text-red-500 cursor-pointer">Politica de confidentialitate</span>. Autorizez INSECRET.RO sa imi administreze datele personale dupa cum este precizat in informare.
                        </p>
                        <p className="">
                            Confirm ca am citit, inteles si acceptat integral <span onClick={() => { navigate('/regulament') }} className="text-red-500 cursor-pointer">Regulamentul</span> si  <span onClick={() => { navigate('/termeni-conditii') }} className="text-red-500 cursor-pointer">Termenii si conditiile</span>.
                        </p>
                    </div>

                    <div className="mt-10 text-center text-sm text-slate-300">
                        Ai cont deja?{' '}
                        <button onClick={() => { navigate('/autentificare') }} className="font-semibold leading-6 text-amber-400 hover:text-amber-300">
                            Autentifica-te aici
                        </button>
                    </div>
                </div>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity " />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto sm:pl-14 lg:pl-72">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-500">
                                                    Validare adresa email
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-black">

                                                        {
                                                            regConfirmation &&
                                                            <>{regConfirmation}</>
                                                        }

                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-[#5A3AF8] hover:bg-[#7358fa] px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto lg:max-w-md"
                                            onClick={() => {
                                                setOpen(false)
                                                navigate("/autentificare")
                                            }
                                            }
                                            ref={cancelButtonRef}
                                        >
                                            Am inteles
                                        </button>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}