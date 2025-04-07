import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, default: "https://via.placeholder.com/800x400" },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

PostSchema.index({ slug: 1 }, { unique: true });

// Add a pre-save hook to ensure slug uniqueness
PostSchema.pre("save", async function (next) {
  try {
    if (this.isModified("slug")) {
      const slugRegEx = new RegExp(`^${this.slug}(-\\d+)?$`);
      const postsWithSlug = await this.constructor.find({ slug: slugRegEx });
      if (postsWithSlug.length > 0) {
        this.slug = `${this.slug}-${postsWithSlug.length + 1}`;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Add error handling for duplicate slugs
PostSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("A post with this slug already exists"));
  } else {
    next(error);
  }
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default mongoose.models.Post || mongoose.model("Post", PostSchema);
