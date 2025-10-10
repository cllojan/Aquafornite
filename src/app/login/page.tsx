"use client"; // si usas Next.js 13+ con App Router

import { useState } from "react";
import { useRouter } from "next/navigation"; // si usas Next.js

export default function Login() {
    const router = useRouter(); // para redirigir
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost/backend/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include", // si tu backend maneja cookies de sesión
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("Inicio de sesión exitoso ✅");
                setError("");
                // Guardar en localStorage o context
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirigir al perfil
                setTimeout(() => router.push("/perfil"), 1000);
            } else {
                setError(data.message || "Credenciales incorrectas.");
            }
        } catch (err) {
            setError("Error de conexión con el servidor.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="flex items-center justify-center mb-5">
                    <img src="/assets/img.png" alt="logo" width="250" height="200" />
                </div>

                {error && (
                    <div className="mb-4">
                        <div className="alert bg-red-100 text-red-800 border border-red-300 rounded-lg px-4 py-3">
                            <i className="fa-solid fa-circle-exclamation mr-2"></i> {error}
                        </div>
                    </div>
                )}

                {success && (
                    <div
                        id="toast_success"
                        className="toast toast-top toast-end transition-opacity"
                    >
                        <div className="alert alert-success bg-green-100 text-green-800 border border-green-300 rounded-lg px-4 py-3">
                            <span>{success}</span>
                        </div>
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow w-full rounded-lg divide-y divide-gray-200"
                >
                    <div className="px-5 py-7">
                        <label className="input validator mt-5">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                                    stroke="currentColor">
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input type="email" name="email" placeholder="mail@site.com" required />
                        </label>
                        <div className="validator-hint hidden">Enter valid email address</div>
                        <label className="input validator mt-5">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                                stroke="currentColor">
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z">
                                </path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input type="password" name="password" required placeholder="Password" />
                    </label>
                        <button
                            type="submit"
                            className="mt-5 bg-blue-500 hover:bg-blue-600 text-white w-full py-2.5 rounded-lg shadow-md font-semibold"
                        >
                            Continuar →
                        </button>
                    </div>

                    <div className="p-5">
                        <a
                            href="https://discord.com/oauth2/authorize?client_id=1385332222839488665&response_type=code&redirect_uri=https%3A%2F%2Faquafornais.store%2Fdiscord-callback.php&scope=identify+email"
                            className="block text-center border border-gray-200 text-gray-500 py-2.5 rounded-lg shadow-sm hover:shadow-md"
                        >
                            <i className="fa-brands fa-discord"></i> Discord
                        </a>
                    </div>

                    <div className="py-5 flex justify-between">
                        <a href="/register" className="text-gray-500 hover:text-gray-700">
                            Registrarse
                        </a>
                        <a href="/help" className="text-gray-500 hover:text-gray-700">
                            Help
                        </a>
                    </div>
                </form>

                <div className="py-5">
                    <a
                        href="/"
                        className="inline-flex items-center text-gray-500 hover:text-gray-700"
                    >
                        ← Volver a aquafornais
                    </a>
                </div>
            </div>
        </div>
    );
}
