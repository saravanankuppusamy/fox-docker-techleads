// Runs once on first startup, only when /data/db is empty.
const insurance = db.getSiblingDB("foxinsurance");
insurance.customers.insertMany([
  {
    customerId: "C001",
    name: "Alex Morgan",
    city: "Detroit",
    state: "MI",
    email: "alex@example.test",
  },
  {
    customerId: "C002",
    name: "Jordan Lee",
    city: "Ann Arbor",
    state: "MI",
    email: "jordan@example.test",
  },
  {
    customerId: "C003",
    name: "Taylor Brooks",
    city: "Farmington",
    state: "MI",
    email: "taylor@example.test",
  },
  {
    customerId: "C004",
    name: "Casey Patel",
    city: "Novi",
    state: "MI",
    email: "casey@example.test",
  },
  {
    customerId: "C005",
    name: "Riley Chen",
    city: "Troy",
    state: "MI",
    email: "riley@example.test",
  },
]);
insurance.policies.insertMany([
  {
    policyId: "P1001",
    customerId: "C001",
    type: "Auto",
    premium: 1250,
    status: "Active",
  },
  {
    policyId: "P1002",
    customerId: "C002",
    type: "Home",
    premium: 1900,
    status: "Active",
  },
  {
    policyId: "P1003",
    customerId: "C003",
    type: "Travel",
    premium: 180,
    status: "Active",
  },
  {
    policyId: "P1004",
    customerId: "C004",
    type: "Auto",
    premium: 1420,
    status: "Pending",
  },
  {
    policyId: "P1005",
    customerId: "C005",
    type: "Home",
    premium: 1650,
    status: "Active",
  },
  {
    policyId: "P1006",
    customerId: "C001",
    type: "Health",
    premium: 2850,
    status: "Active",
  },
]);
insurance.claims.insertMany([
  {
    claimId: "CL501",
    policyId: "P1001",
    type: "Collision",
    amount: 2100,
    status: "Open",
  },
  {
    claimId: "CL502",
    policyId: "P1002",
    type: "Water Damage",
    amount: 4800,
    status: "Under Review",
  },
  {
    claimId: "CL503",
    policyId: "P1005",
    type: "Storm Damage",
    amount: 1300,
    status: "Approved",
  },
  {
    claimId: "CL504",
    policyId: "P1003",
    type: "Trip Delay",
    amount: 240,
    status: "Closed",
  },
]);
print("Fox Insurance seed data loaded: 5 customers, 6 policies, 4 claims");
