import { NextResponse } from 'next/server';
import { paymentConfig } from '@/config/payment';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { expertId, price, currency, customerAddress } = body;

    // Validate required parameters
    if (!expertId || !price) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Get API key directly from environment
    const apiKey = process.env.COINBASE_COMMERCE_API_KEY;

    // Check if we have a valid API key
    if (!apiKey) {
      console.error('Coinbase Commerce API key is not configured');
      return NextResponse.json(
        { error: 'Payment processing is not configured' },
        { status: 500 }
      );
    }

    // Create a charge using the Coinbase Commerce API
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CC-Api-Key': apiKey,
        'X-CC-Version': '2018-03-22'
      },
      body: JSON.stringify({
        name: `Expert Access: ${expertId}`,
        description: `Access to expert services`,
        pricing_type: 'fixed_price',
        local_price: {
          amount: price.toString(),
          currency: currency || 'USD',
        },
        metadata: {
          expertId,
          customerAddress,
        },
      }),
    };

    // Call the Coinbase Commerce API to create a charge
    const response = await fetch('https://api.commerce.coinbase.com/charges', options);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Coinbase Commerce API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create payment charge' },
        { status: response.status }
      );
    }

    // Return the charge data
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating charge:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 