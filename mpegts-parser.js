const fs = require("fs");

// Function to parse the MPEG-TS packet
function parseMpegTSPacket(buffer, offset) {
  // First check initial sync byte data, if not 0x47 then throw error
  if (buffer.readUInt8(offset) !== 0x47) {
    throw new Error(`No sync byte present in packet at offset ${offset}`);
  }
  // If valid then extract PID and assign to new value which is returned.
  const pid = buffer.readUInt16BE(offset + 1) & 0x1fff;

  return pid;
}
