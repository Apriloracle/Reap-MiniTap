# REAP MiniTap

REAP MiniTap is a Next.js application that allows users to earn cUSD in Opera MiniPay by tapping. It integrates with the Celo blockchain, Opera MiniPay and uses various Web3 technologies.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building the application
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Viem](https://viem.sh/) - TypeScript library for interacting with Ethereum
- [Wagmi](https://wagmi.sh/) - React Hooks for Ethereum
- [Thirdweb Engine](https://thirdweb.com/engine) - Backend infrastructure for Web3 apps
- [Web3Modal](https://web3modal.com/) - Library for connecting to Web3 wallets

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/reap-minitap.git
cd reap-minitap
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add necessary environment variables (e.g., Thirdweb access token).

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application pages and layout
- `components/`: React components used in the application
- `utils/`: Utility functions and configurations

## Key Components

- `Celon.tsx`: Main component for interacting with the Celo blockchain and managing the tapping functionality
- `ScoreCard.tsx`: Component for displaying the user's score
- `Web3ModalProvider`: Context provider for Web3Modal integration

## Customization

You can start customizing the application by modifying the components in the `components/` directory. The main page content can be edited in `app/page.tsx`.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Viem Documentation](https://viem.sh/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Thirdweb Engine Documentation](https://portal.thirdweb.com/engine)

## Deployment

This project can be easily deployed on platforms like Vercel or Netlify. Make sure to set up the necessary environment variables in your deployment platform.

For more details on deploying Next.js applications, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
