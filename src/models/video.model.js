import mongoose, {Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new Schema(
    {
     videoFile: {
        type: String, // Cloudinary url
        required: true
     },
     thumnail: {
        type: String, // cloudinary url
        required: true
     },
     videoOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
     },
     title: {
        type: String,
        required: true
     },
     description: {
        type: String,
        required: true
     },
     duration: {
        type: String, // Cloudinary url
     },
     views: {
        type: Number,
        default: 0
     },
     isPublished: {
        type: Boolean,
        default: true
     }   
    },
    { timestamps: true }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video', videoSchema)