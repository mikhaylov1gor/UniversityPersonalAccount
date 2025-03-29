import {useState} from "react";
export function LoginPage() {
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
            <div className="flex w-full max-w-4xl flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="hidden md:flex items-center justify-center w-1/2 bg-blue-100">
                    <img src="../../../../../university-personal-acc/src/shared/assets/images/welcome-banner.svg" alt="Login Illustration" className="max-w-xs" />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <div className="flex justify-end">
                        <select className="border border-gray-300 rounded-md p-1">
                            <option value="ru">Русский 🇷🇺</option>
                            <option value="en">English 🇺🇸</option>
                        </select>
                    </div>

                    <h2 className="text-2xl font-semibold text-center mb-6">Вход в аккаунт</h2>

                    <form className="space-y-4">
                        <input
                            type="email"
                            placeholder="Электронная почта"
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
                        />

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="mr-2"
                            />
                            <label htmlFor="rememberMe">Запомнить меня</label>
                        </div>

                        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                            ВОЙТИ
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}