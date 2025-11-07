import { MainNav } from "./main-nav";
import UserButton from "./user-button";

export default function Header() {
    return (
        <header className="sticky flex justify-center border-b border-b-slate-200 bg-white py-2 ">
            <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4 sm:px-6">
                {/* <MainNav /> */}
                <UserButton />
            </div>
        </header>
    );
}
