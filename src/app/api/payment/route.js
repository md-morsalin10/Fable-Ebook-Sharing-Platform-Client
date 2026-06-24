import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { getUserSeason } from '@/lib/core/Session';



export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const user = await getUserSeason()

        console.log("=== CHECKING USER SESSION DETAILS ===", user)

        const formData = await request.formData();
        const title = formData.get("title");
        const bookId = formData.get("bookId");
        const price = formData.get("price");
        const writerId = formData.get("writerId");
        const writerEmail = formData.get("writerEmail");
        const writerName = formData.get("writerName");
        const userId = formData.get("userId");
        const userEmail = formData.get("userEmail");
        const userName = formData.get("userName");
        const coverImage = formData.get("coverImage");

        console.log("=== CHECKING FORM DATA ===", formData)




        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price_data: {
                        currency: "usd",
                        unit_amount: Number(price) * 100,
                        product_data: {
                            name: title,
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                price: Number(price),
                title: title,
                bookId: bookId,
                userId: userId,
                userEmail: userEmail,
                userName: userName,
                writerId: writerId,
                writerEmail: writerEmail,
                writerName: writerName,
                coverImage: coverImage,
                
            },
            mode: 'payment',
            success_url: `${origin}/pricing/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}