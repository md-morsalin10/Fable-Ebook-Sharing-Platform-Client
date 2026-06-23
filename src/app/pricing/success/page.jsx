import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createWriterSubscription } from '@/lib/action/subscription'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    console.log(metadata, "from success page");

    
    await createWriterSubscription({
      ...metadata,
      sessionId: session_id,          // 👈 এখানে 'session_id' কে 'sessionId' বানিয়ে পাঠাচ্ছেন
  
    })
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-[#030712] px-4 py-16 relative overflow-hidden selection:bg-[#E5BA73]/30 selection:text-[#E5BA73]">

        {/* 🌌 সাইবার-লাক্সারি ব্যাকগ্রাউন্ড আর্ট (অ্যাম্বিয়েন্ট গ্লো) */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-950/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-600/10 blur-[150px] rounded-full pointer-events-none"></div>

        {/* ফাইন লিনিয়ার গ্রিড ব্যাকগ্রাউন্ড ওভারলে */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="relative z-10 max-w-md w-full">

          {/* 🌟 প্রিমিয়াম গ্লাস কার্ড কন্টেইনার */}
          <div className="relative bg-[#0B0F17]/70 backdrop-blur-xl border border-gray-800/40 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_-12px_rgba(16,185,129,0.1)] overflow-hidden text-center">

            {/* কার্ডের উপরের সক্ষ্ম গোল্ডেন/গ্রিন হাইলাইট লাইন */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>

            {/* 🎉 সাকসেস অ্যানিমেটেড টিকমার্ক আইকন */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                {/* পালসিং রিং */}
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md animate-pulse"></div>

                <div className="relative w-20 h-20 bg-gradient-to-br from-[#111827] to-[#042f1a] text-emerald-400 rounded-full flex items-center justify-center text-4xl border border-emerald-500/30 shadow-2xl">
                  <svg className="w-10 h-10 stroke-current text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* 🏷️ ব্যাজ */}
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-4 py-1.5 rounded-full shadow-inner">
              Payment Successful
            </span>

            {/* 👑 মেইন হেডলাইন */}
            <h1 className="text-2xl md:text-3xl font-serif font-black text-white tracking-wide mt-5 mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              Welcome to the Elite Circle.
            </h1>

            {/* 📝 ডেসক্রিপশন মেসেজ */}
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light mb-8 max-w-sm mx-auto">
              We appreciate your business! A confirmation receipt and verification details have been securely sent to{' '}
              <span className="text-[#E5BA73] font-medium font-sans">{customerEmail}</span>.
            </p>

            {/* 🛠️ সাপোর্ট ইনফো বক্স */}
            <div className="bg-[#0F1524] border border-gray-800/60 rounded-xl p-4 mb-8 text-left">
              <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-1">Have any questions?</p>
              <p className="text-xs text-gray-400 font-light">
                Our premium desk is ready to help you. Reach us instantly at{' '}
                <a href="mailto:orders@example.com" className="text-[#E5BA73] hover:underline transition-all font-medium">
                  orders@example.com
                </a>
              </p>
            </div>

            {/* 🚀 ড্যাশবোর্ড / হোম অ্যাকশন বাটন */}
            <Link
              href="/dashboard"
              className="block w-full relative overflow-hidden bg-gradient-to-r from-[#E5BA73] to-[#C29B53] text-[#0E1420] font-sans font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(229,186,115,0.15)] hover:shadow-[0_4px_25px_rgba(229,186,115,0.3)] hover:scale-[1.01] active:scale-[0.99]"
            >
              Go to Creator Dashboard →
            </Link>

            {/* 🔒 সিকিউরিটি ফুটনোট */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[9px] text-gray-600 tracking-wider font-medium uppercase pt-2">
              <span>🛡️ Secured by Stripe</span>
              <span>•</span>
              <span>⚡ Instant Access Activated</span>
            </div>

          </div>
        </div>
      </div>
    )
  }
}