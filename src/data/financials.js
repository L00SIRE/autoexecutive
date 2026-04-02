export const monthlyData = [
  { month: "May 25", revenue: 2000, expenses: 38200, cash: 680000 },
  { month: "Jun 25", revenue: 2800, expenses: 39100, cash: 643700 },
  { month: "Jul 25", revenue: 3500, expenses: 40500, cash: 606700 },
  { month: "Aug 25", revenue: 4200, expenses: 41000, cash: 569900 },
  { month: "Sep 25", revenue: 5100, expenses: 41800, cash: 533200 },
  { month: "Oct 25", revenue: 6000, expenses: 42500, cash: 496700 },
  { month: "Nov 25", revenue: 7200, expenses: 43200, cash: 460700 },
  { month: "Dec 25", revenue: 8100, expenses: 43800, cash: 425000 },
  { month: "Jan 26", revenue: 9000, expenses: 44500, cash: 389500 },
  { month: "Feb 26", revenue: 10200, expenses: 45200, cash: 354500 },
  { month: "Mar 26", revenue: 11400, expenses: 46100, cash: 319800 },
  { month: "Apr 26", revenue: 12400, expenses: 47200, cash: 412000 },
];

export const kpis = {
  cash: { value: 412000, change: -3.1, label: "Cash Balance" },
  runway: { value: 8.7, unit: "months", change: -0.4, label: "Runway" },
  mrr: { value: 12400, change: 8.8, label: "MRR" },
  burn: { value: 47200, change: 2.4, label: "Monthly Burn" },
};

export const runwayProjections = [
  { month: "Apr 26", noRaise: 412000, bridge: 412000, seedExt: 412000 },
  { month: "May 26", noRaise: 377000, bridge: 377000, seedExt: 377000 },
  { month: "Jun 26", noRaise: 341000, bridge: 841000, seedExt: 341000 },
  { month: "Jul 26", noRaise: 304000, bridge: 804000, seedExt: 2304000 },
  { month: "Aug 26", noRaise: 266000, bridge: 766000, seedExt: 2266000 },
  { month: "Sep 26", noRaise: 227000, bridge: 727000, seedExt: 2227000 },
  { month: "Oct 26", noRaise: 187000, bridge: 687000, seedExt: 2187000 },
  { month: "Nov 26", noRaise: 146000, bridge: 646000, seedExt: 2146000 },
  { month: "Dec 26", noRaise: 0, bridge: 604000, seedExt: 2104000 },
  { month: "Jan 27", noRaise: null, bridge: 561000, seedExt: 2061000 },
  { month: "Feb 27", noRaise: null, bridge: 517000, seedExt: 2017000 },
  { month: "Mar 27", noRaise: null, bridge: 472000, seedExt: 1972000 },
  { month: "Apr 27", noRaise: null, bridge: 426000, seedExt: 1926000 },
  { month: "May 27", noRaise: null, bridge: 379000, seedExt: 1879000 },
  { month: "Jun 27", noRaise: null, bridge: 0, seedExt: 1831000 },
  { month: "Jul 27", noRaise: null, bridge: null, seedExt: 1782000 },
  { month: "Aug 27", noRaise: null, bridge: null, seedExt: 1732000 },
];
