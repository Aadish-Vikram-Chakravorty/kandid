import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

// A consistent list of 50 fake leads with all properties
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
  ] as const),
  lastContactedAt: faker.date.recent().toISOString(),
  avatar: faker.image.avatar(),
}));

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const leadId = parseInt(params.id, 10);
  const lead = FAKE_LEADS.find(l => l.id === leadId);

  if (!lead) {
    return new NextResponse('Lead not found', { status: 404 });
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(lead);
}