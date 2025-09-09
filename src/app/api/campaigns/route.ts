import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

const FAKE_CAMPAIGNS = Array.from({ length: 20 }, (_, i) => {
  const totalLeads = faker.number.int({ min: 5, max: 100 });
  const successfulLeads = faker.number.int({ min: 0, max: totalLeads });

  return {
    id: i + 1,
    name: faker.company.name(),
    status: faker.helpers.arrayElement(['Active', 'Inactive'] as const),
    totalLeads,
    successfulLeads,
    responseRate: totalLeads > 0 ? (successfulLeads / totalLeads) * 100 : 0,
    createdAt: faker.date.past().toISOString(),
  };
});

export async function GET() {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(FAKE_CAMPAIGNS);
}