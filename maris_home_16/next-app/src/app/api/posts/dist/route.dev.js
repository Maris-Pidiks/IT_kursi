"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = GET;
exports.POST = POST;

var _server = require("next/server");

var _mongoose = require("@/utils/mongoose");

var _Post = _interopRequireDefault(require("@/models/Post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function GET(request) {
  var posts;
  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _mongoose.connectToDatabase)());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_Post["default"].find({}).sort({
            createdAt: -1
          }));

        case 5:
          posts = _context.sent;

          if (posts) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", _server.NextResponse.json({
            error: "No posts found"
          }, {
            status: 404
          }));

        case 8:
          return _context.abrupt("return", _server.NextResponse.json(posts, {
            status: 200
          }));

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching data:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Error fetching data"
          }, {
            status: 500
          }));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function POST(request) {
  var body, newPost;
  return regeneratorRuntime.async(function POST$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _mongoose.connectToDatabase)());

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(request.json());

        case 5:
          body = _context2.sent;

          if (!(!body.title || !body.description)) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", _server.NextResponse.json({
            error: "Title and description are required"
          }, {
            status: 400
          }));

        case 8:
          newPost = new _Post["default"]({
            title: body.title,
            description: body.description,
            img: body.img || ""
          });
          _context2.next = 11;
          return regeneratorRuntime.awrap(newPost.save());

        case 11:
          return _context2.abrupt("return", _server.NextResponse.json(newPost, {
            status: 201
          }));

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.error("Error creating post:", _context2.t0);
          return _context2.abrupt("return", _server.NextResponse.json({
            error: "Error creating post"
          }, {
            status: 500
          }));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
}