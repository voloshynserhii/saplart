const bcrypt = require("bcryptjs");
const User = require("../../models/User.model");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { name, about, password, contacts, socialLinks } = req.body;

  if (!password || password.length < 4) {
    return res.status(422).json("Password must be at least 4 characters!");
  }

  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(404).json("User could not be found");
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json("Wrong password!");
    }
    user.name = name || user.name;
    user.about = about || user.about;
    if(contacts) {
      if(socialLinks?.length) {
        user.contacts = {...contacts, socialLinks}
      } else {
        user.contacts = contacts
      }
    }
    user.save();
    
    delete user.password;
    
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
