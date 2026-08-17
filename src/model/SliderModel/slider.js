import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        link : {
            type: String,
            required : true
        },
        title : {
            type: String,
            required : true
        }
    },
    {
        timestamps : true,
    }
)

const SliderModel = mongoose.models.slider || mongoose.model("slider" , SliderSchema)

export default SliderModel