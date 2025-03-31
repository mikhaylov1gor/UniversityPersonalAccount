export function Banner(){
    return(
        <>
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
        </>
    )
}