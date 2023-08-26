import fetch from 'node-fetch'
import fs from 'fs/promises'
import 'dotenv/config'

async function downloadDevCard(): Promise<void> {

    const devcard_id = process.env.DEVCARD_ID
    const url = `https://api.daily.dev/devcards/${devcard_id}.png?r=zfh&ref=action`;
    const outputFileName = 'devcard.png';

    const response = await fetch(url);

    if (!response.ok) {
        new Error(`Failed to fetch image. Status: ${response.status} - ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    await fs.writeFile(outputFileName, Buffer.from(buffer));

    console.log('Image saved successfully as', outputFileName);
}

(async () => {
    try {
        await downloadDevCard();
    } catch (error) {
        console.error('Error fetching file:', error);
    }
})()