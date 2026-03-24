"use client"

import { useState } from "react"
import { api } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, QrCode, ClipboardCheck, Loader2 } from "lucide-react"

export function TwoFactorSetup({ userId }: { userId: string }) {
    const [qrCode, setQrCode] = useState("")
    const [secret, setSecret] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState<"initial" | "scanning">("initial")

    const handleStartSetup = async () => {
        setIsLoading(true)
        try {
            const res = await api.setup2FA(userId)
            setQrCode(res.qrCodeUrl)
            setSecret(res.secret)
            setStep("scanning")
        } catch (error) {
            console.error("2FA setup error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Two-Step Verification
                </CardTitle>
                <CardDescription>
                    Add an extra layer of security to your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {step === "initial" ? (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            When 2FA is enabled, you'll be asked for a security code from your authenticator app each time you sign in.
                        </p>
                        <Button onClick={handleStartSetup} disabled={isLoading} className="w-full sm:w-auto">
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <QrCode className="h-4 w-4 mr-2" />}
                            Enable 2FA
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-6 animate-fade-in">
                        <div className="rounded-xl bg-white p-4 shadow-sm border">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={qrCode} alt="2FA QR Code" className="h-48 w-48" />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-sm font-medium">Scan this QR code with your app</p>
                            <p className="text-xs text-muted-foreground">
                                Can't scan? Use this code instead: <code className="bg-muted px-1 rounded font-mono font-bold text-primary">{secret}</code>
                            </p>
                        </div>
                        <Button variant="outline" onClick={() => setStep("initial")} className="w-full">
                            Cancel
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
