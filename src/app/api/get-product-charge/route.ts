import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { productId } = body;

    // Validate required parameters
    if (!productId) {
      return NextResponse.json({ error: 'Missing productId parameter' }, { status: 400 });
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

    // Create a charge using the Coinbase Commerce API for this product
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CC-Api-Key': apiKey,
        'X-CC-Version': '2018-03-22'
      },
      body: JSON.stringify({
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/purchase-complete`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/purchase-cancelled`,
        pricing_type: 'fixed_price',
      }),
    };

    // Call the Coinbase Commerce API to create a charge
    const response = await fetch(`https://api.commerce.coinbase.com/charges`, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Coinbase Commerce API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create charge from product' },
        { status: response.status }
      );
    }

    // Return the charge data
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating charge from product:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 