// app/api/insertDB/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import Busboy from 'busboy';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export async function POST(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const busboy = Busboy({ headers: req.headers });
      const fields = {};
      let fileData = null;

      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const saveTo = path.join(process.cwd(), 'public', 'uploads', `${uuidv4()}-${filename}`);
        fileData = { filename: path.basename(saveTo), path: saveTo };
        const writeStream = fs.createWriteStream(saveTo);
        file.pipe(writeStream);
      });

      busboy.on('field', (fieldname, val) => {
        fields[fieldname] = val;
      });

      busboy.on('finish', async () => {
        // Now you have the fields and file data
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB); // Replace with your DB name
        const collection = db.collection('family_members'); // Replace with your collection name

        const document = {
          name: fields.name,
          age: parseInt(fields.age),
          relation: fields.relation,
          memories: fields.memories,
          audioFile: fileData ? fileData.filename : null,
          createdAt: new Date(),
        };

        await collection.insertOne(document);

        resolve(
          NextResponse.json(
            { message: 'Content inserted successfully' },
            { status: 200 }
          )
        );
      });

      busboy.on('error', (err) => {
        console.error('Busboy error:', err);
        reject(
          NextResponse.json({ error: 'Failed to parse form data' }, { status: 500 })
        );
      });

      req.body.pipe(busboy);
    } catch (error) {
      console.error('Error in insertDB route:', error);
      reject(
        NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
      );
    }
  });
}