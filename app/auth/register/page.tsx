"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, Mail, Lock, User, ArrowRight, Loader2, Sparkles, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isHuman, setIsHuman] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (!isHuman) {
            setError("Please verify that you are human")
            return
        }

        setIsLoading(true)

        try {
            const { createClient } = await import("@/utils/supabase/client")
            const supabase = createClient()
            
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            })

            if (signUpError) throw signUpError

            setIsSuccess(true)
            setTimeout(() => {
                router.push("/auth/login")
            }, 2000)
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-20 lg:px-8">
                <div className="w-full max-w-md text-center reveal is-visible animate-fade-up">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary animate-scale-in">
                        <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h1 className="mt-6 text-2xl font-bold text-foreground">Registration Successful!</h1>
                    <p className="mt-2 text-muted-foreground">Redirecting you to the login page...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-20 lg:px-8">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-blob rounded-full bg-primary/10 blur-[100px]" />
                <div className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] animate-blob rounded-full bg-emerald-500/10 blur-[80px] [animation-delay:2s]" />
            </div>

            <div className="w-full max-w-md reveal is-visible animate-fade-up">
                <div className="mb-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <UserPlus className="h-6 w-6" />
                    </div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Create account</h1>
                    <p className="mt-2 text-muted-foreground">
                        Join HorizonGuide and start your career journey.
                    </p>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur-xl hover-glow transition-all">
                    <form onSubmit={handleRegister}>
                        <CardHeader>
                            <CardTitle className="text-xl">Sign up</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        className="pl-10"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={8}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        minLength={8}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 rounded-lg border border-border/50 bg-accent/30 p-4 transition-colors hover:bg-accent/50">
                                <input 
                                    type="checkbox" 
                                    id="human-verify" 
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    checked={isHuman}
                                    onChange={(e) => setIsHuman(e.target.checked)}
                                />
                                <Label htmlFor="human-verify" className="text-sm font-medium leading-none cursor-pointer">
                                    I am not a robot
                                </Label>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button className="w-full gap-2 py-6 text-lg" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Get started
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/auth/login" className="font-semibold text-primary hover:underline">
                                    Login here
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>

                <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground/30">
                    <Sparkles className="h-4 w-4" />
                    <div className="h-px w-12 bg-muted-foreground/10" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Secure Registration</span>
                    <div className="h-px w-12 bg-muted-foreground/10" />
                    <Sparkles className="h-4 w-4" />
                </div>
            </div>
        </div>
    )
}
