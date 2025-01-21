import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs/server';
import { CreateOrUpdateUser, DeleteUser } from '../../../Lib/actions/user';
import { NextResponse } from 'next/server';

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.Webhook_Key;

  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local' },
      { status: 400 }
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing Svix headers' }, { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json({ error: 'Error verifying webhook' }, { status: 400 });
  }

  if (!evt?.data) {
    console.error('No data in webhook event');
    return NextResponse.json({ error: 'No data in webhook event' }, { status: 400 });
  }

  // Do something with the payload
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with ID: ${id}, Type: ${eventType}`);
  console.log('Webhook body:', body);

  try {
    // Handle 'user.created' or 'user.updated' event
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { first_name, last_name, image_url, email_addresses } = evt.data;
      
      const user = await CreateOrUpdateUser(id, first_name, last_name, image_url, email_addresses);
      if (user && eventType === 'user.created') {
        try {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id,
            },
          });
        } catch (error) {
          console.error('Error updating user metadata:', error);
        }
      }
    }

    // Handle 'user.deleted' event
    if (eventType === 'user.deleted') {
      await DeleteUser(id);
    }
  } catch (error) {
    console.error('Error processing webhook event:', error);
    return NextResponse.json({ error: 'Error processing webhook event' }, { status: 400 });
  }

  return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 });
}
