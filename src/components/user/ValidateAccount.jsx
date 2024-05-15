
import { useEffect, useState, useRef, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners";
import isTokenValid from "../../utils/isTokenValid";
import UserService from "../../services/UserApi";
import { Transition, Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'


export default function ValidateAccount() {


    const params = useParams();
    const userService = new UserService();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [loadingAction, setLoadingAction] = useState(false)
    const [notValid, setNotValid] = useState(false);
    const [email, setEmail] = useState();
    const [regConfirmation, setRegConfirmation] = useState()
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [throttleError, setThrottleError] = useState()


    const resendToken = async () => {
        if (loadingAction) {
            return
        }
        setLoadingAction(true)
        if (email) {
            const attempt = await userService.validationToken({ email: email })
            setRegConfirmation(attempt.message)
            setOpen(true)
        }
        setLoadingAction(false)
    }


    const activateAccount = async () => {
        if (loadingAction) {
            return
        }
        setLoadingAction(true)
        if (params && params.token) {

            const decoded = isTokenValid(params.token)
            if (decoded.validity) {
                const attempt = await userService.activateAccount({ confirmationToken: params.token })
                if (attempt.statusCode == 429) {
                    setThrottleError(attempt.message);
                } else {
                    setRegConfirmation(attempt.message)
                    setOpen(true)
                }
            } else {
                setNotValid(true)
            }
        }
        setLoadingAction(false)
    }


    useEffect(() => {
        setLoading(true)
        if (params && params.token) {
            const decoded = isTokenValid(params.token)
            setEmail(decoded.email)
            if (!decoded.validity) {
                setNotValid(true)
            }
            setLoading(false)
        }
        setLoading(false)
    }, [params])




    return (
        <div className="h-[80vh] sm:h-[90vh]  flex justify-center items-center">
            <div className="w-full max-w-xs lg:max-w-md">
                {
                    loading ?
                        <div className="w-full flex justify-center">
                            <ClipLoader size={"50px"} color="white" />
                        </div>
                        :
                        (
                            <>
                                {
                                    notValid ?
                                        (
                                            <div className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
                                                <div className="text-center">
                                                    <p className="text-base font-semibold text-indigo-500">404</p>
                                                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-300 sm:text-5xl">Resursa invalida</h1>
                                                    <p className="mt-6 text-base leading-7 text-white">Ne pare rau, tokenul a expirat.</p>
                                                    <div className="mt-10 flex items-center justify-center gap-x-6">
                                                        <button
                                                            onClick={resendToken}
                                                            className={`bg-[#5A3AF8] hover:bg-[#7358fa] "} "flex w-full lg:max-w-md mt-10 justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white "`}
                                                        >
                                                            {

                                                                loadingAction ?
                                                                    <div className="text-white flex justify-center h-6">
                                                                        <ClipLoader color="white" size={"20px"} />
                                                                    </div>
                                                                    :
                                                                    <>Trimite un link nou de validare</>
                                                            }
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-md">
                                                    <h2 className="text-center text-5xl font-bold leading-9 tracking-tight text-white">
                                                        Validare cont
                                                    </h2>
                                                </div>
                                                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-md py-5">
                                                    <div className="flex flex-col gap-4">
                                                        <h3 className="text-xl font-bold leading-9 tracking-tight text-white text-center">
                                                            Email: {email}
                                                        </h3>
                                                        <button
                                                            onClick={activateAccount}
                                                            className={` bg-[#5A3AF8] hover:bg-[#7358fa] "} "flex w-full lg:max-w-md mt-10 justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white "`}
                                                        >
                                                            {
                                                                loadingAction ?
                                                                    <div className="text-white flex justify-center h-6">
                                                                        <ClipLoader color="white" size={"20px"} />
                                                                    </div>
                                                                    :
                                                                    <>Valideaza cont</>
                                                            }
                                                        </button>
                                                        <div className="w-full justify-center items-center h-4">
                                                            {throttleError !== "" && (
                                                                <div className="text-red-500 text-sm">{throttleError}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                }
                            </>
                        )
                }
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