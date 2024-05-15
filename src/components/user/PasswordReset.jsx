
import { useState, useMemo, Fragment, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners";
import UserService from "../../services/UserApi";
import { Transition, Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'


export default function PasswordReset() {

    const userService = new UserService();
    const navigate = useNavigate()
    const cancelButtonRef = useRef(null)

    const [resetError, setresetError] = useState()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [throttleError, setThrottleError] = useState()

    const [title, setTitle] = useState(false)
    const [text, setText] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(String(email).toLowerCase());
    };


    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
        return passwordRegex.test(password);
    };



    const sendResetLink = async () => {
        if (loading) {
            return
        }
        setLoading(true)
        const attempt = await userService.forgottenPassword(user);

        if (attempt.message.includes("valid 15 minute.")) {
            setText(attempt.message)
            setTitle("Confirmare resetare parola")
            setOpen(true)
        } else if (attempt.statusCode == 404) {
            setresetError(attempt.message)
        } else if (attempt.statusCode == 429) {
            setThrottleError(attempt.message);
        }
        setLoading(false)
    }



    const canSubmit = useMemo(() => {
        const isValid = Object.values(user).every(Boolean);
        const isValidEmailValue = isValidEmail(user.email);
        const isValidPasswordValue = isValidPassword(user.password);
        return isValid && isValidEmailValue && isValidPasswordValue
    }, [user]);


    useEffect(() => {
        if (user.email == "") {
            setresetError("")
        }
        if (!isValidEmail(user.email)) {
            setresetError("")
        }
    }, [user])

    return (
        <div className="h-[80vh] sm:h-[90vh]  flex justify-center items-center">
            <div className="w-full max-w-xs lg:max-w-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-md">
                    <h2 className="text-start text-5xl font-bold leading-9 tracking-tight text-white">
                        Resetare parola
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-md py-5">
                    <div className="flex flex-col gap-4">
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
                            <div className="h-2">
                                {user.email && !isValidEmail(user.email) && (
                                    <div className="text-red-500 text-sm">Format email invalid</div>
                                )}
                            </div>

                            <div className="h-2">
                                {resetError !== "" && (
                                    <div className="text-red-500 text-sm">{resetError}</div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between ">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Parola noua
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
                                    autoComplete="password"
                                    placeholder="Parola noua"
                                    required
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            password: e.target.value
                                        });
                                    }}
                                    value={user.password}
                                    className="block w-full px-4 outline-0 rounded-sm py-1.5 text-white sm:text-sm sm:leading-6 bg-slate-800"
                                />
                                <div className="h-2">
                                    {user.password && !isValidPassword(user.password) && (
                                        <div className="text-red-500 text-sm">Parola invalida</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={sendResetLink}
                            disabled={!canSubmit}
                            className={`${!canSubmit ? "bg-slate-500" : " bg-[#5A3AF8] hover:bg-[#7358fa] "} "flex w-full lg:max-w-md mt-10 justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white "`}
                        >
                            {
                                loading ?
                                    <div className="text-white flex justify-center h-6">
                                        <ClipLoader color="white" size={"20px"} />
                                    </div>
                                    :
                                    <>Reseteaza parola</>
                            }
                        </button>
                        <div className="w-full justify-center items-center h-4">
                            {throttleError !== "" && (
                                <div className="text-red-500 text-sm">{throttleError}</div>
                            )}
                        </div>
                    </div>
                    <div className="mt-10 text-center text-sm text-slate-300">
                        Inapoi la {' '}
                        <button onClick={() => { navigate('/autentificare') }} className="font-semibold leading-6 text-amber-400 hover:text-amber-300">
                            Autentificare
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-500">
                                                    {title}
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-black">
                                                        {text}
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
                                                setOpen(false);
                                                navigate("/autentificare")
                                            }}
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