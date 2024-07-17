'use client'
import {useState} from "react";
import Link from "next/link";

export default function Home() {
    const [isView, setIsView] = useState(false)
    const handleClick = () => {
        setIsView(!isView)
    }
    return (
        <div>
            <Link href="/components">List user</Link>
            <form>
                <label>Name: </label>
                <input type={"text"} className={isView == true ? 'ct-input' : 'ct-input-red'}/>
                <label>Username: </label>
                <input type={"text"} className={'ct-input'}/>
                <button type={"button"} onClick={handleClick}>change</button>
            </form>
        </div>
    );
}
