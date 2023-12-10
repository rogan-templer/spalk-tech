const fs = require("fs");
const path = require("path");
const {
  parseMpegTSPacket,
  processByteStream,
  processFile,
} = require("../mpegts-parser");

describe("MPEG-TS Parser", () => {
  // Test cases for parseMpegTSPacket function
  describe("parseMpegTSPacket", () => {
    test("should throw an error for missing sync byte", () => {
      const buffer = Buffer.from([0x00, 0x00, 0x00]); // Invalid buffer without sync byte
      expect(() => parseMpegTSPacket(buffer, 0)).toThrow(
        "No sync byte present"
      );
    });

    // Add more test cases for parseMpegTSPacket as needed
  });

  // Test cases for processByteStream function
  describe("processByteStream", () => {
    test("should return false for a valid byte stream", () => {
      const byteStream = Buffer.from([0x47, 0x00, 0x01, 0x02, 0x03]); // Valid MPEG-TS packet
      expect(processByteStream(byteStream)).toBe(false);
    });

    test("should return true for a byte stream with errors", () => {
      const byteStream = Buffer.from([0x00]); // Invalid byte stream
      expect(processByteStream(byteStream)).toBe(true);
    });

    // Add more test cases for processByteStream as needed
  });

  // Test cases for processFile function
  describe("processFile", () => {
    test("should throw an error for an invalid file path", () => {
      const filepath = "non_existent_file.ts";
      expect(() => processFile(filepath)).toThrowError(
        /no such file or directory/
      );
    });

    // Add more test cases for processFile as needed
  });
});
