function adaptiveSections() {
  const width = document.documentElement.clientWidth,
    mission = document.querySelector('.mission'),
    missionContent = document.querySelector('.mission__content'),
    missionRight = document.querySelector('.mission__right'),
    story = document.querySelector('.story'),
    storyContent = document.querySelector('.story__content'),
    storyRight = document.querySelector('.story__right');

  if (width < 1301) {
    mission.prepend(missionRight);
    story.prepend(storyRight);
  } else {
    missionContent.append(missionRight);
    storyContent.append(storyRight);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  adaptiveSections();
});

addEventListener('resize', () => {
  adaptiveSections();
});
