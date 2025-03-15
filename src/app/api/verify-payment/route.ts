import { NextResponse } from 'next/server';
import { paymentConfig } from '@/config/payment';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { chargeId, expertId, address } = body;

    // Validate required parameters
    if (!chargeId || !expertId || !address) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Get API key directly from environment
    const apiKey = process.env.COINBASE_COMMERCE_API_KEY;

    // Check if we have a valid API key
    if (!apiKey) {
      console.error('Coinbase Commerce API key is not configured');
      return NextResponse.json(
        { error: 'Payment verification is not configured' },
        { status: 500 }
      );
    }

    // Verify the payment by checking the charge status with Coinbase Commerce
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-CC-Api-Key': apiKey,
        'X-CC-Version': '2018-03-22'
      }
    };

    // Call the Coinbase Commerce API to verify the charge
    const response = await fetch(`https://api.commerce.coinbase.com/charges/${chargeId}`, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Coinbase Commerce API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to verify payment' },
        { status: response.status }
      );
    }

    // Parse the response
    const data = await response.json();
    const charge = data.data;

    // Check if the charge exists and is confirmed/complete
    if (!charge) {
      return NextResponse.json({ error: 'Charge not found' }, { status: 404 });
    }

    // Check if the payment has been completed
    // In a real implementation, you would check the timeline for confirmed payments
    const isConfirmed = charge.timeline.some(
      (event: any) => event.status === 'COMPLETED' || event.status === 'CONFIRMED'
    );

    if (!isConfirmed) {
      return NextResponse.json(
        { error: 'Payment not confirmed yet', status: 'pending' },
        { status: 202 }
      );
    }

    // At this point, the payment is confirmed
    // In a real implementation, you would:
    // 1. Update the user's permissions in your database
    // 2. Record the transaction for audit purposes
    // 3. Send confirmation emails or notifications
    
    console.log(`Payment confirmed for expertId: ${expertId}, user: ${address}`);
    
    // For this example, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      access: {
        expertId,
        address,
        accessGranted: true,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      }
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 