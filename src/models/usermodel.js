const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
      name:{
          type:String,
          require: true,
          min: 3,
      max: 20,

      },
    user_id: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    Password: {
        type: String,
        required: true,
        min: 6,
      },
      email_id: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    User_name:{
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    Gender:{
        type: String,
        // enum:[male,female,other]
    },
    Mobile:{
        type:Number,
        min:10,
        require:true
    },
    Profile:{
        type:String,
        // enum:[public, private],
        // default:public
    }
    

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
