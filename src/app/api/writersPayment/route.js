import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { getUserSeason } from '@/lib/core/Session';



export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const user = await getUserSeason()

  console.log("=== CHECKING USER SESSION DETAILS ===", user)


    const PRICE_ID = "price_1Tl472IM3hhHjEytSAr0U0fY"

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        priceId: PRICE_ID,
        writerId: user?.id,
        writerEmail: user?.email,
        writerName: user?.name || "Writer"
      },
      mode: 'payment',
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}