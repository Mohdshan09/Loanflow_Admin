import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    User,
} from "lucide-react";
import { useRegister } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
    const registerMutation = useRegister();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        registerMutation.mutate(
            {
                name,
                email,
                password,
            },
            {
                onSuccess: () => {
                    toast.success("Account created successfully");
                    navigate("/login", { replace: true });
                },

                onError: (error) => {
                    if (axios.isAxiosError(error)) {
                        toast.error(
                            error.response?.data?.message ||
                            "Registration failed"
                        );
                    } else {
                        toast.error("Something went wrong");
                    }
                },
            }
        );
    };

    const isLoading = registerMutation.isPending;

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-4">
            <div className="w-full max-w-[455px]">

                {/* Card */}
                <div className="rounded-2xl border border-slate-200 bg-white px-8 py-3 shadow-sm">

                    {/* Logo */}
                    <div className="flex justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-950 shadow-sm">
                            <ShieldCheck
                                size={28}
                                strokeWidth={2}
                                className="text-white"
                            />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mt-3 text-center">
                        <p className="text-sm font-medium tracking-[0.16em] text-slate-500">
                            LOAN MANAGEMENT PORTAL
                        </p>

                        <h1 className="mt-2 text-2xl font-semibold text-slate-950">
                            Create Account
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Create your account to get started
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="mt-7 space-y-2"
                        noValidate
                    >
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-slate-800"
                            >
                                FULL NAME
                            </label>

                            <div className="relative">
                                <User
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="Enter your full name"
                                    autoComplete="name"
                                    disabled={isLoading}
                                    className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-800"
                            >
                                WORK EMAIL
                            </label>

                            <div className="relative">
                                <Mail
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="name@lendingco.com"
                                    autoComplete="email"
                                    disabled={isLoading}
                                    className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-800"
                            >
                                PASSWORD
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    disabled={isLoading}
                                    className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    disabled={isLoading}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                                    aria-label={
                                        showPassword ? "Hide password" : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>

                            <p className="mt-2 text-xs text-slate-400">
                                Minimum 8 characters with at least one special character.
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-medium text-slate-800"
                            >
                                CONFIRM PASSWORD
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                    disabled={isLoading}
                                    className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                    }
                                    disabled={isLoading}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide confirm password"
                                            : "Show confirm password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>
                            </div>
                        </div>



                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}

                            {!isLoading && <ArrowRight size={19} />}
                        </button>
                    </form>

                    {/* Login link */}
                    <p className="mt-3 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-700"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>


            </div>
        </div>
    );
};

export default Signup;