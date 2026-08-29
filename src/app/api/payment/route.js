import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/app/lib/stripe";

export async function POST(request) {
  try {
    const bookingData = await request.json();
    const headersList = await headers();
    const origin = headersList.get("origin");
    const unitAmount = Math.round(Number(bookingData.price) * 100);

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: "usd",

            product_data: {
              name: bookingData.propertyTitle || "Property Booking",
              description: `Move-in Date: ${bookingData.moveInDate} | Contact: ${bookingData.contactNumber}`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: bookingData.userId,
        propertyId: bookingData.propertyId,
        propertyTitle: bookingData.propertyTitle,
        userName: bookingData.userName,
        userEmail: bookingData.userEmail,
        moveInDate: bookingData.moveInDate,
        contactNumber: bookingData.contactNumber,
        additionalNotes: bookingData.additionalNotes || "",
        status: bookingData.status,
        bill: "paid",
        price:String(bookingData.price),
        createdAt: new Date().toISOString(),
      },
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
    //   integration_identifier: "{{INTEGRATION_ID}}",
    });
    return NextResponse.json({url:session.url});
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
