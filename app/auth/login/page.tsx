"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isHuman, setIsHuman] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!isHuman) {
            setError("Please verify that you are human")
            return
        }

        setIsLoading(true)

        try {
            const { createClient } = await import("@/utils/supabase/client")
            const supabase = createClient()
            
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (signInError) throw signInError

            router.push("/dashboard")
            router.refresh()
        } catch (err: any) {
            setError(err.message || "Invalid email or password")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-20 lg:px-8">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-blob rounded-full bg-primary/10 blur-[100px]" />
                <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] animate-blob rounded-full bg-violet-500/10 blur-[80px] [animation-delay:2s]" />
            </div>

            <div className="w-full max-w-md reveal is-visible animate-fade-up">
                <div className="mb-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
                    <p className="mt-2 text-muted-foreground">
                        Enter your credentials to access HorizonGuide.
                    </p>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur-xl hover-glow transition-all">
                    <form onSubmit={handleLogin}>
                        <CardHeader>
                            <CardTitle className="text-xl">Login</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
                                    {error}
                                </div>
                            )}

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
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline font-medium">
                                        Forgot password?
                                    </Link>
                                </div>
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
                                        Sign in
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                Don&apos;t have an account?{" "}
                                <Link href="/auth/register" className="font-semibold text-primary hover:underline">
                                    Register here
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>

                <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground/30">
                    <Sparkles className="h-4 w-4" />
                    <div className="h-px w-12 bg-muted-foreground/10" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Secure Access Layer</span>
                    <div className="h-px w-12 bg-muted-foreground/10" />
                    <Sparkles className="h-4 w-4" />
                </div>
            </div>
        </div>
    )
}
