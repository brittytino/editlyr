"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepperProps {
    steps: string[]
    currentStep: number
    className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
    return (
        <div className={cn("flex items-center justify-center space-x-4", className)}>
            {steps.map((step, index) => {
                const isActive = index + 1 === currentStep
                const isCompleted = index + 1 < currentStep

                return (
                    <div key={step} className="flex items-center">
                        <div className="flex flex-col items-center relative">
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all z-10",
                                isActive ? "border-primary bg-primary text-primary-foreground" :
                                    isCompleted ? "border-primary bg-primary text-primary-foreground" :
                                        "border-muted-foreground/30 text-muted-foreground bg-background"
                            )}>
                                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                            </div>
                            <span className={cn("absolute -bottom-6 text-xs font-medium whitespace-nowrap",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}>
                                {step}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={cn("h-[2px] w-12 mx-2 mb-4",
                                isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                            )} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
