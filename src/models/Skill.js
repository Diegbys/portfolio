import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Please, enter a title.']
    },
    img: {
        type: String,
        require: [true, 'An img is required']
    }
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);