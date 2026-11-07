# AutoExecutive

**Live:** https://autoexecutive.vercel.app

This is the frontend prototype for an "AI co-CEO" pitch: a dashboard that keeps track of a startup's finances and raises problems before the founder asks. We built it to demo the product idea. It is not a working backend.

The idea is that seed-stage founders make hiring, fundraising and tax decisions without a CFO. The product would connect to the tools they already use (Digits, Mercury, Stripe, HubSpot), keep running projections in the background, and post alerts to a dashboard.

## What's actually here

A React app with mock data in `src/data/` standing in for the API integrations:

| Panel | Shows |
|---|---|
| Runway | Months of cash left at current burn, with a projection chart |
| Revenue | MRR trend and growth |
| Hiring timeline | When each planned hire becomes affordable |
| Funding hypotheticals | How runway changes under different raise sizes |
| Tax optimization | Example savings opportunities |
| Competitor radar | Market moves worth watching |
| Alerts feed | Unprompted warnings ranked by severity |

There's also a landing page, a login screen and a request-access flow. Form submissions go out through EmailJS.

## Stack

React 19, Vite, Tailwind CSS 4, Recharts, React Three Fiber for the background, React Router. Deployed on Vercel.

## Run

```bash
npm install
npm run dev
```

## What a real version needs

- Replace `src/data/*` with live connectors (Plaid or Mercury for cash, Stripe for revenue)
- A backend that runs projections on a schedule instead of in the browser
- Retrieval grounded in the company's own data before any AI-written analysis appears

Built with Sarad Gaihre.
