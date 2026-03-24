"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeyRound, Mail, ArrowLeft, Loader2, CheckCircle2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const { createClient } = await import("@/utils/supabase/client")
            const supabase = createClient()
            
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`,
            })

            if (resetError) throw resetError
            setIsSuccess(true)
        } catch (err: any) {
            setError(err.message || "Failed to send reset email. Please check your email address.")
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
                    <h1 className="mt-6 text-2xl font-bold text-foreground">Email Sent!</h1>
                    <p className="mt-2 text-muted-foreground">Check your inbox for a link to reset your password.</p>
                    <Button asChild className="mt-8" variant="outline">
                        <Link href="/auth/login" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to login
                        </Link>
                    </Button>
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
                        <KeyRound className="h-6 w-6" />
                    </div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Forgot password?</h1>
                    <p className="mt-2 text-muted-foreground">
                        No worries, we&apos;ll send you reset instructions.
                    </p>
                </div>

                <Card className="border-border/50 bg-card/50 backdrop-blur-xl hover-glow transition-all">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle className="text-xl">Request Reset</CardTitle>
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
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button className="w-full gap-2 py-6 text-lg" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>Reset password</>
                                )}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                <Link href="/auth/login" className="flex items-center justify-center gap-2 font-semibold text-primary hover:underline">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to login
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>

                <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground/30">
                    <Sparkles className="h-4 w-4" />
                    <div className="h-px w-12 bg-muted-foreground/10" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Secure Recovery</span>
                    <div className="h-px w-12 bg-muted-foreground/10" />
                    <Sparkles className="h-4 w-4" />
                </div>
            </div>
        </div>
    )
}
