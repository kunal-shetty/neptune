"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

const PLAN_FEATURES: Record<string, string[]> = {
  basic: ["1,000 messages per month", "All AI modes (Developer, ELI5, Roast)", "Voice input support", "Email support"],
  pro: [
    "Unlimited messages",
    "Priority AI responses",
    "Advanced voice features",
    "Chat history export",
    "Priority support",
  ],
  lifetime: ["Unlimited access forever", "All future AI models", "Premium support", "API access", "Commercial license"],
}

export async function sendSuccessEmail(email: string, name: string, plan: string) {
  if (!email) return

  const formattedPlan = plan.charAt(0).toUpperCase() + plan.slice(1)

  const features = PLAN_FEATURES[plan] || []

  const featuresHtml = features.length
    ? `
      <ul>
        ${features.map((f) => `<li>${f}</li>`).join("")}
      </ul>
    `
    : ""

  await resend.emails.send({
    from: "NeuralChat <onboarding@resend.dev>",
    to: [email],
    subject: "Welcome to NeuralChat Premium 🎉",
    html: `
      <h2>Payment Successful 🎉</h2>

      <p>Hi ${name || "there"},</p>

      <p>
        Thank you for purchasing the <strong>${formattedPlan} Plan</strong> on
        <strong>NeuralChat AI Assistant</strong>.
        Your payment has been successfully processed, and your premium access is now active.
      </p>

      ${
        featuresHtml
          ? `
            <p><strong>Your plan includes:</strong></p>
            ${featuresHtml}
          `
          : ""
      }

      <p>
        You can now enjoy unlimited conversations with our advanced AI assistant.
      </p>

      <p>
        If you need any help, reply to this email or contact us at
        <strong>+91 9307630015</strong>.
      </p>

      <br />

      <p>
        Thanks again for trusting NeuralChat.
        <br />
        — The NeuralChat Team
      </p>
    `,
  })
}
