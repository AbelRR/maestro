This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# LiveKit Video Chat Integration

This project integrates LiveKit for real-time video conferencing capabilities. The implementation provides a seamless video chat experience with minimal setup.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your LiveKit credentials:
   ```
   LIVEKIT_API_KEY=your_api_key_here
   LIVEKIT_API_SECRET=your_api_secret_here
   LIVEKIT_URL=wss://your-livekit-project.livekit.cloud
   NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-project.livekit.cloud
   NEXT_PUBLIC_SHOW_SETTINGS_MENU=true
   ```
4. Get your LiveKit API key and secret from [LiveKit Cloud](https://cloud.livekit.io)
5. Run the development server:
   ```bash
   npm run dev
   ```

## Features

- Real-time video and audio conferencing
- Simple UI for initiating and ending calls
- Responsive design that works on mobile and desktop
- Secure token-based authentication

## Implementation Details

The video chat functionality is implemented using the following components:

1. `VideoMeeting.tsx` - The main component that handles the LiveKit integration
2. `ChatInterface.tsx` - The chat interface that includes buttons to initiate video calls
3. `/api/livekit-token` - API route for generating secure LiveKit tokens

## Usage

To start a video call:

1. Navigate to the chat interface
2. Click on the video or phone icon to initiate a call
3. In the pre-call screen, click "Start a video call" to connect
4. When finished, click the end call button to disconnect

## Troubleshooting

If you encounter issues with the video chat:

1. Ensure your LiveKit credentials are correct in the `.env.local` file
2. Check that your browser has permission to access the camera and microphone
3. Verify that your LiveKit project is active in the LiveKit Cloud dashboard

## License

This project is licensed under the MIT License - see the LICENSE file for details.
