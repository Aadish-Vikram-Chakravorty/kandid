import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

// Let's generate a consistent list of 50 fake leads
const FAKE_LEADS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  company: faker.company.name(),
  campaignName: faker.commerce.department() + ' Campaign',
  status: faker.helpers.arrayElement([
    'Pending',
    'Contacted',
    'Responded',
    'Converted',
  ]),
  lastContactedAt: faker.date.recent().toISOString(),
  avatar: faker.image.avatar(),
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedLeads = FAKE_LEADS.slice(start, end);

  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    leads: paginatedLeads,
    hasNextPage: end < FAKE_LEADS.length,
    nextPage: end < FAKE_LEADS.length ? page + 1 : null,
  });
}