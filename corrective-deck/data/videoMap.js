// data/videoMap.js
// Map JSON video filenames -> require() so bundler can include them

export const videoMap = {
  'hip_9090.mp4': require('../assets/app_assets/hip_9090.mp4'),
  'hip_bridge_reach.mp4': require('../assets/app_assets/hip_bridge_reach.mp4'),
  'hip_assisted_9090.mp4': require('../assets/app_assets/hip_assisted_9090.mp4'),

  'knee_wall_sit.mp4': require('../assets/app_assets/knee_wall_sit.mp4'),
  'knee_step_down.mp4': require('../assets/app_assets/knee_step_down.mp4'),
  'knee_wall_sit_assist.mp4': require('../assets/app_assets/knee_wall_sit_assist.mp4'),

  'back_cat_cow.mp4': require('../assets/app_assets/back_cat_cow.mp4'),
  'back_bird_dog.mp4': require('../assets/app_assets/back_bird_dog.mp4'),
  'back_rock_back.mp4': require('../assets/app_assets/back_rock_back.mp4'),

  'shoulder_wall_slides.mp4': require('../assets/app_assets/shoulder_wall_slides.mp4'),
  'shoulder_scap_pushup.mp4': require('../assets/app_assets/shoulder_scap_pushup.mp4'),
  'shoulder_reachback.mp4': require('../assets/app_assets/shoulder_reachback.mp4'),
};
