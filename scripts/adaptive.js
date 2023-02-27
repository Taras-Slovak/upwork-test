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

adaptiveSections();

function adaptiveFooter() {
  const width = document.documentElement.clientWidth;
  const footer = document.querySelector('.footer');
  if (width < 900) {
    footer.innerHTML = `Please use the desktop 
  footer as inspiration for the
  mobile footer`;
    footer.classList.add('adaptive-footer');
  }
}

adaptiveFooter();

addEventListener('resize', () => {
  adaptiveSections();
  adaptiveFooter();
});
