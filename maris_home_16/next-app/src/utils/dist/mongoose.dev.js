"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToDatabase = connectToDatabase;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

var cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null
  };
}

function connectToDatabase() {
  var opts;
  return regeneratorRuntime.async(function connectToDatabase$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!cached.conn) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", cached.conn);

        case 2:
          if (!cached.promise) {
            opts = {
              bufferCommands: false
            };
            cached.promise = _mongoose["default"].connect(MONGODB_URI, opts).then(function (mongoose) {
              return mongoose;
            });
          }

          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(cached.promise);

        case 6:
          cached.conn = _context.sent;
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](3);
          cached.promise = null;
          throw _context.t0;

        case 13:
          return _context.abrupt("return", cached.conn);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 9]]);
}