import mongoose from 'mongoose';
import fs from 'fs';
import yaml from 'yaml';

import Schema from "../src/api/models/Schema";

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/genny"

// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI)

// Read the JSON or YAML file from command line argument
const filePath = process.argv[2];

if (!filePath) {
    console.error('Please provide a JSON or YAML file as a command line argument.');
    process.exit(1);
}

// Ensure file path ends with .json or .yaml extension
if (!filePath.endsWith('.json') && !filePath.endsWith('.yaml') && !filePath.endsWith('.yml')) {
    console.error('Unsupported file format. Please provide a JSON or YAML file.');
    process.exit(1);
}


let fileData;
if (filePath.endsWith('.json')) {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    fileData = Array.isArray(jsonData) ? jsonData : [jsonData];
} else if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
    const yamlData = yaml.parse(fs.readFileSync(filePath, 'utf-8'));
    fileData = Array.isArray(yamlData) ? yamlData : [yamlData];
}

async function insertData() {
    try {
        for (const obj of fileData) {
            await Schema.create(obj);
            console.log(`Inserted: ${JSON.stringify(obj)}`);
        }
        console.log('Data insertion completed.');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting data:', error);
        mongoose.connection.close();
    }
}

insertData();
