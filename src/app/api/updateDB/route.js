import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  try {
    const body = await req.json();

    const { id, name, age, relation, memories } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // Replace with your DB name
    const collection = db.collection('family_members'); // Replace with your collection name
    const updateResult = await collection.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      {
        $set: {
          name,
          age: parseInt(age),
          relation,
          memories,
          updatedAt: new Date(),
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Content updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in updateDB route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}