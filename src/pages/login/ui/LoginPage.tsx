import { useState } from "react";
import RusFlag from '../../../shared/assets/icons/Russia.svg'
import EngFlag from '../../../shared/assets/icons/English.svg'
export function LoginPage() {
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="w-full flex justify-end p-4">
                <select className="border border-gray-300 rounded-md p-1 bg-transparent text-sm">
                    <option value="ru">Русский 🇷🇺</option>
                    <option value="en">English 🇺🇸</option>
                </select>
            </div>

            <div className="flex-grow flex items-center justify-center px-4 pb-8">
                <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
                    <div className="w-full md:w-1/2 bg-transparent ">
                        <div className="flex items-center justify-center p-4">
                            <img
                                src="/src/shared/assets/images/welcome-banner.svg"
                                alt="Welcome"
                                className="w-full max-w-md object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/500x400?text=Welcome+Illustration";
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-center mb-6">Вход в аккаунт</h2>

                        <form className="space-y-5">
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600"
                                >
                                    Электронная почта
                                </label>
                            </div>

                            {/* Password field with floating label */}
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600"
                                >
                                    Пароль
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${rememberMe ? 'bg-blue-600' : 'bg-gray-200'}`}
                                        onClick={() => setRememberMe(!rememberMe)}
                                    >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${rememberMe ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                                    </button>
                                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
                                        Запомнить меня
                                    </label>
                                </div>

                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                ВОЙТИ
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}