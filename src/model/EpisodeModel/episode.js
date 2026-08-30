import mongoose from "mongoose";

const DownloadLinkSchema = new mongoose.Schema({
  quality: {
    type: String,
    required: true,
    trim: true,
  },
  fileSize: {
    type: String,
    trim: true,
  },
  directDownloadLink: {
    type: String,
    required: true,
    trim: true,
  },
});

const EpisodeSchema = new mongoose.Schema(
  {
    titleEpisode: {
      type: String,
      required: true,
      trim: true,
    },
    seasonNumber: {
      type: Number,
      required: true,
    },
    episodeNumber: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    series: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "series",
      required: true,
    },
    downloadLinks: {
      type: [DownloadLinkSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

EpisodeSchema.index({ series: 1, seasonNumber: 1, episodeNumber: 1 }, { unique: true });

const EpisodeModel =
  mongoose.models.episode || mongoose.model("episode", EpisodeSchema);

export default EpisodeModel;
