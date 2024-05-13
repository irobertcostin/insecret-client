import { useState } from "react";
import { ClipLoader } from "react-spinners"
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserApi";


export default function Login() {

    const navigate = useNavigate()
    const userService = new UserService();

    const [loginAccountError, setLoginAccountError] = useState("")
    const [loginPassError, setLoginPassError] = useState("")
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        account: "",
        password: ""
    })

    const { ...allData } = user;
    const canSubmit = [...Object.values(allData)].every(Boolean);

    const login = async () => {
        setLoginAccountError("")
        setLoginPassError("")
        setLoading(true)
        const attempt = await userService.login(user)
        if (attempt && attempt.message) {
            if (attempt.message == "password must be longer than or equal to 6 characters"
                || attempt.message == "Parola incorecta"
            ) {
                setLoginPassError(attempt.message)
            } else {
                setLoginAccountError(attempt.message)
            }
        } else {
            console.log(attempt);
        }
        setLoading(false)
    };


    return (
        <div className="h-[80vh] sm:h-[90vh]  flex justify-center items-center">
            <div className="w-full max-w-xs lg:max-w-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-md">
                    <h2 className="text-start text-5xl font-bold leading-9 tracking-tight text-white">
                        Autentificare
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-md">
                    <div className="space-y-6" >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email sau username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="account"
                                    name="account"
                                    type="text"
                                    autoComplete="account"
                                    required
                                    placeholder="Email sau nume utilizator"
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            account: e.target.value
                                        });
                                    }}
                                    value={user.account}
                                    className="block w-full px-4 outline-0 rounded-sm py-1.5 text-white sm:text-sm sm:leading-6 bg-slate-800"
                                />
                            </div>
                            <div className="h-2">
                                {loginAccountError !== "" && (
                                    <div className="text-red-500 text-sm">{loginAccountError}</div>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between ">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Parola
                                </label>
                                <div className="text-sm">
                                    <button className="font-semibold text-amber-400 hover:text-amber-300 ">
                                        Ai uitat parola?
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
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
                                    {loginPassError !== "" && (
                                        <div className="text-red-500 text-sm">{loginPassError}</div>
                                    )}
                                </div>

                            </div>
                        </div>

                        <div className="">
                            <button
                                onClick={login}
                                disabled={!canSubmit}
                                className={`${!canSubmit ? "bg-slate-500" : " bg-[#5A3AF8] hover:bg-[#7358fa] "} "flex w-full lg:max-w-md mt-10 justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white "`}
                            >
                                {
                                    loading ?
                                        <div className="text-white flex justify-center h-6">
                                            <ClipLoader color="white" size={"20px"} />
                                        </div>
                                        :
                                        <>Autentifica-te</>
                                }
                            </button>
                        </div>
                    </div>
                    <div className="mt-10 text-center text-sm text-gray-500">
                        Nu ai cont?{' '}
                        <button onClick={() => { navigate('/inregistrare') }} className="font-semibold leading-6 text-amber-400 hover:text-amber-300">
                            Inregistreaza-te aici
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}