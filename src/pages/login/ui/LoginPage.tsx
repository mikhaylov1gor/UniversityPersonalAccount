import {LoginCredentialsCard} from "@/features/login/login-credentials";
import {Banner} from "@/features/login/banner";

export function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex-grow flex items-center justify-center px-4 pb-8">
                <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
                    <Banner/>

                    <LoginCredentialsCard/>
                </div>
            </div>
        </div>
    );
}