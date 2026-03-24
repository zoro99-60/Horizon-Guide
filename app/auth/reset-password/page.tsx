"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, ArrowLeft, Loader2, CheckCircle2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ResetPasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setIsLoading(true)

        try {
            const { createClient } = await import("@/utils/supabase/client")
            const supabase = createClient()
            
            const { error: resetError } = await supabase.auth.updateUser({
                password: password,
            })

            if (resetError) throw resetError
            setIsSuccess(true)
            setTimeout(() => {
                router.push("/auth/login")
            }, 3000)
        } catch (err: any) {
            setError(err.message || "Failed to reset password. The link may have expired.")
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
                    <h1 className="mt-6 text-2xl font-bold text-foreground">Password Reset!</h1>
                    <p className="mt-2 text-muted-foreground">Your password has been successfully updated. Redirecting to login...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-20 lg:px-8">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-blob rounded-full bg-primary/10 blur-[100px]" />
            </div>

            <div className="w-full max-w-md reveal is-visible animate-fade-up">
                <div className="mb-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Lock className="h-6 w-6" />
                    </div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Reset password</h1>
                    <p className="mt-2 text-muted-foreground">
                        Enter your new password below.
                    </p>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur-xl hover-glow transition-all">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle className="text-xl">New Password</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
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
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full gap-2 py-6 text-lg" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>Update password</>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}
