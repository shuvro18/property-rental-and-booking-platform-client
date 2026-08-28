import { redirect } from 'next/navigation'
import { stripe } from '../lib/stripe'
import Link from 'next/link'
import { FiCheckCircle } from 'react-icons/fi'
import { addBooking } from '../lib/action'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const status = session.status;
  const metadata = session.metadata;
  const customerEmail = session.customer_details?.email;

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const result = await addBooking({...metadata, session_id})
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
          
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <FiCheckCircle size={36} />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Payment Successful! 🎉
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your property booking has been confirmed successfully.
            </p>
          </div>

          {/* Booking Summary Box (Metadata থেকে দেখানো হচ্ছে) */}
          {metadata && metadata.propertyTitle && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 text-left space-y-2 text-sm border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Property:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-right truncate max-w-50">
                  {metadata.propertyTitle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Move-in Date:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {metadata.moveInDate}
                </span>
              </div>
            </div>
          )}

          {/* Message */}
          <p id="success" className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            We appreciate your business! A confirmation email will be sent to{' '}
            <span className="font-medium text-gray-800 dark:text-gray-200">{customerEmail}</span>.{' '}
            If you have any questions, please email{' '}
            <a href="mailto:orders@example.com" className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700">
              orders@example.com
            </a>.
          </p>

          {/* Action Buttons */}
          <div className="pt-2">
            <Link
              href="/"
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md transition-all duration-300 block text-center"
            >
              Go Back to Home
            </Link>
          </div>

        </div>
      </div>
    )
  }
}