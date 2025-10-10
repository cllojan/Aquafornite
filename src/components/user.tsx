
export default function User({ data }: any) {

    return (
        <div className="flex p-4 @container">
            <div className="flex w-full flex-col gap-4 items-center">
                <div className="flex gap-4 flex-col items-center">
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                            <img src={data?.imageUrl} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center justify-center">
                        <p className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-center text-white">{data?.fullName}</p>
                        <p className="text-base font-normal leading-normal text-center text-white">{data?.primaryEmailAddress.emailAddress}</p>
                    </div>
                </div>
                <button
                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf3] text-[#0e141b] text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] @[480px]:w-auto"
                >
                    <span className="truncate">Edit Profile</span>
                </button>
            </div>
        </div>
    );
}

