const fs = require("fs");
const path = require("path");

// Function to parse the MPEG-TS packet
// this is responsible for the processing of a given packet.
function parseMpegTSPacket(buffer, offset) {
  // First check initial sync byte data, if not 0x47 then throw error
  if (buffer.readUInt8(offset) !== 0x47) {
    throw new Error(`No sync byte present in packet at offset ${offset}`);
  }
  // If valid then extract PID and assign to new value which is returned.
  // offset + 1 skips the sync byte data and then required 13 bits of the 16-bit integer are read.
  const pid = buffer.readUInt16BE(offset + 1) & 0x1fff;

  return pid;
}

// Function to process the byte stream
// this will call on the function above to process the byte stream in 188-byte packets (the length of each packet in the stream)
function processByteStream(byteStream) {
  let offset = 0;
  let hasErrors = false;
  const pidSet = new Set();

  // Loop through the byte stream in 188-byte packets
  while (offset + 188 <= byteStream.length) {
    try {
      const pid = parseMpegTSPacket(byteStream, offset);
      pidSet.add(pid);
    } catch (error) {
      console.error(error.message);
      hasErrors = true;
      break;
    }
    offset += 188;
  }

  // Print unique PIDs if there are no errors and then create a list of PIDs in ascending order.
  if (!hasErrors) {
    const sortedPids = Array.from(pidSet).sort((a, b) => a - b);
    sortedPids.forEach((pid) =>
      console.log("list of PIDs:", `0x${pid.toString(16).toUpperCase()}`)
    );
  }
  // console.log("has errors", hasErrors);
  return hasErrors;
}

// Function to read and process a file - to handle the test files provided.
function processFile(filepath) {
  try {
    // Resolve the file path to handle relative paths
    const resolvedPath = path.resolve(filepath);

    // Read the byte stream from the file
    const byteStream = fs.readFileSync(resolvedPath);

    // Process the byte stream
    const hasErrors = processByteStream(byteStream);
    console.log("process file hasErrors:", hasErrors);

    return hasErrors ? 1 : 0;
  } catch (error) {
    // Throw the error to be caught by Jest
    throw error;
  }
}

// Check if a filename is provided as a command-line argument
if (process.argv.length !== 3) {
  console.error("Usage: node mpegts-parser.js <filename>");
  // Throw an error to be caught by Jest
  throw new Error("Invalid command-line arguments");
}

// Process the specified file
const filename = process.argv[2];
try {
  const exitCode = processFile(filename);

  // If there are errors, log an error message
  if (exitCode === 1) {
    console.error("Error processing file");
  }

  // Return the exit code instead of calling process.exit
  process.exitCode = exitCode;
} catch (error) {
  console.error(`Error processing file: ${error.message}`);
  // Exit with code 1 for unhandled errors
  process.exitCode = 1;
}

module.exports = {
  parseMpegTSPacket,
  processByteStream,
  processFile,
};