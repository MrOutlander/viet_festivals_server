const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    notificationSettings: {
      emailNotifications: Boolean,
      pushNotifications: Boolean
    }
  });
  
const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);

export default UserPreferences
