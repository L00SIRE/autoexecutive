export const taxOptimizations = [
  {
    name: "R&D Tax Credit (Section 41)",
    savings: 34200,
    status: "actionable",
    description:
      "Qualified research expenses for AI/ML development. Based on current engineering spend of $456K, estimated credit of $34.2K for FY2025.",
    deadline: "Tax filing deadline",
    complexity: "medium",
  },
  {
    name: "Delaware Franchise Tax Optimization",
    savings: 12800,
    status: "actionable",
    description:
      "Switch from Authorized Shares method to Assumed Par Value Capital method. Current overpayment detected based on share structure.",
    deadline: "Jun 1, 2026",
    complexity: "low",
  },
  {
    name: "QSBS Exclusion (Section 1202)",
    savings: null,
    status: "review",
    description:
      "Potential 100% capital gains exclusion on up to $10M. Requires verification of C-corp status and qualified small business criteria.",
    deadline: "Ongoing",
    complexity: "high",
  },
  {
    name: "State Nexus Optimization",
    savings: 8400,
    status: "applied",
    description:
      "Remote employee structure optimized to minimize state tax obligations. Currently compliant across CA, NY, and TX nexus requirements.",
    deadline: "Completed",
    complexity: "medium",
  },
  {
    name: "Accelerated Depreciation (Section 179)",
    savings: 3100,
    status: "actionable",
    description:
      "Equipment and software purchases eligible for immediate expensing rather than multi-year depreciation. Covers $18.5K in qualifying assets.",
    deadline: "Dec 31, 2026",
    complexity: "low",
  },
];

export const totalSavings = 58500;
