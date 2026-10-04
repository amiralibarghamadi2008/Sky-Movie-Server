import v from "../config.js";

const episodeDownloadLinkSchema = {
  type: "object",
  props: {
    quality: { type: "string", trim: true, min: 2 },
    fileSize: { type: "string", trim: true, optional: true },
    directDownloadLink: { type: "string", trim: true, min: 5 },
  },
};

const createEpisodeSchema = {
  titleEpisode: { type: "string", trim: true, min: 2, max: 50 },
  seasonNumber: {
    type: "number",
    integer: true,
    positive: true,
    convert: true,
  },
  episodeNumber: {
    type: "number",
    integer: true,
    positive: true,
    convert: true,
  },
  duration: { type: "string", trim: true, min: 1 },
  series: { type: "objectId" },
  downloadLinks: {
    type: "array",
    items: episodeDownloadLinkSchema,
    min: 1,
    messages: {
      arrayEmpty: "حداقل باید یک لینک دانلود برای این قسمت ثبت شود.",
    },
  },
  $$strict: true,
};

const updateEpisodeSchema = {
  ...createEpisodeSchema,
  titleEpisode: { ...createEpisodeSchema.titleEpisode, optional: true },
  seasonNumber: { ...createEpisodeSchema.seasonNumber, optional: true },
  episodeNumber: { ...createEpisodeSchema.episodeNumber, optional: true },
  duration: { ...createEpisodeSchema.duration, optional: true },
  series: { ...createEpisodeSchema.series, optional: true },
  downloadLinks: { ...createEpisodeSchema.downloadLinks, optional: true },
  $$strict: true,
};

export const validateCreateEpisode = v.compile(createEpisodeSchema);
export const validateUpdateEpisode = v.compile(updateEpisodeSchema);
