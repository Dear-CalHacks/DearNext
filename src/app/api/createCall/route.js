import axios from 'axios';

export async function POST(req) {
  console.log('API route /api/createCall invoked');

  try {
    // Step 1: Create the nurse assistant via the Flask backend
    console.log('Sending request to Flask backend...');
    const nurseResponse = await axios.post('http://localhost:8080/voice/createNurse', {});

    console.log('Received response from Flask backend:', nurseResponse.data);

    if (nurseResponse.status !== 201) {
      console.error('Failed to create nurse assistant, response status:', nurseResponse.status);
      return new Response(JSON.stringify({ error: 'Failed to create nurse assistant' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Extract the assistant ID
    const assistantId = nurseResponse.data.data?.id;
    if (!assistantId) {
      console.error('Assistant ID not found in response:', nurseResponse.data);
      return new Response(JSON.stringify({ error: 'Assistant ID missing in response' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Assistant ID:', assistantId);

    // Return the assistant ID to the client
    return new Response(
      JSON.stringify({
        message: 'Nurse assistant created successfully',
        assistantId,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating nurse assistant:', error.message);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}