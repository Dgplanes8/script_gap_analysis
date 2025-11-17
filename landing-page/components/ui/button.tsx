import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Conversion-Optimized Button Component
 *
 * Based on Brand Consistency Guide color psychology:
 * - Primary (Blue): Trust, professionalism, main conversion paths
 * - Success (Green): Free trials, zero-friction actions
 * - Urgent (Orange): Limited offers, FOMO triggers
 * - Secondary: Alternative paths, lower emphasis
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary CTA - Blue gradient for trust and professionalism
        // Use: Main signup buttons, pricing CTAs, primary conversion paths
        default:
          "bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] text-white shadow-lg shadow-blue-500/40 hover:from-[#0F5AD6] hover:to-[#0D4AB8] hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-[#126DFB]",

        primary:
          "bg-gradient-to-r from-[#126DFB] to-[#0F5AD6] text-white shadow-lg shadow-blue-500/40 hover:from-[#0F5AD6] hover:to-[#0D4AB8] hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-[#126DFB]",

        // Success CTA - Solid green for free trials (removes friction)
        // Use: "Claim 10 Free Credits", trial starts, guarantee acceptance
        success:
          "bg-[#10B981] text-white shadow-lg shadow-green-500/40 hover:bg-[#059669] hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-[#10B981]",

        // Urgent CTA - Orange for scarcity and FOMO
        // Use: "Only 25 Spots Left", countdown offers, limited-time actions
        urgent:
          "bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white shadow-lg shadow-orange-500/40 hover:from-[#D97706] hover:to-[#B45309] hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-[#F59E0B]",

        // Secondary CTA - White with blue border for alternative paths
        // Use: "Learn More", "See Examples", secondary navigation
        secondary:
          "bg-white border-2 border-[#126DFB] text-[#126DFB] hover:bg-[#126DFB] hover:text-white hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-[#126DFB]",

        // Destructive - For delete/cancel actions
        destructive:
          "bg-red-600 text-white shadow-lg shadow-red-500/30 hover:bg-red-700 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-red-600",

        // Outline - Neutral bordered button
        outline:
          "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus-visible:ring-gray-400",

        // Ghost - Minimal for tertiary actions
        ghost:
          "text-[#126DFB] hover:bg-blue-50 hover:text-[#0F5AD6]",

        // Link - For inline text links
        link:
          "text-[#126DFB] underline-offset-4 hover:underline hover:text-[#0F5AD6] p-0",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        xl: "h-16 px-12 py-5 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** Adds shimmer effect on hover (works best with gradient variants) */
  shimmer?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, shimmer = true, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const hasShimmer = shimmer && (variant === 'primary' || variant === 'default' || variant === 'success' || variant === 'urgent')

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {hasShimmer && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
