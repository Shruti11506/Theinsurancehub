const fs = require('fs');
const readline = require('readline');

async function extract() {
    const logPath = 'C:\\Users\\Shruti Daware\\.gemini\\antigravity-ide\\brain\\e361cafe-a054-4ed3-ba32-f1fcbfb81b83\\.system_generated\\logs\\transcript.jsonl';
    const publicPath = 'C:\\Users\\Shruti Daware\\Desktop\\TheInsuranceHub\\public\\';

    const fileStream = fs.createReadStream(logPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let images = [];

    for await (const line of rl) {
        try {
            const entry = JSON.parse(line);
            if (entry.type === 'USER_INPUT' && entry.content) {
                // Try to find base64 images in the content or metadata
                const imgMatches = entry.content.match(/data:image\/[^;]+;base64,[^"'\s>]+/g) || [];
                for (const match of imgMatches) {
                    images.push(match);
                }
                
                // If it's stored in a structured way (e.g. array of parts)
                if (entry.parts) {
                    for (const part of entry.parts) {
                        if (part.inlineData && part.inlineData.data) {
                             images.push(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
                        }
                    }
                }
            }
        } catch(e) {}
    }

    // Get the last 4 images found
    const last4 = images.slice(-4);
    
    const names = ['hub_cards.jpg', 'hub_map_wall.jpg', 'hub_art_wall.jpg', 'hub_office_cabin.jpg'];
    
    last4.forEach((b64, idx) => {
        const base64Data = b64.replace(/^data:image\/\w+;base64,/, "");
        const buf = Buffer.from(base64Data, 'base64');
        const filename = publicPath + names[idx];
        fs.writeFileSync(filename, buf);
        console.log(`Saved ${filename} (${buf.length} bytes)`);
    });
    
    console.log(`Found ${images.length} total images in transcript.`);
}

extract();
